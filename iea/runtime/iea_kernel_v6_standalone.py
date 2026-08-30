import os
import json
import time
import urllib.request
import urllib.parse
import socket
import hashlib
from typing import Dict, List, Any

# ==============================================================================
# IEA RUNTIME KERNEL v6 (Standalone Autonomous Loop)
# ==============================================================================

DIR_STATE = "iea/state/"
DIR_MEMORY = "iea/memory/"
os.makedirs(DIR_STATE, exist_ok=True)
os.makedirs(DIR_MEMORY, exist_ok=True)

class BrainAdapter:
    def __init__(self):
        self.gemini_key = os.environ.get("GEMINI_API_KEY")
        if not self.gemini_key:
            raise ValueError("GEMINI_API_KEY not found in environment. Cannot start True Brain.")

    def ask(self, context: str, schema: dict) -> dict:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key={self.gemini_key}"
        payload = {
            "contents": [{"parts": [{"text": context + "\n\nRESTRICT OUTPUT TO JSON ONLY (Schema):\n" + json.dumps(schema)}]}],
            "generationConfig": {"temperature": 0.2, "responseMimeType": "application/json"}
        }
        req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req, timeout=30) as response:
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
            self.write(default_data)
    
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
                    "target_url": {"type": "string"},
                    "target_payload": {"type": "string"},
                    "justification": {"type": "string"}
                }, "required": ["hypothesis_id", "action_name", "target_url"]
            }
        }
        mission = ObjectiveEngine.get_mission()
        context = f"MISSION:\n{mission}\n\nWORLD_STATE:\n{json.dumps(world_state)}\n\nLEARNED_STATE:\n{json.dumps(learning_state)}\n\nGenerate exactly 2 hypotheses. If no economic action is justifiable, you must propose an action_name 'NO_ACTION'."
        return brain.ask(context, schema)

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
                    "confidence": {"type": "number"}
                }
            }
        }
        return brain.ask(f"Avalie as hipóteses: {json.dumps(hypotheses)}", schema)

class DecisionEngine:
    def decide(self, brain: BrainAdapter, hypotheses: List[Dict], evaluations: List[Dict], world_state: dict) -> Dict:
        schema = {
            "type": "object",
            "properties": {
                "selected_hypothesis_id": {"type": "string"},
                "reasoning": {"type": "string"}
            }
        }
        llm_decision = brain.ask(f"Escolha a hipótese ótima dado avaliações: {json.dumps(evaluations)}. Hipóteses: {json.dumps(hypotheses)}", schema)
        
        selected_id = llm_decision.get("selected_hypothesis_id")
        proposed_hyp = next((h for h in hypotheses if h["hypothesis_id"] == selected_id), None)
        
        if not proposed_hyp or proposed_hyp.get("action_name") == "NO_ACTION":
            return {"validation_result": "APPROVED_NO_ACTION", "system_validated_decision": {"action_name": "NO_ACTION"}}
            
        validation_result = "REJECTED"
        system_validated_decision = {"action_name": "NO_ACTION"}
        
        if proposed_hyp.get("action_name") in world_state["resources"]:
            validation_result = "APPROVED"
            system_validated_decision = proposed_hyp
        else:
            validation_result = "REJECTED_TOOL_NOT_IN_RESOURCES"
            
        return {
            "llm_proposed_decision": proposed_hyp,
            "system_validated_decision": system_validated_decision,
            "validation_result": validation_result
        }

class OutboundPolicyEngine:
    def __init__(self):
        self.allowlist_domains = ["httpbin.org", "api.coingecko.com"]
        
    def _is_safe_ip(self, ip: str) -> bool:
        if ip.startswith("127.") or ip.startswith("10.") or ip.startswith("192.168.") or ip.startswith("172."):
            return False
        if ip == "169.254.169.254":
            return False
        return True

    def validate(self, url: str) -> Dict:
        try:
            parsed = urllib.parse.urlparse(url)
            if parsed.hostname not in self.allowlist_domains:
                return {"status": "REJECTED", "reason": "DOMAIN_NOT_IN_ALLOWLIST"}
            ip = socket.gethostbyname(parsed.hostname)
            if not self._is_safe_ip(ip):
                return {"status": "REJECTED", "reason": "PRIVATE_IP_BLOCKED"}
            return {"status": "APPROVED", "reason": "POLICY_PASSED"}
        except Exception as e:
            return {"status": "REJECTED", "reason": f"PARSING_ERROR: {str(e)}"}

class ActionEngine:
    def __init__(self):
        self.outbound_policy = OutboundPolicyEngine()
        self.tools = {
            "http_get": self._tool_http_get,
            "http_post_restricted": self._tool_http_post_restricted,
            "NO_ACTION": lambda u, p: {"status": "SUCCESS", "url": "", "http_status": 200, "response": "IDLE"}
        }
        
    def _tool_http_get(self, url: str, payload: str = "") -> Dict:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'IEA-Runtime/1.0'})
            with urllib.request.urlopen(req, timeout=5) as res:
                content = res.read().decode('utf-8')[:5000] 
                return {"status": "SUCCESS", "url": res.geturl(), "http_status": res.getcode(), "response": content}
        except Exception as e:
            return {"status": "FAILED", "url": url, "http_status": 0, "response": f"ERROR: {str(e)}"}

    def _tool_http_post_restricted(self, url: str, json_payload: str) -> Dict:
        validation = self.outbound_policy.validate(url)
        if validation["status"] == "REJECTED":
            return {"status": "BLOCKED", "url": url, "http_status": 0, "response": validation["reason"]}
            
        try:
            data = json_payload.encode('utf-8')
            req = urllib.request.Request(url, data=data, headers={'User-Agent': 'IEA-Runtime/1.0', 'Content-Type': 'application/json'})
            with urllib.request.urlopen(req, timeout=5) as res:
                content = res.read().decode('utf-8')[:5000]
                return {"status": "SUCCESS", "url": res.geturl(), "http_status": res.getcode(), "response": content}
        except Exception as e:
            return {"status": "FAILED", "url": url, "http_status": 0, "response": f"ERROR: {str(e)}"}

    def execute(self, decision_block: Dict) -> Dict:
        decision = decision_block["system_validated_decision"]
        tool_name = decision.get("action_name")
        url = decision.get("target_url", "")
        payload = decision.get("target_payload", "")
        
        if tool_name not in self.tools:
            return {"tool": tool_name, "requested_url": url, "status": "FAILED", "response": "Tool not available"}
            
        res = self.tools[tool_name](url, payload)
        return {"tool": tool_name, "requested_url": url, "payload_used": payload, **res}

class RealityBoundary:
    def create_receipt(self, action_id: str, raw_result: Dict) -> Dict:
        req_hash = hashlib.sha256((raw_result.get("requested_url", "") + raw_result.get("payload_used", "")).encode()).hexdigest()
        res_hash = hashlib.sha256(raw_result.get("response", "").encode()).hexdigest()
        
        return {
            "action_id": action_id,
            "tool": raw_result.get("tool"),
            "destination": raw_result.get("url", raw_result.get("requested_url")),
            "request_hash": req_hash,
            "request_timestamp": time.time(),
            "response_hash": res_hash,
            "http_status": raw_result.get("http_status", 0),
            "response_size": len(raw_result.get("response", "")),
            "response": raw_result.get("response", ""),
            "execution_status": raw_result.get("status")
        }

class LearningEngine:
    def update_state(self, brain: BrainAdapter, receipt: Dict, current_state: Dict) -> Dict:
        schema = {
            "type": "object",
            "properties": {
                "observed_fact": {"type": "string"},
                "hypothesis_update": {"type": "string"},
                "economic_success": {"type": "boolean"}
            }
        }
        signal = brain.ask(f"Analise o Reality Receipt: {json.dumps(receipt)}. ATENCAO: HTTP 200 não significa sucesso econômico. É apenas TOOL_SUCCESS.", schema)
        
        update_record = {
            "LEARNING_MODE": "SEMANTIC_SIGNAL",
            "action_id": receipt["action_id"],
            "learning_source": "TOOL_OBSERVATION",
            "evidence": receipt["execution_status"] + " | " + receipt["response"][:100],
            "prior_after": signal
        }
        
        current_state["historical_signals"].append(update_record)
        return current_state

class IEARuntime:
    def __init__(self):
        self.brain = BrainAdapter()
        self.world = PersistentState(DIR_STATE+"world.json", {
            "resources": ["http_get", "http_post_restricted"],
            "permissions": ["READ-ONLY", "POST TO ALLOWLIST", "NO MONEY", "NO FAKE IDENTITY"]
        })
        self.learning = PersistentState(DIR_MEMORY+"learning.json", {"historical_signals": []})
        
    def run_cycle(self, cycle_id: int):
        print(f"\\n[IEA RUNTIME] Iniciando Ciclo {cycle_id}")
        world_state = self.world.read()
        learning_state = self.learning.read()
        
        hyps = OpportunityEngine().generate_hypotheses(self.brain, world_state, learning_state)
        evals = EvaluationEngine().evaluate(self.brain, hyps)
        decision_block = DecisionEngine().decide(self.brain, hyps, evals, world_state)
        
        action_result = ActionEngine().execute(decision_block)
        receipt = RealityBoundary().create_receipt(f"C{cycle_id}", action_result)
        
        new_learning = LearningEngine().update_state(self.brain, receipt, learning_state)
        self.learning.write(new_learning)
        
        with open(DIR_MEMORY+"economic_ledger.jsonl", "a") as f:
            f.write(json.dumps({"cycle": cycle_id, "decision": decision_block, "receipt": receipt}) + "\\n")
            
        print(f"[IEA RUNTIME] Ciclo {cycle_id} gravado no Ledger. Ação tomada: {receipt['tool']}")

if __name__ == '__main__':
    print("Iniciando IEA Runtime V6 Standalone...")
    try:
        kernel = IEARuntime()
        kernel.run_cycle(1)
        kernel.run_cycle(2)
    except Exception as e:
        print(f"FALHA FATAL DO RUNTIME: {e}")
