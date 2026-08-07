import { supabase } from "./supabase";

export interface Lead {
  id: string;
  campanha_id: string | null;
  parceiro_id: string | null;
  nome: string;
  empresa: string;
  cargo: string;
  url: string;
  email: string;
  telefone: string;
  passo1_mensagem: string;
  passo2_mensagem: string;
  passo3_mensagem: string;
  status: "Pendente" | "Abordado" | "Passo 1" | "Passo 2" | "Passo 3" | "Reunião Agendada" | "Faturado" | "Descartado";
  chat_history: string;
  created_at: string;
  linkedin_key?: string | null;
  metadata?: {
    lead_role?: "prospect_parceiro" | "parceiro_ativo" | "cliente_final_empresa" | "indefinido";
    [key: string]: any;
  } | null;
  import_status?: string | null;
}

export interface DuplicateGroup {
  id: string;
  reason: "nome" | "linkedin" | "email" | "telefone";
  matchedValue: string;
  leads: Lead[];
}

/**
 * Normaliza textos para comparação semântica (remove acentos, espaços extras e caixa alta).
 */
export function normalizeText(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, "")
    .trim()
    .replace(/\s+/g, " ");
}

/**
 * Agrupa leads em potencial de duplicata com base em Nome, LinkedIn Key, E-mail ou Telefone.
 */
export function findDuplicateGroups(leads: Lead[]): DuplicateGroup[] {
  if (!leads || leads.length < 2) return [];

  const groupsMap = new Map<string, { reason: "nome" | "linkedin" | "email" | "telefone"; matchedValue: string; leads: Set<Lead> }>();

  // Auxiliar para adicionar ao mapa
  const addToGroup = (key: string, reason: "nome" | "linkedin" | "email" | "telefone", matchedValue: string, lead: Lead) => {
    if (!groupsMap.has(key)) {
      groupsMap.set(key, { reason, matchedValue, leads: new Set() });
    }
    groupsMap.get(key)!.leads.add(lead);
  };

  leads.forEach(lead => {
    // 1. Por Nome Normalizado (se tiver pelo menos 3 caracteres)
    const normNome = normalizeText(lead.nome);
    if (normNome.length >= 3) {
      addToGroup(`nome:${normNome}`, "nome", lead.nome, lead);
    }

    // 2. Por LinkedIn Key
    if (lead.linkedin_key && lead.linkedin_key.trim().length > 2) {
      const normKey = lead.linkedin_key.trim().toLowerCase();
      addToGroup(`linkedin:${normKey}`, "linkedin", lead.linkedin_key, lead);
    }

    // 3. Por Email
    if (lead.email && lead.email.trim().includes("@")) {
      const normEmail = lead.email.trim().toLowerCase();
      addToGroup(`email:${normEmail}`, "email", lead.email, lead);
    }

    // 4. Por Telefone (apenas números, se tiver ao menos 8 dígitos)
    if (lead.telefone) {
      const normTel = lead.telefone.replace(/\D/g, "");
      if (normTel.length >= 8) {
        addToGroup(`tel:${normTel}`, "telefone", lead.telefone, lead);
      }
    }
  });

  // Filtrar apenas grupos com 2 ou mais leads únicos
  const result: DuplicateGroup[] = [];
  groupsMap.forEach((val, key) => {
    const uniqueLeads = Array.from(val.leads);
    if (uniqueLeads.length >= 2) {
      result.push({
        id: key,
        reason: val.reason,
        matchedValue: val.matchedValue,
        leads: uniqueLeads
      });
    }
  });

  return result;
}

/**
 * Une os dados de dois leads (Primary vs Secondary), permitindo sobrescritas explícitas de campos.
 */
export function mergeLeadData(primary: Lead, secondary: Lead, fieldOverrides: Partial<Lead> = {}): Partial<Lead> {
  const merged: Partial<Lead> = {
    nome: fieldOverrides.nome ?? (primary.nome || secondary.nome),
    empresa: fieldOverrides.empresa ?? (primary.empresa || secondary.empresa),
    cargo: fieldOverrides.cargo ?? (primary.cargo || secondary.cargo),
    url: fieldOverrides.url ?? (primary.url || secondary.url),
    email: fieldOverrides.email ?? (primary.email || secondary.email),
    telefone: fieldOverrides.telefone ?? (primary.telefone || secondary.telefone),
    status: fieldOverrides.status ?? primary.status,
    campanha_id: fieldOverrides.campanha_id ?? (primary.campanha_id || secondary.campanha_id),
    parceiro_id: fieldOverrides.parceiro_id ?? (primary.parceiro_id || secondary.parceiro_id),
    linkedin_key: fieldOverrides.linkedin_key ?? (primary.linkedin_key || secondary.linkedin_key)
  };

  // Histórico de Chat / Notas Unificado
  const histA = primary.chat_history?.trim() || "";
  const histB = secondary.chat_history?.trim() || "";
  if (histA && histB && histA !== histB) {
    merged.chat_history = `${histA}\n\n--- [Histórico Unificado de (${secondary.nome})] ---\n${histB}`;
  } else {
    merged.chat_history = histA || histB;
  }

  // Metadata Unificada
  const metaA = primary.metadata || {};
  const metaB = secondary.metadata || {};
  merged.metadata = {
    ...metaB,
    ...metaA,
    unificado_de_id: secondary.id,
    unificado_em: new Date().toISOString()
  };

  return merged;
}

/**
 * Persiste a unificação no Supabase:
 * 1. Atualiza o lead principal com os dados mesclados.
 * 2. Reatribui vendas (`sales`) vinculadas do lead secundário para o principal.
 * 3. Arquiva o lead secundário (`import_status = 'archived'`).
 */
export async function executeLeadMergeInSupabase(
  primaryId: string,
  secondaryId: string,
  mergedData: Partial<Lead>
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload: Record<string, any> = {
      ...mergedData,
      import_status: "active"
    };

    // Remover valores undefined
    Object.keys(payload).forEach(key => {
      if (payload[key] === undefined) {
        delete payload[key];
      }
    });

    // 1. Atualiza o lead principal na tabela taxmanagers_leads
    let { error: updatePrimaryErr } = await supabase
      .from("taxmanagers_leads")
      .update(payload)
      .eq("id", primaryId);

    // Fallback se a tabela for 'leads'
    if (updatePrimaryErr) {
      console.warn("Tentativa em taxmanagers_leads falhou, tentando tabela leads:", updatePrimaryErr);
      const res = await supabase.from("leads").update(payload).eq("id", primaryId);
      updatePrimaryErr = res.error;
    }

    if (updatePrimaryErr) throw updatePrimaryErr;

    // 2. Reatribui interações, tarefas e vendas vinculadas ao lead secundário
    try {
      await supabase.from("taxmanagers_interactions").update({ lead_id: primaryId }).eq("lead_id", secondaryId);
    } catch (e) {}

    try {
      await supabase.from("taxmanagers_tasks").update({ lead_id: primaryId }).eq("lead_id", secondaryId);
    } catch (e) {}

    try {
      await supabase.from("sales").update({ lead_id: primaryId }).eq("lead_id", secondaryId);
    } catch (e) {}

    // 3. Marca o lead secundário como arquivado na tabela taxmanagers_leads
    const archivePayload = {
      import_status: "archived",
      metadata: {
        archived_reason: "unificado",
        merged_into_id: primaryId,
        archived_at: new Date().toISOString()
      }
    };

    let { error: archiveSecondaryErr } = await supabase
      .from("taxmanagers_leads")
      .update(archivePayload)
      .eq("id", secondaryId);

    if (archiveSecondaryErr) {
      const res = await supabase.from("leads").update(archivePayload).eq("id", secondaryId);
      archiveSecondaryErr = res.error;
    }

    if (archiveSecondaryErr) throw archiveSecondaryErr;

    return { success: true };
  } catch (err: any) {
    console.error("Erro ao executar merge no Supabase:", err);
    return { success: false, error: err.message || "Falha ao unificar leads no banco de dados." };
  }
}
