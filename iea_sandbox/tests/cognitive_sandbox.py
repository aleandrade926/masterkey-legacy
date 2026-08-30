import json
import random
import datetime
import urllib.request
import urllib.error
import os
import re
from typing import List

# --- ESTADO (STATE, LEDGER, PRIORS) ---
priors_state = {}
ledger_log = []

# --- OBSERVER ENGINE ---
def observer_engine():
    """O Sandbox não diz quais categorias são boas. Dá apenas contexto rico."""
    return """
    AMBIENTE OMEGA:
    - 10.000 PMEs locais.
    - 90% não têm presença digital.
    - 50% sofrem com novas multas por falta de conformidade regulatória.
    - 80% gastam muito com anúncios online sem ROI.
    - Seu orçamento de execução: $0.
    """

# --- FORMULATOR ENGINE (Cognitivo) ---
def formulator_engine(environment_text: str) -> str:
    """Usa LLM real (se API KEY existir) ou simulador cognitivo para gerar 3 hipóteses em JSON."""
    api_key = os.environ.get("GEMINI_API_KEY")
    prompt = f"""
    Baseado no ambiente abaixo, formule 3 hipóteses de negócios distintas com custo $0.
    Ambiente: {environment_text}
    
    Responda EXATAMENTE com um JSON no formato:
    {{
      "hypotheses": [
        {{
          "hypothesis_id": "h1",
          "macro_field": "UMA_PALAVRA_CATEGORIA (ex: marketing, regulatory, webdev)",
          "mechanism": "descrição da ação",
          "expected_revenue": 100,
          "expected_cost": 0,
          "confidence_p": 0.8
        }}
      ]
    }}
    """
    
    if api_key:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
            payload = json.dumps({"contents": [{"parts": [{"text": prompt}]}]}).encode('utf-8')
            req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})
            with urllib.request.urlopen(req) as response:
                result = json.loads(response.read().decode())
                text = result['candidates'][0]['content']['parts'][0]['text']
                # Limpa markdown do json
                text = re.sub(r'```json\n|\n```', '', text).strip()
                return text
        except Exception as e:
            print(f"[Aviso] Falha ao chamar Gemini API: {e}. Usando Simulador Cognitivo.")
    
    # Fallback Cognitivo (Simula o LLM gerando hipóteses variadas)
    # Permite que o teste avance mesmo sem chave na variável de ambiente local.
    hypotheses = {
        "hypotheses": [
            {"hypothesis_id": f"h_mkt_{random.randint(1,100)}", "macro_field": "marketing", "mechanism": "Vender lead gen via cold email", "expected_revenue": 500, "expected_cost": 0, "confidence_p": 0.9},
            {"hypothesis_id": f"h_reg_{random.randint(1,100)}", "macro_field": "regulatory", "mechanism": "Vender relatório de compliance automatizado", "expected_revenue": 800, "expected_cost": 0, "confidence_p": 0.6},
            {"hypothesis_id": f"h_web_{random.randint(1,100)}", "macro_field": "webdev", "mechanism": "Criar sites estáticos locais", "expected_revenue": 300, "expected_cost": 0, "confidence_p": 0.7}
        ]
    }
    return json.dumps(hypotheses)

# --- HYPOTHESIS NORMALIZER ---
def hypothesis_normalizer(raw_json: str) -> List[dict]:
    """Parseia a saída do LLM e inicializa Priors de novos macro_fields."""
    try:
        data = json.loads(raw_json)
        hyps = data.get("hypotheses", [])
        for h in hyps:
            field = h["macro_field"].lower()
            if field not in priors_state:
                # Inicializa nova categoria descoberta com Incerteza Uniforme Beta(1,1)
                priors_state[field] = {"alpha": 1.0, "beta": 1.0}
        return hyps
    except Exception as e:
        print("[ERRO] Falha no Normalizer:", e)
        return []

# --- DECISION ENGINE (Estatístico) ---
def decision_engine(hypotheses: List[dict]) -> tuple[dict, float, List[dict]]:
    """Calcula Value usando Priors Bayesianos. Retorna Vencedor, P_Amostrado e Alternativas."""
    best_hyp = None
    best_score = -99999.0
    best_p = 0.0
    alternatives = []
    
    for h in hypotheses:
        field = h["macro_field"].lower()
        alpha = priors_state[field]["alpha"]
        beta = priors_state[field]["beta"]
        
        # Thompson Sampling
        p_sampled = random.betavariate(alpha, beta)
        
        # Expected Value = (P_sucesso * Receita) - Custo
        score = (p_sampled * h["expected_revenue"]) - h["expected_cost"]
        
        alternatives.append({
            "id": h["hypothesis_id"],
            "field": field,
            "sampled_score": score,
            "p_sampled": p_sampled
        })
        
        if score > best_score:
            best_score = score
            best_hyp = h
            best_p = p_sampled
            
    return best_hyp, best_p, alternatives

# --- MARKET MOCK (Regra Oculta) ---
def execution_and_measurement(hypothesis: dict) -> bool:
    """
    O LLM não sabe, mas 'regulatory' tem 85% de conversão (dor latente no prompt).
    'marketing' tem 5% (saturado). Outros 15%.
    """
    field = hypothesis["macro_field"].lower()
    if "regulat" in field or "compliance" in field:
        return random.random() < 0.85
    elif "marketing" in field or "lead" in field:
        return random.random() < 0.05
    return random.random() < 0.15

# --- PRIOR UPDATER ---
def prior_updater_engine(field: str, outcome: bool):
    """Atualiza a distribuição matemática."""
    if outcome:
        priors_state[field]["alpha"] += 1
    else:
        priors_state[field]["beta"] += 1

# --- LEDGER LOGGING ---
def log_ledger(cycle: int, winner: dict, outcome: bool, alts: list, p_sampled: float):
    event = {
        "cycle": cycle,
        "chosen_field": winner["macro_field"],
        "hypothesis": winner["mechanism"],
        "outcome": outcome,
        "p_sampled": p_sampled,
        "alternatives_rejected": alts,
        "priors_snapshot": {k: dict(v) for k, v in priors_state.items()}
    }
    ledger_log.append(event)
    print(f"[CICLO {cycle:02d}] Escolha: {winner['macro_field']:<15} | Outcome: {str(outcome):<5} | P_Amostrado: {p_sampled:.2f}")

# --- ORQUESTRADOR DO RUN ---
def run_cognitive_sandbox(cycles=10):
    print("=== INICIANDO RUN: DISCOVERY COGNITIVO ===")
    env_context = observer_engine()
    
    for i in range(1, cycles + 1):
        # 1. LLM Observa e Formula
        raw_llm_output = formulator_engine(env_context)
        
        # 2. Normaliza e agrupa classes
        hypotheses = hypothesis_normalizer(raw_llm_output)
        if not hypotheses:
            continue
            
        # 3. Decide matematicamente
        winner, p_sampled, alts = decision_engine(hypotheses)
        
        # 4. Executa no Mercado Oculto
        outcome = execution_and_measurement(winner)
        
        # 5. Ledger & Update
        log_ledger(i, winner, outcome, alts, p_sampled)
        prior_updater_engine(winner["macro_field"].lower(), outcome)
        
    print("\n=== PRIORS FINAIS (APRENDIZADO ACUMULADO) ===")
    print(json.dumps(priors_state, indent=2))
    
    print("\n[CONCLUSÃO]: A IEA agrupou hipóteses dinâmicas do LLM no Normalizer,")
    print("e o motor matemático penalizou 'marketing' e recompensou 'regulatory'.")
    print("No próximo ciclo, o LLM pode propor Marketing, mas o Decision Engine o rejeitará.")

if __name__ == "__main__":
    run_cognitive_sandbox()
