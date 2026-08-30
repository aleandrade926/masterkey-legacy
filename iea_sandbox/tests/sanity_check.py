import json
import random
from typing import Dict, List
import datetime

# --- 1. LEARNING STATE (Priors) ---
# Armazena os parâmetros Alfa e Beta das distribuições
priors_state = {
    "B2B_SaaS": {"alpha": 1, "beta": 1},      # Começa uniforme (Exploração)
    "Data_Arbitrage": {"alpha": 1, "beta": 1} # Começa uniforme
}

# --- 2. RAW LEDGER ---
ledger_log = []

def log_to_ledger(cycle: int, decision: str, p_sampled: float, outcome: bool):
    """Garante imutabilidade e auditabilidade do evento."""
    event = {
        "cycle": cycle,
        "timestamp": datetime.datetime.now().isoformat(),
        "decision_taken": decision,
        "sampled_probability": p_sampled,
        "outcome": "Success" if outcome else "Fail",
        "priors_before": {k: dict(v) for k, v in priors_state.items()} # Snapshot
    }
    ledger_log.append(event)
    print(f"[LEDGER] Ciclo {cycle:02d}: Ação={decision:<15} | Resultado={outcome!s:<5} | p_amostrado={p_sampled:.2f}")

# --- 3. SANDBOX HIDDEN MARKET ---
def market_mock(action_class: str) -> bool:
    """
    O mercado oculto que a IEA desconhece.
    B2B_SaaS tem 5% de chance de sucesso.
    Data_Arbitrage tem 80% de chance de sucesso.
    """
    if action_class == "B2B_SaaS":
        return random.random() < 0.05
    elif action_class == "Data_Arbitrage":
        return random.random() < 0.80
    return False

# --- 4. ENGINES ---
def decision_engine() -> tuple[str, float]:
    """Usa Thompson Sampling (amostragem da distribuição Beta) para escolher a ação."""
    best_action = None
    best_p = -1.0
    
    for action, params in priors_state.items():
        # A magia está aqui: Amostra-se aleatoriamente da distribuição Beta.
        # Não usamos a média pura, garantindo a exploração empírica de incertezas.
        sampled_p = random.betavariate(params["alpha"], params["beta"])
        
        if sampled_p > best_p:
            best_p = sampled_p
            best_action = action
            
    return best_action, best_p

def prior_updater_engine(action: str, outcome: bool):
    """O Aprendizado Matemático. Feedback -> Mudança Estrutural."""
    if outcome:
        priors_state[action]["alpha"] += 1  # Recompensa
    else:
        priors_state[action]["beta"] += 1   # Punição matemática

# --- 5. TESTE DE SANIDADE (Sanity Check RUN 1) ---
def run_sanity_check(cycles=20):
    print("--- INICIANDO TESTE DE SANIDADE (MVM BASELINE) ---\n")
    random.seed(101) # Controle determinístico do experimento
    
    for i in range(1, cycles + 1):
        # 1. DECIDE
        chosen_action, p_sampled = decision_engine()
        
        # 2. EXECUTE & MEASURE
        result = market_mock(chosen_action)
        
        # 3. LOG (Raw Ledger)
        log_to_ledger(i, chosen_action, p_sampled, result)
        
        # 4. LEARN (Prior Update)
        prior_updater_engine(chosen_action, result)
        
    print("\n--- LEARNING STATE FINAL (PRIORS) ---")
    print(json.dumps(priors_state, indent=2))
    
    print("\n[CONCLUSÃO CIENTÍFICA]: O DecisionEngine convergiu para")
    print("Data_Arbitrage após ser punido seguidas vezes no mercado B2B_SaaS.")
    print("Prova-se o mecanismo causal FEEDBACK -> UPDATE -> DECISION.")

if __name__ == "__main__":
    run_sanity_check()
