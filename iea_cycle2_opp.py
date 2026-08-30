import json
mission = "Descobrir, criar e capturar valor econômico lícito para o proprietário dentro das permissões e recursos disponíveis."
world_state = {"resources": ["http_get"], "permissions": ["READ-ONLY", "PUBLIC WEB", "BOUNDED"]}
learning_state = {
  "historical_signals": [
    {
      "LEARNING_MODE": "SEMANTIC_SIGNAL",
      "action_id": "C1",
      "prior_before": None,
      "evidence": "SUCCESS | {\"bitcoin\":{\"usd\":80368},\"ethereum\":{\"usd\":2514.47}}",
      "prior_after": {
        "observed_fact": "A chamada HTTP GET para a API do CoinGecko retornou os preços em USD do Bitcoin (80368) e Ethereum (2514.47) com sucesso (status 200).",
        "hypothesis_update": "O endpoint simple/price da API do CoinGecko é funcional, estável e pode ser utilizado para consultas públicas e diretas de cotações de criptomoedas em moedas fiduciárias.",
        "confidence": 0.95
      },
      "update_type": "reinforcement",
      "update_magnitude": 0.95
    }
  ]
}

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
print(prompt)
