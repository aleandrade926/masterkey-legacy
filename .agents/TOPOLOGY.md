# ðŸ§  MASTER BRAIN: Arquitetura e HistÃ³rico (Changelog)
*Documento Central de Contexto para IAs (NotebookLM, Gemini, ChatGPT)*

**Objetivo deste documento:** Evitar que diferentes instÃ¢ncias de IA desfaÃ§am lÃ³gicas anteriores. Este arquivo contÃ©m a verdade absoluta da arquitetura e a cronologia das decisÃµes de cada projeto. 

---

## 1. PROJETO: ToDeAcordo (Consensus Closing Platform & Extension)
- **Domínios Mapeados:** `todeacordo.com.br`, `www.todeacordo.com.br`, `app.todeacordo.com.br`
- **Pasta Local Única e Oficial:** `c:\Users\Alexandre\todeacordo`
- **Projeto Vercel Oficial:** `todeacordo` (ID: `prj_tAFPgDonYe2ZA5AMYYb6FkOYpaRx`)
- **Repositório Git:** `https://github.com/aleandrade926/todeacordo.git`
- **Stack:** React 19, Vite, Tailwind CSS, Supabase (Auth/DB), Chrome Extension Manifest V3.
- **Arquitetura e Regra Crítica:** Este projeto é 100% isolado física e logicamente. NUNCA misturar ou vincular os domínios `todeacordo.com.br` ao `masterkey-frontend` nem a projetos legados como `todeacordo-v2`. Todas as alterações do ToDeAcordo devem ser feitas e publicadas EXCLUSIVAMENTE em `c:\Users\Alexandre\todeacordo`.

## 1.1 PROJETO: TaxManagers SaaS (Portal do Sistema)
- **Domínio Mapeado:** `app.taxmanagers.com.br`
- **Pasta Local:** `c:\Users\Alexandre\masterkey-frontend`
- **Stack:** React, Vite, Tailwind CSS, Supabase, Wouter.
- **Objetivo:** Portal do sistema TaxManagers, ferramentas internas, CFO Tax AI, Conversor NFS-e e Gestão de Entidades. NÃO responde por domínios de marketing nem pelo ToDeAcordo.

---

## 2. PROJETO: Andrade & Florio (Site Institucional de Advocacia)
- **DomÃ­nio Mapeado:** `andradeflorio.com.br`
- **Pasta Local:** `c:\Users\Alexandre\andrade-florio-web-recuperado` (A pasta antiga "andradeflorio" é um clone desatualizado e DEVE SER IGNORADA)
- **Stack:** React, Tailwind (Clone direto do Monorepo principal).

### 2.1 Arquitetura
Esta pasta Ã© um "Fork FÃ­sico" do `masterkey-frontend`. Ela foi separada para que deploys massivos no SaaS nÃ£o derrubem o site institucional do escritÃ³rio. O site consome o componente `<AndradeFlorioHome />`. **Nota crÃ­tica:** Todo o cÃ³digo do SaaS (TaxManagers) existe latente nesta pasta, mas a rota raiz obriga a renderizaÃ§Ã£o da Landing Page do escritÃ³rio de advocacia.

### 2.2 Cronologia de MudanÃ§as (Changelog)
- *(HistÃ³rico)* **SeparaÃ§Ã£o de RepositÃ³rio:** A pasta foi clonada para isolamento de build na Vercel (Projeto: `andrade-florio-web`).
- *(25/08/2026)* **Triagem Comercial:** DefiniÃ§Ã£o da lÃ³gica onde advogados parceiros (Dra. LÃ­bia) sÃ£o preservados como "autoridade tÃ©cnica", enquanto Alexandre atua como "Diretor Comercial". O contato na Landing Page nÃ£o deve ser o celular da especialista diretamente, mas sim um link de e-mail ou nÃºmero de triagem.

---

## 3. PROJETO: Guia de UsucapiÃ£o / E-book (Funil Thiago Boeiras)
- **DomÃ­nio Mapeado:** `guia.repesquisa.com.br`
- **Pasta Local:** `c:\Users\Alexandre\masterkey-frontend\public-ebook`
- **Stack:** HTML5 Puro, JavaScript Vanilla, CSS CDN (Tailwind).

### 3.1 Arquitetura e Funil
Trata-se de um infoproduto (E-book de 144 slides) hospedado fora do React. Projetado para rodar campanhas de Google Ads (Fundo de Funil e CorrespondÃªncia Exata) gastando o mÃ­nimo possÃ­vel de CPC. O e-book barato serve como "Tripwire" (pagar o custo do trÃ¡fego) para filtrar e captar leads de altÃ­ssimo valor (High Ticket) para o escritÃ³rio jurÃ­dico.

### 3.2 Cronologia de MudanÃ§as (Changelog)
- *(Antes de 24/08)* **Desenvolvimento Base:** CriaÃ§Ã£o da estrutura base com proteÃ§Ã£o de tela via `localStorage` (Password Gate) no `manual.html`.
- *(24/08/2026)* **CorreÃ§Ã£o de Nomes:** SubstituiÃ§Ã£o global em todos os HTMLs de "LÃ­dia" para "LÃ­bia" para manter a integridade da Dra. LÃ­bia Florio.
- *(24/08/2026)* **UX do Diploma:** Adicionado efeito Lightbox na miniatura do "Diploma USP" para gerar mais prova social.
- *(24/08/2026)* **Acesso a Alunos:** InclusÃ£o de um botÃ£o "JÃ¡ Ã© Aluno?" no topo do `index.html` e adiÃ§Ã£o da senha `LC2026` junto com a oficial `LF2026` no JavaScript do `manual.html`.
- *(25/08/2026)* **InserÃ§Ã£o da Isca High Ticket (WhatsApp Upsell):** Para pescar leads que acham o processo complexo, criamos um bloco luxuoso de "Assessoria JurÃ­dica" no final da pÃ¡gina, lincando o botÃ£o para o WhatsApp Comercial: `11 97867-1067`.
- *(25/08/2026)* **AdiÃ§Ã£o de BÃ´nus de Escassez:** Injetado alerta de "Consulta GrÃ¡tis para os 10 primeiros" com barras de progresso perto do botÃ£o de compra para forÃ§ar urgÃªncia, justificando ainda mais a consultoria High Ticket.

---
**âš ï¸ InstruÃ§Ã£o para a IA ao ler este arquivo:**
Se vocÃª for solicitado a alterar algo relacionado ao E-book, modifique o "PROJETO 3" (`public-ebook`). Se for o Site do EscritÃ³rio, vÃ¡ para "PROJETO 2" (`andradeflorio`). NUNCA misture as ediÃ§Ãµes de um escopo no outro. Leia o histÃ³rico antes de sugerir ou sobrescrever cÃ³digo.


## 4. PROJETO: TaxManagers Site Institucional (Landing Pages)
- **Domínio Mapeado:** 	axmanagers.com.br
- **Pasta Local:** c:\Users\Alexandre\taxmanagers-site (e possivelmente 	axmanagers)
- **Objetivo:** Pasta isolada exclusivamente para as Landing Pages comerciais e marketing. Separado do SaaS por segurança e velocidade de deploy.

## Correção de Rota do SaaS (masterkey-frontend)
- O monorepo masterkey-frontend NÃO responde mais por 	axmanagers.com.br. Ele agora responde exclusivamente pelo subdomínio do sistema: **pp.taxmanagers.com.br**.
