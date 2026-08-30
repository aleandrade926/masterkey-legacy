import json
import sys
sys.path.append(r'C:\Users\Alexandre\.gemini\antigravity\brain\dd2ef333-25c3-41b5-b482-480b38285e37\scratch')
from iea_kernel_v5 import ActionEngine, RealityBoundary

engine = ActionEngine()
boundary = RealityBoundary()

url = "https://httpbin.org/post"
payload = json.dumps({"insight": "Bitcoin has a 5% spread across monitored exchanges.", "confidence": 0.92, "source": "IEA_RUNTIME"})

print("Executando POST Mechanico...")
raw_result = engine.execute("http_post_restricted", url, payload)
receipt = boundary.create_receipt("TEST_POST_1", raw_result)

print(json.dumps(receipt, indent=2))
