import os
import json
import time
import urllib.request
import hashlib
from typing import Dict, List, Any

# ==============================================================================
# IEA RUNTIME KERNEL v3 (Persistent, Non-Hardcoded, Real Action Boundary)
# ==============================================================================

DIR_STATE = "iea/state/"
DIR_MEMORY = "iea/memory/"
os.makedirs(DIR_STATE, exist_ok=True)
os.makedirs(DIR_MEMORY, exist_ok=True)

class BrainAdapter:
    def __init__(self):
        self.gemini_key = os.environ.get("GEMINI_API_KEY")
        if not self.gemini_key:
            raise ValueError("GEMINI_API_KEY not found in environment.")

    def ask(self, prompt: str, schema: dict) -> dict:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={self.gemini_key}"
        payload = {
            "contents": [{"parts": [{"text": prompt + "\n\nRESTRICT OUTPUT TO JSON ONLY (Schema):\n" + json.dumps(schema)}]}],
            "generationConfig": {"temperature": 0.3, "responseMimeType": "application/json"}
        }
        req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read())
            return json.loads(res['candidates'][0]['content']['parts'][0]['text'])

class ObjectiveEngine:
    @staticmethod
    def get_mission() -> str:
        return "Descobrir, criar e capturar valor econômico lícito para o proprietário dentro das permissões e recursos disponíveis."

class PersistentState:
    def __init__(self, filename, default_data):
        self.filepath = filename
        if not os.path.exists(self.filepath):
            with open(self.filepath, 'w') as f:
                json.dump(default_data, f)
    
    def read(self):
        with open(self.filepath, 'r') as f:
            return json.load(f)
            
    def write(self, data):
        with open(self.filepath, 'w') as f:
            json.dump(data, f, indent=2)

class OpportunityEngine:
    def generate_hypotheses(self, brain: BrainAdapter, world_state: dict, learning_state: dict) -> List[Dict]:
        schema = {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "hypothesis_id": {"type": "string"},
                    "action_name": {"type": "string"},
                    "target_payload": {"type": "string"},
                    "justification": {"type": "string"}
                }, "required": ["hypothesis_id", "action_name", "target_payload"]
            }
        }
        prompt = f"Gere hipóteses econômicas observando o mundo: {json.dumps(world_state)} e aprendizados: {json.dumps(learning_state)}"
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
                    "probability_of_success": {"type": "number"},
                    "requires_owner_resource": {"type": "boolean"}
                }
            }
        }
        return brain.ask(f"Avalie as hipóteses: {json.dumps(hypotheses)}", schema)

class DecisionEngine:
    def decide(self, brain: BrainAdapter, hypotheses: List[Dict], evaluations: List[Dict]) -> Dict:
        schema = {
            "type": "object",
            "properties": {
                "selected_hypothesis_id": {"type": "string"},
                "reasoning": {"type": "string"}
            }
        }
        res = brain.ask(f"Escolha a melhor hipótese dado as avaliações: {json.dumps(evaluations)}. Hipóteses: {json.dumps(hypotheses)}", schema)
        selected_id = res.get("selected_hypothesis_id")
        for h in hypotheses:
            if h["hypothesis_id"] == selected_id:
                return h
        return hypotheses[0] if hypotheses else {"action_name": "idle"}

class ActionEngine:
    def __init__(self):
        self.tools = {
            "http_get": self._tool_http_get
        }
        
    def _tool_http_get(self, payload: str):
        try:
            req = urllib.request.Request(payload, headers={'User-Agent': 'IEA-Runtime/1.0'})
            with urllib.request.urlopen(req, timeout=5) as res:
                return res.read().decode('utf-8')[:500] # Limite para evitar estourar memoria
        except Exception as e:
            return f"ERROR: {str(e)}"

    def execute(self, action: Dict) -> Dict:
        tool_name = action.get("action_name")
        payload = action.get("target_payload")
        
        if tool_name not in self.tools:
            return {"tool": tool_name, "status": "failed", "raw_output": "Tool not found or unauthorized"}
            
        result = self.tools[tool_name](payload)
        return {"tool": tool_name, "status": "executed", "raw_output": result, "payload_used": payload}

class RealityBoundary:
    def create_receipt(self, action_id: str, raw_result: Dict) -> Dict:
        in_hash = hashlib.sha256(str(raw_result.get("payload_used", "")).encode()).hexdigest()
        out_hash = hashlib.sha256(str(raw_result.get("raw_output", "")).encode()).hexdigest()
        return {
            "action_id": action_id,
            "tool": raw_result["tool"],
            "request_hash": in_hash,
            "request_timestamp": time.time(),
            "response_hash": out_hash,
            "response": raw_result["raw_output"],
            "status": raw_result["status"]
        }

class LearningEngine:
    def update_state(self, brain: BrainAdapter, receipt: Dict, current_learning_state: Dict) -> Dict:
        schema = {
            "type": "object",
            "properties": {
                "new_abstract_rule": {"type": "string"},
                "friction_identified": {"type": "string"}
            }
        }
        llm_insight = brain.ask(f"Extracao abstrata baseada neste recibo irrefutavel: {json.dumps(receipt)}", schema)
        
        # O LLM nao sobrescreve o estado, ele gera um sinal estruturado.
        # O Código Python apenda esse sinal ao estado matemático.
        current_learning_state["historical_signals"].append({
            "receipt_id": receipt["action_id"],
            "insight": llm_insight
        })
        return current_learning_state

class IEARuntime:
    def __init__(self):
        self.brain = BrainAdapter()
        self.world = PersistentState(DIR_STATE+"world.json", {
            "resources": ["Internet connection", "http_get_tool"],
            "permissions": ["REQUIRES_OWNER_RESOURCE is allowed for identity"]
        })
        self.learning = PersistentState(DIR_MEMORY+"learning.json", {"historical_signals": []})
        
    def run_cycle(self, cycle_id: int):
        print(f"\\n[KERNEL] Iniciando Ciclo {cycle_id}")
        world_state = self.world.read()
        learning_state = self.learning.read()
        
        # Perceber & Gerar
        hyps = OpportunityEngine().generate_hypotheses(self.brain, world_state, learning_state)
        # Avaliar
        evals = EvaluationEngine().evaluate(self.brain, hyps)
        # Decidir
        decision = DecisionEngine().decide(self.brain, hyps, evals)
        
        # Agir Realmente
        action_result = ActionEngine().execute(decision)
        
        # Limite da Realidade
        receipt = RealityBoundary().create_receipt(f"C{cycle_id}", action_result)
        
        # Aprender
        new_learning = LearningEngine().update_state(self.brain, receipt, learning_state)
        self.learning.write(new_learning)
        
        # Registrar Ledger
        with open(DIR_MEMORY+"economic_ledger.jsonl", "a") as f:
            f.write(json.dumps({"cycle": cycle_id, "decision": decision, "receipt": receipt}) + "\\n")
            
        print(f"[KERNEL] Ciclo {cycle_id} gravado no Ledger. Ferramenta usada: {receipt['tool']}")

if __name__ == '__main__':
    print("Kernel V3 pronto para instanciar (Missing Key).")
