import json
import random
import datetime
import os
import urllib.request

# ==========================================
# 1. ESTADO GLOBAL E CONFIGURAÇÕES
# ==========================================
priors_state = {}
ledger_log = []

# ==========================================
# 2. SANDBOX & MARKET MOCK (Regras Ocultas Neutras)
# ==========================================
def observer_engine():
    """Sem Leakage. Apenas fatos estruturais brutos."""
    return """
    Ambiente de Simulação:
    - 10.000 Pequenas e Médias Empresas (PMEs).
    - Orçamento de Execução: $0.
    - Restrições: Você só pode usar e-mail, ligações ou código aberto.
    - Custo marginal por ação técnica: Baixo.
    """

def market_mock(target: str, mechanism: str) -> bool:
    """Regra oculta: Automação/Software converte mais que Serviços Manuais."""
    t = target.lower()
    m = mechanism.lower()
    # Regras totalmente cegas ao LLM
    if "software" in m or "automation" in m or "bot" in m or "api" in m:
        return random.random() < 0.85
    elif "marketing" in m or "seo" in m or "ads" in m:
        return random.random() < 0.05
    return random.random() < 0.15

# ==========================================
# 3. MOTORES COGNITIVOS (LLM & Normalizer)
# ==========================================
def formulator_engine(env_context: str, mode: str) -> str:
    """Chama o Gemini via REST API se a chave estiver disponível."""
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY não encontrada. Teste cognitivo real não executado.")
        
    prompt = f"""
    Ambiente: {env_context}
    Formule 3 hipóteses de negócios. Para cada uma forneça:
    - target: o público alvo (ex: 'varejistas', 'clinicas')
    - mechanism: a entrega de valor (ex: 'bot_whatsapp', 'consultoria_seo')
    - expected_revenue: valor em USD
    - expected_cost: custo em USD
    
    Retorne EXATAMENTE JSON:
    {{
      "hypotheses": [
         {{"target": "...", "mechanism": "...", "expected_revenue": 100, "expected_cost": 0}}
      ]
    }}
    """
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    payload = json.dumps({"contents": [{"parts": [{"text": prompt}]}], "temperature": 0.4}).encode('utf-8')
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})
    
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode())
        text = result['candidates'][0]['content']['parts'][0]['text']
        # Remove markdown
        text = text.replace('```json', '').replace('```', '').strip()
        return text

def hypothesis_normalizer(raw_json: str) -> list:
    """Cria a Classe de Equivalência (Arm) baseada em Hash semântico simples."""
    try:
        data = json.loads(raw_json)
        hyps = data.get("hypotheses", [])
        normalized = []
        for h in hyps:
            # A classe é a tupla Target+Mechanism
            class_id = f"{h.get('target', 'any').lower().strip()}|{h.get('mechanism', 'any').lower().strip()}"
            h["class_id"] = class_id
            
            # Inicializa Priors se não existir
            if class_id not in priors_state:
                priors_state[class_id] = {"alpha": 1.0, "beta": 1.0}
                
            normalized.append(h)
        return normalized
    except Exception as e:
        print("[Normalizer Error]", e)
        return []

# ==========================================
# 4. MOTORES MATEMÁTICOS E DE LOG
# ==========================================
def decision_engine(hypotheses: list, mode: str) -> tuple:
    best_hyp = None
    best_score = -999999
    best_p = 0
    alts = []
    
    for h in hypotheses:
        cid = h["class_id"]
        alpha = priors_state[cid]["alpha"]
        beta = priors_state[cid]["beta"]
        
        # Ablações
        if mode in ["ablation_no_prior", "baseline_llm_static"]:
            # Sem matemática bayesiana, LLM dita o valor cego (assumimos P=0.5 estático)
            p_sampled = 0.5
        else:
            p_sampled = random.betavariate(alpha, beta)
            
        score = (p_sampled * h.get("expected_revenue", 0)) - h.get("expected_cost", 0)
        
        alts.append({"class_id": cid, "score": score, "p": p_sampled})
        
        if score > best_score:
            best_score = score
            best_hyp = h
            best_p = p_sampled
            
    return best_hyp, best_p, alts

def prior_updater(cid: str, outcome: bool, mode: str):
    if mode in ["baseline_llm_static", "ablation_no_prior"]:
        return # Não atualiza pesos estruturados nessas baselines
    
    if outcome:
        priors_state[cid]["alpha"] += 1
    else:
        priors_state[cid]["beta"] += 1

def log_causality(cycle: int, h: dict, outcome: bool, p: float, mode: str):
    event = {
        "cycle": cycle,
        "mode": mode,
        "class_id": h["class_id"],
        "p_sampled": p,
        "outcome": outcome,
        "priors_after": {k: dict(v) for k, v in priors_state.items()}
    }
    ledger_log.append(event)
    print(f"[{mode}] Ciclo {cycle:02d} | C: {h['class_id'][:30]:<30} | Out: {str(outcome):<5} | P: {p:.2f}")

# ==========================================
# 5. ORQUESTRADOR DO PILOTO (MATRIZ EXPERIMENTAL)
# ==========================================
def run_pilot(mode: str, cycles=5):
    print(f"\n=== INICIANDO RUN: {mode} ===")
    global priors_state
    priors_state = {} # Reseta o estado estatístico por RUN
    env_context = observer_engine()
    
    for i in range(1, cycles + 1):
        try:
            raw_text = formulator_engine(env_context, mode)
        except ValueError as e:
            print(f"[BLOQUEIO CIENTÍFICO] {e}")
            return # Aborta o run
        except Exception as e:
            print(f"[ERRO LLM] {e}")
            return
            
        hyps = hypothesis_normalizer(raw_text)
        if not hyps:
            continue
            
        winner, p, alts = decision_engine(hyps, mode)
        outcome = market_mock(winner["target"], winner["mechanism"])
        prior_updater(winner["class_id"], outcome, mode)
        log_causality(i, winner, outcome, p, mode)

if __name__ == "__main__":
    modes = [
        "iea_full", 
        "ablation_no_prior", 
        "ablation_no_ledger", 
        "baseline_d_memory_only",
        "baseline_llm_static",
        "baseline_statistical_greedy"
    ]
    
    # Executamos o piloto para a primeira baseline apenas para verificar o setup
    run_pilot(modes[0], cycles=5)
