import json
import sys

mission = "Descobrir, criar e capturar valor econômico lícito para o proprietário dentro das permissões e recursos disponíveis."
world_state = {"resources": ["http_get"], "permissions": ["READ-ONLY", "PUBLIC WEB", "BOUNDED"]}
learning_state = {"historical_signals": []}

prompt = f"MISSION:\n{mission}\n\nWORLD_STATE:\n{json.dumps(world_state)}\n\nLEARNED_STATE:\n{json.dumps(learning_state)}\n\nGenerate exactly 2 hypotheses based ONLY on available resources."
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
print("PROMPT_OPPORTUNITY:")
print(prompt)
print("SCHEMA:")
print(json.dumps(schema, indent=2))
