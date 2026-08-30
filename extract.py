import re

with open(r'C:\Users\Alexandre\andradeflorio\todeacordo_chat_history.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Split by <USER_REQUEST>
chunks = content.split('<USER_REQUEST>')

output = []
current_date = "Unknown Date"

for i in range(1, len(chunks)):
    chunk = chunks[i]
    
    # Extract request
    request_end = chunk.find('</USER_REQUEST>')
    request_text = chunk[:request_end].strip() if request_end != -1 else ""
    
    # Extract date if present in the chunk before this request
    # Actually, the date is usually right after <USER_REQUEST> inside <ADDITIONAL_METADATA>
    date_match = re.search(r'The current local time is: (\d{4}-\d{2}-\d{2})', chunk)
    if date_match:
        current_date = date_match.group(1)
        
    if len(request_text) > 200:
        request_text = request_text[:200] + "..."
        
    request_text = request_text.replace('\n', ' ')
    output.append(f"- **[{current_date}]** Pedido: {request_text}")

with open(r'C:\Users\Alexandre\masterkey-frontend\timeline_resumo.md', 'w', encoding='utf-8') as f:
    f.write("# Histórico Cronológico Bruto (Extraído)\n\n")
    f.write("\n".join(output))

print(f"Extraídas {len(output)} interações.")
