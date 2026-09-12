#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Agente Marcos - Disparador Autonomo de Parcerias Imobiliarias via Zoho Mail
Banca: Andrade & Florio Advocacia Empresarial
Remetente Oficial: marcos.silva@andradeflorio.com.br
Servidor SMTP: smtp.zoho.com:465 (SSL Criptografado)
"""

import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr
from email.header import Header
import time
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

SMTP_HOST = "smtp.zoho.com"
SMTP_PORT = 465
SMTP_USER = "marcos.silva@andradeflorio.com.br"
SMTP_PASS = "Zoho@2828"
SENDER_NAME = "Marcos - Parcerias Imobiliárias"
SENDER_EMAIL = "marcos.silva@andradeflorio.com.br"
AUDIT_BCC = "andradeflorio@gmail.com"

def montar_email(lead: dict) -> MIMEMultipart:
    msg = MIMEMultipart("alternative")
    
    assunto = f"retaguarda jurídica para os contratos da {lead['empresa']}"
    msg["Subject"] = Header(assunto, "utf-8")
    msg["From"] = formataddr((str(Header(SENDER_NAME, "utf-8")), SENDER_EMAIL))
    msg["To"] = lead["email"]
    msg["Reply-To"] = SENDER_EMAIL

    cidade_txt = f" em {lead['cidade']}" if lead.get("cidade") else ""

    texto_puro = f"""Olá, {lead['contato_nome']}. Tudo bem?

Acompanho a presença de destaque da {lead['empresa']}{cidade_txt}.

Conversando com diretores de imobiliárias, a queixa mais comum é sempre a mesma: o corretor perde um tempo precioso tentando redigir minutas no Word e, se o cliente chiar de alguma cláusula ou distrato, a culpa e o risco sobram inteiros para a imobiliária.

Estruturamos na Andrade & Florio uma retaguarda jurídica que assume 100% da redação das promessas de compra e venda e da checagem documental em até 24h a 48h, sem nenhum custo fixo de folha para a sua operação.

Sua equipe ganha um departamento jurídico de peso com chancela acadêmica da USP (Dra. Líbia Florio) que serve de para-raios legal caso qualquer parte questione o contrato, liberando seus corretores para focar apenas em fechar negócios.

Você pode conhecer mais sobre a retaguarda diretamente em nossa página:
https://www.andradeflorio.com.br/imobiliarias

Faz sentido uma conversa rápida de 10 minutos nesta semana para eu te mostrar como funciona na prática essa parceria?

Um abraço,
Marcos | Parcerias Imobiliárias
Andrade & Florio Advocacia Empresarial
marcos.silva@andradeflorio.com.br • www.andradeflorio.com.br/imobiliarias
"""

    texto_html = f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #1e293b; background-color: #ffffff; margin: 0; padding: 20px;">
  <div style="max-width: 580px; margin: 0 auto;">
    <p>Olá, <strong>{lead['contato_nome']}</strong>. Tudo bem?</p>
    
    <p>Acompanho a presença de destaque da <strong>{lead['empresa']}</strong>{cidade_txt}.</p>
    
    <p>Conversando com diretores de imobiliárias, a queixa mais comum é sempre a mesma: o corretor perde um tempo precioso tentando redigir minutas no Word e, se o cliente chiar de alguma cláusula ou distrato, a culpa e o risco sobram inteiros para a imobiliária.</p>
    
    <p>Estruturamos na <strong>Andrade & Florio</strong> uma retaguarda jurídica que assume 100% da redação das promessas de compra e venda e da checagem documental em até <strong>24h a 48h</strong>, sem nenhum custo fixo de folha para a sua operação.</p>
    
    <p>Sua equipe ganha um departamento jurídico de peso com chancela acadêmica da USP (<strong>Dra. Líbia Florio</strong>) que serve de para-raios legal caso qualquer parte questione o contrato, liberando seus corretores para focar apenas em fechar negócios.</p>
    
    <p style="margin: 25px 0;">
      <a href="https://www.andradeflorio.com.br/imobiliarias" style="background-color: #d4af37; color: #000000; padding: 12px 22px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
        Conhecer a Retaguarda para Imobiliárias &rarr;
      </a>
    </p>

    <p>Faz sentido uma conversa rápida de 10 minutos nesta semana para eu te mostrar como funciona na prática essa parceria?</p>
    
    <p style="margin-top: 30px; color: #64748b; font-size: 13.5px;">
      Um abraço,<br>
      <strong style="color: #0f172a;">Marcos | Parcerias Imobiliárias</strong><br>
      Andrade & Florio Advocacia Empresarial<br>
      <a href="mailto:marcos.silva@andradeflorio.com.br" style="color: #64748b;">marcos.silva@andradeflorio.com.br</a> • <a href="https://www.andradeflorio.com.br/imobiliarias" style="color: #64748b;">www.andradeflorio.com.br/imobiliarias</a>
    </p>
  </div>
</body>
</html>
"""

    msg.attach(MIMEText(texto_puro, "plain", "utf-8"))
    msg.attach(MIMEText(texto_html, "html", "utf-8"))
    return msg

def disparar_lote(leads: list, delay_segundos: int = 7):
    print(f"[*] Iniciando disparo de {len(leads)} leads via Zoho Mail ({SMTP_USER})...")
    
    enviados = 0
    falhas = 0

    for i, lead in enumerate(leads, 1):
        try:
            # Conexao por item ou reuso
            server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=20)
            server.ehlo()
            server.login(SMTP_USER, SMTP_PASS)
            
            msg = montar_email(lead)
            destinatarios = [lead["email"], AUDIT_BCC]
            server.sendmail(SMTP_USER, destinatarios, msg.as_string())
            server.quit()

            print(f"[{i}/{len(leads)}] [OK] {lead['empresa']} ({lead['cidade']}) -> {lead['email']}")
            enviados += 1
        except Exception as e:
            print(f"[{i}/{len(leads)}] [FAIL] {lead['empresa']} ({lead['email']}): {e}")
            falhas += 1

        if i < len(leads):
            time.sleep(delay_segundos)

    print(f"\n[+] Disparo finalizado: {enviados} enviados com sucesso, {falhas} falhas.")

LOTE_1_SP = [
    {"empresa": "Rede Provectum", "cidade": "Campinas e Região", "contato_nome": "Diretor(a)", "email": "contato@provectum.com.br"},
    {"empresa": "Matriz Imóveis", "cidade": "Ribeirão Preto", "contato_nome": "Diretor(a)", "email": "matrizimoveis@matrizimoveis.com.br"},
    {"empresa": "Piramid Imóveis", "cidade": "Ribeirão Preto", "contato_nome": "Diretor(a)", "email": "piramid@piramid.com.br"},
    {"empresa": "Nova Freitas Imóveis", "cidade": "São José dos Campos", "contato_nome": "Diretor(a)", "email": "anchieta@novafreitas.com.br"},
    {"empresa": "Riccio Imóveis", "cidade": "São José dos Campos", "contato_nome": "Rodrigo Riccio", "email": "atendimento@riccioimoveis.com.br"},
    {"empresa": "Mendes Ortega", "cidade": "Sorocaba", "contato_nome": "Diretor(a)", "email": "contato@mendesortega.com.br"},
    {"empresa": "Julio & Julio Imóveis", "cidade": "Sorocaba", "contato_nome": "Diretor(a)", "email": "atendimento@julioejulio.com.br"},
    {"empresa": "R3 Imóveis", "cidade": "Santos", "contato_nome": "Diretor(a)", "email": "contato@r3imoveis.com.br"},
    {"empresa": "Vianna Imóveis", "cidade": "Jundiaí", "contato_nome": "Diretor(a)", "email": "contato@viannaimoveis.com.br"},
    {"empresa": "Junqueira Imóveis", "cidade": "Piracicaba", "contato_nome": "Diretor(a)", "email": "contato@junqueiraimoveis.com.br"},
]

LOTE_2_SP = [
    {"empresa": "Cardinali Imóveis", "cidade": "São Carlos", "contato_nome": "Diretor(a)", "email": "contato@cardinali.com.br"},
    {"empresa": "Roca Imóveis", "cidade": "São Carlos", "contato_nome": "Diretor(a)", "email": "locacao@imobiliariaroca.com.br"},
    {"empresa": "Borsari Imóveis", "cidade": "Araraquara", "contato_nome": "Diretor(a)", "email": "borsari@borsariimoveis.com.br"},
    {"empresa": "Seven Imóveis", "cidade": "Bauru", "contato_nome": "Diretor(a)", "email": "contato@sevenimoveis.com.br"},
    {"empresa": "Imobiliária Parra", "cidade": "Franca", "contato_nome": "Diretor(a)", "email": "parra@parraimoveis.com.br"},
    {"empresa": "Concreto Imóveis", "cidade": "Bauru", "contato_nome": "Diretor(a)", "email": "contato@concretoimoveis.com.br"},
    {"empresa": "Palacete Imóveis", "cidade": "Taubaté", "contato_nome": "Diretor(a)", "email": "contato@palaceteimoveis.com.br"},
    {"empresa": "Jeremias Rodrigues", "cidade": "Taubaté", "contato_nome": "Diretor(a)", "email": "contato@jeremiasrodrigues.com.br"},
    {"empresa": "Roque Imóveis", "cidade": "Limeira", "contato_nome": "Diretor(a)", "email": "contato@roqueimoveis.com.br"},
    {"empresa": "Silveira Imóveis", "cidade": "Indaiatuba", "contato_nome": "Diretor(a)", "email": "contato@silveiraimoveis.com.br"},
]

if __name__ == "__main__":
    disparar_lote(LOTE_2_SP, delay_segundos=7)
