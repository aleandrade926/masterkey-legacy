import json
import os

BASE_DIR = r"C:\Users\Alexandre\masterkey-frontend\.agents\scripts"
os.makedirs(BASE_DIR, exist_ok=True)

influencers = [
    {
        "id": "INF-001",
        "nome": "Duda Lira",
        "perfil": "@dudalira",
        "cluster": "Elegância Clássica & Quiet Luxury",
        "nicho": "Consumo consciente, cortes atemporais, alta alfaiataria",
        "canal_contato": "assessoria@dudalira.com.br",
        "status": "mapeado",
        "prioridade": "Alta"
    },
    {
        "id": "INF-002",
        "nome": "Juliana Christ",
        "perfil": "@julianachrist",
        "cluster": "Imagem Corporativa & Advocacia",
        "nicho": "Vestuário para executivas, advogadas, postura profissional",
        "canal_contato": "contato@julianachrist.com.br",
        "status": "mapeado",
        "prioridade": "Alta"
    },
    {
        "id": "INF-003",
        "nome": "Vitória Portes",
        "perfil": "@vitoriaportes",
        "cluster": "Estilo Atemporal & Reviews de Peças",
        "nicho": "Marroquinaria clássica, bolsas funcionais, elegância acessível",
        "canal_contato": "comercial@vitoriaportes.com.br",
        "status": "mapeado",
        "prioridade": "Alta"
    },
    {
        "id": "INF-004",
        "nome": "Maira Camargo",
        "perfil": "@mairacamargo",
        "cluster": "Consultoria de Imagem Executiva",
        "nicho": "Mulheres de negócios, guarda-roupa inteligente para trabalho",
        "canal_contato": "contato@mairacamargo.com.br",
        "status": "mapeado",
        "prioridade": "Média"
    },
    {
        "id": "INF-005",
        "nome": "Renata Meins",
        "perfil": "@renatameins",
        "cluster": "Autoridade Visual & Imagem",
        "nicho": "Visagismo, elegância, psicologia das cores e peças-chave",
        "canal_contato": "parcerias@renatameins.com.br",
        "status": "mapeado",
        "prioridade": "Média"
    },
    {
        "id": "INF-006",
        "nome": "Camila Gaio",
        "perfil": "@camila.gaio",
        "cluster": "Moda para o Trabalho & Estilo Real",
        "nicho": "Jornalismo de moda, dicas práticas para ambiente corporativo",
        "canal_contato": "comercial@camilagaio.com.br",
        "status": "mapeado",
        "prioridade": "Média"
    },
    {
        "id": "INF-007",
        "nome": "Lu Tranchesi",
        "perfil": "@lutranchesi",
        "cluster": "Alta Sociedade & Elegância Natural",
        "nicho": "Lifestyle corporativo, maternidade elegante, moda clássica",
        "canal_contato": "contato@lutranchesi.com.br",
        "status": "mapeado",
        "prioridade": "Alta"
    }
]

fornecedores = [
    {
        "id": "OEM-001",
        "empresa": "Marroquinaria D'Rossi",
        "cidade": "Campo Bom",
        "uf": "RS",
        "polo": "Vale dos Sinos",
        "especialidade": "Bolsas de couro estruturadas e pesponto fino de alto padrão",
        "contato_email": "comercial@drossiartefatos.com.br",
        "status": "mapeado",
        "moq_estimado": "30 a 50 unidades"
    },
    {
        "id": "OEM-002",
        "empresa": "Artefatos de Couro Belmonte",
        "cidade": "Novo Hamburgo",
        "uf": "RS",
        "polo": "Vale dos Sinos",
        "especialidade": "Private label para grandes marcas nacionais, linha feminina estruturada",
        "contato_email": "desenvolvimento@belmontemarroquinaria.com.br",
        "status": "mapeado",
        "moq_estimado": "50 a 100 unidades"
    },
    {
        "id": "OEM-003",
        "empresa": "Couro & Cia Indústria",
        "cidade": "Sapiranga",
        "uf": "RS",
        "polo": "Vale dos Sinos",
        "especialidade": "Montagem de bolsas leves com alças reforçadas e forros técnicos",
        "contato_email": "contato@courociaindustria.com.br",
        "status": "mapeado",
        "moq_estimado": "50 unidades"
    },
    {
        "id": "OEM-004",
        "empresa": "Kênia & Kátia Artefatos de Couro",
        "cidade": "Franca",
        "uf": "SP",
        "polo": "Franca",
        "especialidade": "Couro vacum legítimo, acabamento encerado e marroquinaria executiva",
        "contato_email": "vendas@keniakatialp.com.br",
        "status": "mapeado",
        "moq_estimado": "30 a 50 unidades"
    },
    {
        "id": "OEM-005",
        "empresa": "Bolsas Relicário Fábrica OEM",
        "cidade": "Jaú",
        "uf": "SP",
        "polo": "Jaú / Centro-Oeste Paulista",
        "especialidade": "Bolsas femininas estruturadas, modelos tote, mochilas e divisórias para notebook",
        "contato_email": "faccionamento@bolsasrelicario.com.br",
        "status": "mapeado",
        "moq_estimado": "30 unidades"
    },
    {
        "id": "OEM-006",
        "empresa": "Curtume e Marroquinaria Santa Lúcia",
        "cidade": "Estância Velha",
        "uf": "RS",
        "polo": "Vale dos Sinos",
        "especialidade": "Couros tratados hidrofóbicos (DWR) e marroquinaria sob encomenda",
        "contato_email": "contato@santaluciacouro.com.br",
        "status": "mapeado",
        "moq_estimado": "50 unidades"
    },
    {
        "id": "OEM-007",
        "empresa": "Bellagotti Marroquinaria Fina",
        "cidade": "Nova Serrana",
        "uf": "MG",
        "polo": "Centro-Oeste Mineiro",
        "especialidade": "Bolsas executivas com ferragens de alto luxo em verniz cataforético",
        "contato_email": "atendimento@bellagottiacessorios.com.br",
        "status": "mapeado",
        "moq_estimado": "40 a 60 unidades"
    }
]

with open(os.path.join(BASE_DIR, "influencers_barbara_brown.json"), "w", encoding="utf-8") as f:
    json.dump(influencers, f, ensure_ascii=False, indent=2)

with open(os.path.join(BASE_DIR, "fornecedores_barbara_brown.json"), "w", encoding="utf-8") as f:
    json.dump(fornecedores, f, ensure_ascii=False, indent=2)

print("Bases de dados geradas com sucesso!")
print(f"Total Influenciadoras: {len(influencers)}")
print(f"Total Fornecedores OEM: {len(fornecedores)}")
