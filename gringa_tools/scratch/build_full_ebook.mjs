import fs from 'fs';
import path from 'path';

const extractedText = fs.readFileSync('c:/Users/Alexandre/masterkey-frontend/conteudo_ebook_extraido.txt', 'utf8');

// Parse slides
const rawSlides = extractedText.split(/### SLIDE slide(\d+)\.xml/).filter(Boolean);
const slides = [];

for (let i = 0; i < rawSlides.length; i += 2) {
    const slideNum = parseInt(rawSlides[i]);
    const content = rawSlides[i + 1]?.trim();
    if (content) {
        slides.push({ num: slideNum, content });
    }
}

// Sort by slide number
slides.sort((a, b) => a.num - b.num);

console.log(`Total de slides carregados: ${slides.length}`);

// Helper to format slide content nicely into HTML
function formatSlide(slide) {
    let text = slide.content;
    let type = 'content';

    // Detect titles / headers
    if (text.startsWith('PASSO No.') || text.startsWith('PASSO Nº')) {
        return `
        <div class="my-10 p-6 md:p-8 bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border-l-4 border-amber-500 rounded-2xl shadow-xl">
            <span class="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase block mb-1">ETAPA TÉCNICA ESTRUTURAL</span>
            <h2 class="text-xl md:text-2xl font-black text-white font-serif">${escapeHtml(text)}</h2>
        </div>
        `;
    }

    if (text.includes('Provimento') && (text.includes('CNJ') || text.includes('Art.'))) {
        return `
        <div class="my-6 p-6 bg-slate-950/90 border border-amber-500/30 rounded-2xl relative shadow-lg font-sans">
            <div class="flex items-center gap-2 mb-2">
                <span class="text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">⚖️ FUNDAMENTAÇÃO LEGAL / PROVIMENTO CNJ</span>
                <span class="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">Slide ${slide.num}</span>
            </div>
            <div class="text-amber-200/90 text-sm leading-relaxed italic border-l-2 border-amber-500/50 pl-4 py-1">
                ${escapeHtml(text)}
            </div>
        </div>
        `;
    }

    // Default card formatting
    return `
    <div class="my-6 p-6 md:p-8 bg-slate-950/70 border border-slate-800/80 rounded-2xl shadow-md transition-all hover:border-slate-700 font-book">
        <div class="flex justify-between items-center mb-3 pb-2 border-b border-slate-800/60 font-sans text-xs">
            <span class="text-amber-400 font-bold tracking-wide">MÓDULO TÉCNICO</span>
            <span class="text-slate-500 font-mono text-[10px]">Página ${slide.num} / ${slides.length}</span>
        </div>
        <div class="text-slate-200 text-sm md:text-base leading-relaxed whitespace-pre-line">
            ${escapeHtml(text)}
        </div>
    </div>
    `;
}

function escapeHtml(string) {
    return string
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const slidesHtml = slides.map(formatSlide).join('\n');

const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manual Completo de Usucapião Extrajudicial - Dra. Lídia Florio (Todos os 143 Slides)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Cinzel', serif; }
        .font-book { font-family: 'Lora', Georgia, serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @media print {
            .no-print { display: none !important; }
            body { background: white !important; color: black !important; padding: 0 !important; }
        }
    </style>
</head>
<body class="bg-slate-950 text-slate-200 min-h-screen">

    <!-- PASSWORD GATE (MODAL VIP) -->
    <div id="passwordGate" class="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
        <div class="max-w-md w-full bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
            <div class="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-3xl mb-5">
                ⚖️
            </div>

            <span class="text-[10px] font-bold tracking-widest text-amber-400 uppercase block mb-1">ANDRADE & FLORIO SOCIEDADE DE ADVOGADOS</span>
            <h2 class="text-2xl font-black text-white font-serif mb-2">ÁREA EXCLUSIVA DO LEITOR</h2>
            <p class="text-xs text-slate-400 leading-relaxed mb-6">
                Digite sua senha para desbloquear o manual completo com todos os <strong>143 slides e modelos de cartório</strong>.
            </p>

            <form onsubmit="handleUnlock(event)" class="space-y-4">
                <div>
                    <input type="password" id="passwordInput" placeholder="Digite sua senha de acesso..." required
                        class="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 focus:border-amber-500 focus:outline-none rounded-xl text-sm text-center text-white placeholder:text-slate-600 font-mono">
                    <p id="errorMsg" class="text-rose-400 text-xs mt-2 hidden">Senha incorreta. Verifique o código recebido.</p>
                </div>

                <button type="submit" class="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer">
                    DESBLOQUEAR MANUAL COMPLETO (143 SLIDES) ➔
                </button>
            </form>

            <div class="border-t border-slate-800 mt-6 pt-5">
                <span class="text-[11px] text-slate-500 block mb-2">Ainda não possui o acesso oficial?</span>
                <a href="#" class="text-xs text-amber-400 hover:underline font-bold">
                    Adquirir Acesso na Kiwify / Hotmart
                </a>
            </div>
        </div>
    </div>

    <!-- MAIN PROTECTED BOOK CONTENT -->
    <div id="bookContent" class="py-10 px-4 md:px-8 max-w-4xl mx-auto hidden">

        <!-- FLOATING BAR -->
        <div class="fixed bottom-6 right-6 z-40 flex items-center gap-3 no-print">
            <button onclick="window.print()" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-2 transition-all cursor-pointer">
                <span>🖨️ Imprimir / Salvar Todos os 143 Slides em PDF</span>
            </button>
            <button onclick="lockAgain()" class="bg-slate-800 hover:bg-slate-700 text-slate-400 p-3.5 rounded-xl border border-slate-700 text-xs" title="Sair / Bloquear">
                🔒
            </button>
        </div>

        <!-- LIVRO CONTAINER -->
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-14 shadow-2xl">

            <!-- COVER -->
            <div class="border-b-2 border-amber-500/30 pb-12 mb-12 text-center">
                <div class="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 font-mono">
                    CURSO & MANUAL TÉCNICO INTEGRAL • 143 SLIDES CONSOLIDADOS
                </div>
                <span class="font-serif text-sm tracking-widest text-slate-400 block mb-3">ANDRADE & FLORIO SOCIEDADE DE ADVOGADOS</span>
                <h1 class="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4 font-serif">
                    TRANSFORMANDO POSSE EM PROPRIEDADE PELA USUCAPIÃO EXTRAJUDICIAL
                </h1>
                <p class="text-amber-400 text-base md:text-lg font-semibold max-w-2xl mx-auto mb-6 font-serif">
                    O Novo Jeito Mais Rápido e Rentável de Regularizar Imóveis em Cartório Sem Processo Judicial
                </p>
                <div class="flex items-center justify-center gap-4 text-xs text-slate-400">
                    <span><strong>Autoria:</strong> Dra. Lídia Florio</span>
                    <span>•</span>
                    <span>Mestre pela USP</span>
                    <span>•</span>
                    <span>40 Anos de Prática Jurídica</span>
                </div>
            </div>

            <!-- STATS BAR -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center mb-10 font-sans text-xs">
                <div>
                    <span class="text-slate-500 block text-[10px] uppercase">Total de Slides</span>
                    <span class="text-base font-bold text-white font-mono">${slides.length} Slides</span>
                </div>
                <div>
                    <span class="text-slate-500 block text-[10px] uppercase">Base Legal</span>
                    <span class="text-base font-bold text-amber-400 font-mono">Prov. 149/23 CNJ</span>
                </div>
                <div>
                    <span class="text-slate-500 block text-[10px] uppercase">Legislação</span>
                    <span class="text-base font-bold text-emerald-400 font-mono">Art. 216-A LRP</span>
                </div>
                <div>
                    <span class="text-slate-500 block text-[10px] uppercase">Modelos de Peças</span>
                    <span class="text-base font-bold text-cyan-400 font-mono">Completos</span>
                </div>
            </div>

            <!-- LIVRO COMPLETO (TODOS OS SLIDES) -->
            <div class="space-y-4">
                ${slidesHtml}
            </div>

            <!-- BACK COVER -->
            <div class="border-t-2 border-slate-800 mt-16 pt-12 text-center text-xs text-slate-500 font-sans">
                <p class="font-bold text-slate-400 mb-1">ANDRADE & FLORIO SOCIEDADE DE ADVOGADOS</p>
                <p>Direito Imobiliário • Regularização de Imóveis • Estruturação Patrimonial Familiar</p>
                <p class="mt-4 text-[11px] text-slate-600">Material exclusivo protegido por direitos autorais. Todos os 143 slides formatados para leitura e impressão oficial.</p>
            </div>

        </div>

    </div>

    <!-- SCRIPT DO PASSWORD GATE (MVP LOCALSTORAGE) -->
    <script>
        const VALID_PASSWORDS = ['LF2026', 'USUCAPIAO2026', 'ANDRADE2026'];

        function checkAuth() {
            const token = localStorage.getItem('ebook_member_auth');
            if (token === 'granted') {
                document.getElementById('passwordGate').classList.add('hidden');
                document.getElementById('bookContent').classList.remove('hidden');
            }
        }

        function handleUnlock(e) {
            e.preventDefault();
            const input = document.getElementById('passwordInput').value.trim().toUpperCase();
            const errorEl = document.getElementById('errorMsg');

            if (VALID_PASSWORDS.includes(input)) {
                localStorage.setItem('ebook_member_auth', 'granted');
                document.getElementById('passwordGate').classList.add('hidden');
                document.getElementById('bookContent').classList.remove('hidden');
                errorEl.classList.add('hidden');
            } else {
                errorEl.classList.remove('hidden');
            }
        }

        function lockAgain() {
            localStorage.removeItem('ebook_member_auth');
            document.getElementById('passwordGate').classList.remove('hidden');
            document.getElementById('bookContent').classList.add('hidden');
        }

        // Run on load
        checkAuth();
    </script>

</body>
</html>
`;

fs.writeFileSync('c:/Users/Alexandre/masterkey-frontend/public-ebook/index.html', fullHtml, 'utf8');
console.log('✅ HTML compilado com sucesso com TODOS os slides!');
