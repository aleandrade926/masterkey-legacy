import type { ConsensusObject, TranscriptSegment } from '../types';
import { evaluateTrafficLight } from '../types';
import { generateConsensusViaLlama } from './providers/llamaProvider';
import { mockProvider } from './providers/mockProvider';

const USE_MOCK_FALLBACK = false;

interface ConsensusGenerationOptions {
  meetingId: string;
  sourcePlatform?: string;
  participants?: string[];
  segments: TranscriptSegment[];
}

export async function generateConsensusFromTranscript(options: ConsensusGenerationOptions): Promise<Partial<ConsensusObject>> {
  const { meetingId, sourcePlatform, participants, segments } = options;

  if (!segments || segments.length === 0) {
    throw new Error('Nenhuma fala capturada. Não é possível gerar um entendimento.');
  }

  // Filtrar apenas os consolidados/reais, caso passe lixo
  let cleanSegments = segments.filter(s => s.text && s.speaker);

  // Fase 5.4: Deduplicação avançada no payload (Hash + Substring window com limite de janela)
  const normalizeForDedupe = (str: string) => {
    return str.toLowerCase().replace(/[^\w\sÀ-ÿ]/g, '').replace(/\s+/g, ' ').trim();
  };

  const uniqueSegments: TranscriptSegment[] = [];
  for (const seg of cleanSegments) {
    const normText = normalizeForDedupe(seg.text);
    if (!normText) continue;
    
    // Procura por overlap apenas na janela recente (slice -25) para O(N) de performance em reuniões longas
    let isDuplicate = false;
    const windowToSearch = uniqueSegments.slice(-25);
    for (const recent of windowToSearch) {
      if (recent.speaker !== seg.speaker) continue;
      
      const recentNorm = normalizeForDedupe(recent.text);
      if (recentNorm.includes(normText)) {
        isDuplicate = true; // O novo é fragmento ou exato do anterior
        break;
      } else if (normText.includes(recentNorm)) {
        // O novo é uma expansão do anterior. Substituímos o anterior pelo novo.
        recent.text = seg.text;
        recent.normalized_text = seg.normalized_text;
        isDuplicate = true;
        break;
      }

      // Advanced word overlap check for Google Meet rolling caption replacements
      const commWords = recentNorm.split(' ').filter(w => w.length > 0);
      const newWords = normText.split(' ').filter(w => w.length > 0);
      
      if (commWords.length >= 3 && newWords.length >= 3) {
        let matchCount = 0;
        const minLen = Math.min(commWords.length, newWords.length);
        for (let i = 0; i < minLen; i++) {
          if (commWords[i] === newWords[i]) {
            matchCount++;
          } else {
            break;
          }
        }
        if (matchCount / commWords.length >= 0.60) {
          recent.text = newWords.length > commWords.length ? seg.text : recent.text;
          recent.normalized_text = newWords.length > commWords.length ? seg.normalized_text : recent.normalized_text;
          isDuplicate = true;
          break;
        }
        
        const overlap = commWords.filter(w => newWords.includes(w)).length;
        if (commWords.length >= 4 && overlap / commWords.length >= 0.75) {
          recent.text = newWords.length > commWords.length ? seg.text : recent.text;
          recent.normalized_text = newWords.length > commWords.length ? seg.normalized_text : recent.normalized_text;
          isDuplicate = true;
          break;
        }
      }
    }

    if (!isDuplicate) {
      uniqueSegments.push(seg);
    }
  }

  // Consolidação de falas consecutivas do mesmo falante para reduzir overhead
  const mergedSegments: TranscriptSegment[] = [];
  for (const seg of uniqueSegments) {
    const last = mergedSegments[mergedSegments.length - 1];
    if (last && last.speaker === seg.speaker) {
      last.text += ' ' + seg.text;
    } else {
      mergedSegments.push({ ...seg });
    }
  }

  cleanSegments = mergedSegments;

  // Se a reunião for extremamente longa (> 300 falas consolidadas), amostra/limita o payload enviado para IA
  if (cleanSegments.length > 300) {
    console.log(`[ToDeAcordo] Reunião longa detectada (${cleanSegments.length} falas). Amostrando para 300 segmentos.`);
    const step = Math.ceil(cleanSegments.length / 300);
    const sampled: TranscriptSegment[] = [];
    for (let i = 0; i < cleanSegments.length; i += step) {
      sampled.push(cleanSegments[i]);
    }
    cleanSegments = sampled;
  }

  try {
    // Fase 10D: Semáforo e Red Flags
    const evaluateTrafficLight = (partialConsensus: Partial<ConsensusObject>) => {
      const redFlagsWords = ["talvez", "depois", "a gente vê", "mais ou menos", "depende", "pode ser", "vamos alinhar"];
      
      const allTexts = [
        ...(partialConsensus.agreements || []).map(a => typeof a === 'string' ? a : a.text),
        ...(partialConsensus.decisions || []).map(a => typeof a === 'string' ? a : a.text),
        ...(partialConsensus.obligations || []).map(a => typeof a === 'string' ? a : a.text),
      ].join(' ').toLowerCase();

      const foundFlags = redFlagsWords.filter(word => allTexts.includes(word));
      const missing = [];
      
      if (!partialConsensus.agreements || partialConsensus.agreements.length === 0) missing.push('acordos');
      if (!partialConsensus.obligations || partialConsensus.obligations.length === 0) missing.push('obrigações');
      
      // Calculate score 0-100
      let score = 100;
      score -= foundFlags.length * 15;
      score -= missing.length * 20;
      
      let trafficLight: 'green' | 'yellow' | 'red' = 'green';
      if (score < 60) trafficLight = 'red';
      else if (score < 85 || foundFlags.length > 0) trafficLight = 'yellow';

      partialConsensus.confidence_score = Math.max(0, score);
      partialConsensus.traffic_light = trafficLight;
      partialConsensus.red_flags = foundFlags;
      partialConsensus.missing_elements = missing;
    };

    // Chama o Provider Llama (via backend local)
    console.log(`[ToDeAcordo] Chamando Llama Provider para ${cleanSegments.length} segmentos...`);
    const consensus = await generateConsensusViaLlama({
      meetingId,
      sourcePlatform,
      participants,
      transcriptSegments: cleanSegments
    });
    
    // Anexa dados base
    consensus.id = consensus.id || crypto.randomUUID();
    consensus.meeting_id = meetingId;
    consensus.created_at = consensus.created_at || Date.now();
    consensus.transcript_segments = cleanSegments;
    consensus.provider = 'llama-local';

    evaluateTrafficLight(consensus);

    return consensus;
  } catch (error) {
    console.error('[ToDeAcordo] Falha na API remota ao gerar consenso. Ativando extrator de fallback local:', error);
    
    // Extrator Heurístico Local: Garante que o usuário NUNCA perca a reunião ou veja um erro de API
    const agreements: { text: string }[] = [];
    const decisions: { text: string }[] = [];
    const obligations: { text: string; owner?: string }[] = [];
    
    const keywordsAgreements = ['acordo', 'combinado', 'vamos', 'ficou definido', 'fechado', 'entregar', 'sim', 'então', 'perfeito', 'aprova', 'fazer', 'pagar', 'enviar'];

    for (const seg of cleanSegments) {
      const lower = seg.text.toLowerCase();
      const hasKeyword = keywordsAgreements.some(kw => lower.includes(kw));

      if (hasKeyword) {
        if (lower.includes('entregar') || lower.includes('enviar') || lower.includes('fazer') || lower.includes('vou')) {
          obligations.push({ text: seg.text, owner: seg.speaker || undefined });
        } else if (lower.includes('definido') || lower.includes('decidido') || lower.includes('fechado')) {
          decisions.push({ text: seg.text });
        } else {
          agreements.push({ text: seg.text });
        }
      }
    }

    // Se nenhuma frase genérica de acordo foi encontrada pelas palavras-chave, extrai 3 falas significativas de exemplo
    if (agreements.length === 0 && decisions.length === 0 && obligations.length === 0) {
      cleanSegments.slice(0, 5).forEach(seg => {
        agreements.push({ text: `${seg.speaker}: ${seg.text}` });
      });
    }

    const summaryText = cleanSegments.slice(0, 8).map(s => `${s.speaker}: ${s.text}`).join(' ');

    const fallbackConsensus: Partial<ConsensusObject> = {
      id: crypto.randomUUID(),
      meeting_id: meetingId,
      title: cleanSegments[0] ? `Reunião (${cleanSegments[0].speaker})` : 'Entendimento Consolidado',
      summary: summaryText ? `Resumo da conversa:\n${summaryText.substring(0, 500)}...` : 'Registro da reunião capturada.',
      agreements: agreements.slice(0, 8),
      decisions: decisions.slice(0, 8),
      obligations: obligations.slice(0, 8),
      created_at: Date.now(),
      updated_at: Date.now(),
      transcript_segments: cleanSegments,
      provider: 'local-extractor-fallback',
      confidence_score: 80,
      traffic_light: 'yellow'
    };

    evaluateTrafficLight(fallbackConsensus);
    return fallbackConsensus;
  }
}
