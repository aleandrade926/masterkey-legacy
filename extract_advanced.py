import re
import os
import io

input_path = r'C:\Users\Alexandre\masterkey-frontend\todeacordo_chat_history.md'
output_path = r'C:\Users\Alexandre\masterkey-frontend\.agents\GLOBAL_CHANGELOG_ANCIENT.md'

with open(input_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Split the content by the user delimiter
chunks = re.split(r'## .*?Usu.rio', content, flags=re.IGNORECASE)

entries = []

for chunk in chunks[1:]: # Skip the first header part
    # Extract date from ADDITIONAL_METADATA
    date_match = re.search(r'The current local time is: (\d{4}-\d{2}-\d{2})', chunk)
    date_str = date_match.group(1) if date_match else "Desconhecida"
    
    # Extract user prompt (NO TRUNCATION)
    user_prompt = "Sem texto"
    req_match = re.search(r'<USER_REQUEST>(.*?)</USER_REQUEST>', chunk, re.DOTALL)
    if req_match:
        user_prompt = req_match.group(1).strip()
        # Clean up newlines for better markdown formatting, but KEEP all text
        user_prompt = user_prompt.replace('\n', '  \n')
    
    # Find AI actions
    # Split this chunk by Antigravity marker
    ai_chunks = re.split(r'## .*?Antigravity', chunk, flags=re.IGNORECASE)
    
    files_touched = set()
    repos_touched = set()
    commands_run = set()
    
    for ai_chunk in ai_chunks[1:]:
        # Find file paths in diffs or code blocks
        paths = re.findall(r'([A-Za-z]:\\[\w\\\.\-]+)', ai_chunk)
        for p in paths:
            if 'Alexandre\\' in p:
                files_touched.add(p)
                # Extract repo name
                parts = p.split('\\')
                try:
                    idx = parts.index('Alexandre')
                    if len(parts) > idx + 1:
                        repo = parts[idx + 1]
                        if not repo.startswith('.'):
                            repos_touched.add(repo)
                except:
                    pass
        
        # Find commands
        cmds = re.findall(r'`ash\s*\n(.*?)\n`', ai_chunk, re.DOTALL)
        for c in cmds:
            commands_run.add(c.strip())
            
    # Format entry
    entry = f"### [Data: {date_str}] - Repositórios afetados: {', '.join(repos_touched) if repos_touched else 'Nenhum'}\n"
    entry += f"- **Pedido do Usuário:**\n> {user_prompt}\n"
    
    if files_touched:
        entry += f"- **Arquivos Modificados/Lidos:**\n"
        for f in list(files_touched)[:10]: # limit to 10 to avoid bloat
            entry += f"  - {f}\n"
        if len(files_touched) > 10:
            entry += f"  - *(... e mais {len(files_touched)-10} arquivos)*\n"
            
    if commands_run:
        entry += f"- **Comandos executados:**\n"
        for c in list(commands_run)[:5]:
            entry += f"  - {c[:150]}...\n"
            
    entries.append(entry)

with open(output_path, 'w', encoding='utf-8') as f:
    f.write("# O ARQUIVÃO CRONOLÓGICO DE TODAS AS INTERAÇÕES\n")
    f.write("> Extraído do log de 4.8MB. Falas do usuário integralmente preservadas.\n\n")
    f.write("\n\n---\n\n".join(entries))

print(f"Processed {len(entries)} interactions with FULL text preservation.")
