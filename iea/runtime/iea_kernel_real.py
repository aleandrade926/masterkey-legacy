import os
import json
import time
import urllib.request
import hashlib
from typing import Dict, List, Any

# ==============================================================================
# IEA RUNTIME KERNEL v2 (Real LLM Adapter & Strict Reality Boundary)
# ==============================================================================

class BrainAdapter:
    def __init__(self):
        self.gemini_key = os.environ.get("GEMINI_API_KEY")
        self.openai_key = os.environ.get("OPENAI_API_KEY")
        self.model_info = {"provider": "none", "model": "none", "version": "none"}
        
        if self.gemini_key:
            self.model_info = {"provider": "google", "model": "gemini-2.5-flash", "version": "v1beta"}
        elif self.openai_key:
            self.model_info = {"provider": "openai", "model": "gpt-4o-mini", "version": "v1"}
        else:
            raise ValueError("Nenhuma chave de API de modelo fundacional encontrada no ambiente.")

    def ask(self, prompt: str, schema: dict) -> dict:
        # Aqui conectamos com a API Real usando REST puro para evitar dependencias
        # Para a execucao, se a chave for invalida, retornaremos erro.
        print(f"[BrainAdapter] Enviando prompt para {self.model_info['provider']}...")
        if self.model_info['provider'] == 'google':
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model_info['model']}:generateContent?key={self.gemini_key}"
            payload = {
                "contents": [{"parts": [{"text": prompt + "\n\nRESPONDA APENAS EM JSON SEGUINDO ESTE SCHEMA:\n" + json.dumps(schema)}]}],
                "generationConfig": {"temperature": 0.7, "responseMimeType": "application/json"}
            }
            req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
            try:
                with urllib.request.urlopen(req) as response:
                    res_body = response.read()
                    data = json.loads(res_body)
                    text = data['candidates'][0]['content']['parts'][0]['text']
                    return json.loads(text)
            except Exception as e:
                raise RuntimeError(f"Erro na API Google: {e}")
        return {}

class ObjectiveEngine:
    @staticmethod
    def get_mission() -> str:
        return "Descobrir, criar e capturar valor econômico lícito para o proprietário dentro das permissões e recursos disponíveis (Capital=0)."

class WorldState:
    def __init__(self):
        self.state = {
            "resources": ["Internet connection", "Python runtime"],
            "constraints": ["Capital financeiro = R$ 0", "Nao usar identidades falsas"],
            "environment_facts": ["Este é um ambiente de teste fechado. Ações possíveis: [investigate_market, launch_service, idle]."]
        }
    def get_state(self): return self.state
    def update(self, updates): self.state["environment_facts"].append(updates)

class OpportunityEngine:
    def generate_hypotheses(self, brain: BrainAdapter, state: dict) -> List[Dict]:
        schema = {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "hypothesis_id": {"type": "string"},
                    "description": {"type": "string"},
                    "action": {"type": "string"},
                    "target": {"type": "string"}
                }
            }
        }
        prompt = f"Gere hipóteses econômicas baseadas no estado: {json.dumps(state)}"
        return brain.ask(prompt, schema)

class EvaluationEngine:
    def evaluate(self, brain: BrainAdapter, hypotheses: List[Dict]) -> List[Dict]:
        schema = {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "hypothesis_id": {"type": "string"},
                    "expected_value": {"type": "number"},
                    "expected_cost": {"type": "number"},
                    "probability_of_success": {"type": "number"}
                }
            }
        }
        prompt = f"Avalie estas hipóteses (Retorne R$ 0 se inviável sem capital): {json.dumps(hypotheses)}"
        return brain.ask(prompt, schema)

class DecisionEngine:
    def decide(self, evaluations: List[Dict]) -> Dict:
        if not evaluations: return {"action": "idle"}
        best = max(evaluations, key=lambda x: x.get('expected_value', 0) * x.get('probability_of_success', 0))
        return {"action": "execute_hypothesis", "hypothesis_id": best['hypothesis_id']}

class ActionEngine:
    def execute(self, decision: Dict) -> Dict:
        # Ambiente de Teste Emulado
        print(f"[ActionEngine] Executando decisao: {decision}")
        result = "Ação executada no ambiente simulado. Retorno financeiro=0."
        return {"raw_stdout": result, "http_status": 200, "tool": "test_env"}

class RealityBoundary:
    def verify(self, raw_result: Dict, action_id: str) -> Dict:
        input_hash = hashlib.sha256(json.dumps(raw_result).encode()).hexdigest()
        receipt = {
            "action_id": action_id,
            "tool": raw_result.get("tool", "unknown"),
            "input_hash": input_hash,
            "timestamp": time.time(),
            "environment_result": raw_result.get("raw_stdout", "")
        }
        return receipt

class MeasurementEngine:
    def measure(self, receipt: Dict) -> Dict:
        # Em teste real extrairia do receipt
        revenue = 0.0
        return {"compute_cost": 0.01, "financial_revenue": revenue, "receipt_hash": receipt['input_hash']}

class LearningEngine:
    def learn(self, brain: BrainAdapter, metrics: Dict, receipt: Dict, enable_learning: bool = True) -> Dict:
        if not enable_learning:
            return {"prior_update": "learning_disabled"}
        
        schema = {
            "type": "object",
            "properties": {
                "learned_rule": {"type": "string"},
                "shift_in_strategy": {"type": "string"}
            }
        }
        prompt = f"Analise o recibo de realidade: {json.dumps(receipt)}. Métricas: {json.dumps(metrics)}. Extraia uma regra econômica restrita (o que funcionou/não funcionou)."
        return brain.ask(prompt, schema)

class IEARuntime:
    def __init__(self, enable_learning=True):
        self.brain = BrainAdapter()
        self.state = WorldState()
        self.enable_learning = enable_learning

    def cycle(self, cycle_id):
        print(f"\\n=== CICLO {cycle_id} ===")
        print(f"Estado Atual: {self.state.get_state()['environment_facts'][-1]}")
        hyps = OpportunityEngine().generate_hypotheses(self.brain, self.state.get_state())
        print(f"[Hypotheses] {len(hyps)} geradas.")
        evals = EvaluationEngine().evaluate(self.brain, hyps)
        dec = DecisionEngine().decide(evals)
        print(f"[Decision] {dec}")
        
        act_res = ActionEngine().execute(dec)
        receipt = RealityBoundary().verify(act_res, f"C{cycle_id}")
        metrics = MeasurementEngine().measure(receipt)
        
        learned = LearningEngine().learn(self.brain, metrics, receipt, self.enable_learning)
        print(f"[Learned State] {learned}")
        
        self.state.update(json.dumps(learned))

if __name__ == '__main__':
    print("Iniciando IEA Runtime (Real LLM)...")
    try:
        kernel = IEARuntime(enable_learning=True)
        kernel.cycle(1)
        kernel.cycle(2)
    except Exception as e:
        print(f"FALHA FATAL: {e}")
