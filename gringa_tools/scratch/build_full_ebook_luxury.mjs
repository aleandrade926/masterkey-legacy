import fs from 'fs';
import path from 'path';

const extractedText = fs.readFileSync('c:/Users/Alexandre/masterkey-frontend/conteudo_ebook_extraido_corrigido.txt', 'utf8');

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

// Group slides into Chapters
const chapters = [];
let currentChapter = { id: 'intro', title: 'Introdução e Capa', slides: [] };
chapters.push(currentChapter);

let chapterCounter = 1;

for (const slide of slides) {
    const text = slide.content;
    const isPasso = text.match(/PASSO N[oOº]?\.?\s*(\d+)/i) || text.match(/^(\d+)\.\s+[A-ZÀ-Ú]/);
    
    // If it's a new chapter header
    if (isPasso && text.length < 200) {
        currentChapter = { 
            id: `passo-${chapterCounter}`, 
            title: text.split('\n')[0].trim().substring(0, 60) + (text.length > 60 ? '...' : ''), 
            slides: [slide] 
        };
        chapters.push(currentChapter);
        chapterCounter++;
    } else {
        currentChapter.slides.push(slide);
    }
}

console.log(`Total de slides carregados: ${slides.length}`);
console.log(`Capítulos identificados: ${chapters.length}`);

// Formatting Helper
function formatSlide(slide) {
    let text = slide.content;
    
    // Clean up excessive newlines
    text = text.replace(/\n{3,}/g, '\n\n');

    // Detect Chapter Headers (Passo X)
    if (text.match(/PASSO N[oOº]?\.?\s*(\d+)/i) || text.match(/^(\d+)\.\s+[A-ZÀ-Ú]/)) {
        return `
        <div class="mt-16 mb-10 p-10 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border-t-2 border-l-2 border-amber-500/40 rounded-3xl shadow-2xl relative overflow-hidden chapter-break">
            <div class="absolute -right-10 -top-10 opacity-5 text-9xl font-serif text-amber-500">§</div>
            <span class="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase block mb-3">MÓDULO TÉCNICO</span>
            <h2 class="text-2xl md:text-4xl font-black text-white font-serif leading-tight">${escapeHtml(text)}</h2>
        </div>
        `;
    }

    // Detect Legal Quotes (Provimento, Artigo, Lei)
    if ((text.includes('Provimento') || text.includes('Art.') || text.includes('Lei')) && (text.includes('CNJ') || text.includes('CPC') || text.includes('LRP') || text.includes('CC'))) {
        return `
        <div class="my-8 p-8 bg-slate-900 border-l-4 border-amber-500 rounded-r-2xl shadow-xl relative font-sans">
            <div class="absolute -left-3 top-6 bg-slate-950 p-1 rounded-full border border-amber-500">
                <span class="text-amber-500 text-sm">⚖️</span>
            </div>
            <div class="flex items-center justify-between mb-4 pl-4 border-b border-slate-800/60 pb-3">
                <span class="text-amber-400 font-bold text-[11px] uppercase tracking-widest font-mono">Fundamentação Legal</span>
                <span class="text-[10px] text-slate-500 font-mono">Slide ${slide.num}</span>
            </div>
            <div class="text-slate-300 text-sm md:text-base leading-relaxed font-book italic pl-4">
                ${formatParagraphs(escapeHtml(text))}
            </div>
        </div>
        `;
    }

    // Detect Title-only slides (Subheadings)
    if (text.length < 150 && text === text.toUpperCase()) {
        return `
        <h3 class="text-lg md:text-xl font-bold text-amber-400 font-sans mt-12 mb-6 border-b border-slate-800/60 pb-2">
            ${escapeHtml(text)}
        </h3>
        `;
    }

    // Detect Lists / Bullet points (lines starting with -, *, or numbers)
    const lines = text.split('\n');
    const isList = lines.filter(l => l.trim().match(/^[-*•\d]/)).length > 2;
    
    if (isList) {
        const formattedList = lines.map(l => {
            const trimmed = l.trim();
            if (trimmed.match(/^[-*•\d]/)) {
                return `<li class="flex items-start gap-3 mb-3"><span class="text-amber-500 mt-1 text-xs">◆</span> <span>${escapeHtml(trimmed.replace(/^[-*•\d]+\.?\s*/, ''))}</span></li>`;
            }
            return `<p class="mb-2 text-slate-400 text-sm italic">${escapeHtml(trimmed)}</p>`;
        }).join('');
        
        return `
        <div class="my-6 p-8 bg-slate-950/50 border border-slate-800/80 rounded-2xl shadow-sm hover:border-amber-500/20 transition-all font-sans text-slate-300 relative group">
            <span class="absolute top-4 right-4 text-[9px] text-slate-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity">Slide ${slide.num}</span>
            <ul class="space-y-1">
                ${formattedList}
            </ul>
        </div>
        `;
    }

    // Default Paragraphs (Quiet Luxury Cards)
    return `
    <div class="my-6 font-book text-slate-300 text-[15px] md:text-[17px] leading-relaxed relative group">
        <span class="absolute -left-12 top-1 text-[9px] text-slate-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">#${slide.num}</span>
        ${formatParagraphs(escapeHtml(text))}
    </div>
    `;
}

function formatParagraphs(text) {
    return text.split('\n\n').filter(p => p.trim()).map(p => `<p class="mb-4 text-justify">${p.trim()}</p>`).join('');
}

function escapeHtml(string) {
    return string
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Build Sidebar Navigation
const navHtml = chapters.map(chap => `
    <a href="#${chap.id}" class="block py-2.5 px-4 text-xs font-sans text-slate-400 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg transition-colors border-l-2 border-transparent hover:border-amber-500 truncate">
        ${escapeHtml(chap.title)}
    </a>
`).join('');

// Build Content
const contentHtml = chapters.map(chap => `
    <section id="${chap.id}" class="scroll-mt-10 mb-16">
        ${chap.slides.map(formatSlide).join('\n')}
    </section>
`).join('');


const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manual Completo de Usucapião Extrajudicial - Andrade & Florio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #020617; /* slate-950 */
            --surface-color: #0f172a; /* slate-900 */
        }
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--bg-color);
            color: #cbd5e1;
        }
        .font-serif { font-family: 'Cinzel', serif; }
        .font-book { font-family: 'Lora', Georgia, serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        /* Custom Scrollbar for Quiet Luxury */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-color); }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #d97706; }

        @media print {
            .no-print { display: none !important; }
            body { background: white !important; color: black !important; padding: 0 !important; }
            .chapter-break { page-break-before: always; }
            .print-padding { padding: 0 !important; }
            * { text-shadow: none !important; box-shadow: none !important; }
        }
    </style>
</head>
<body class="antialiased selection:bg-amber-500/30 selection:text-amber-200">

    <!-- PASSWORD GATE (MODAL VIP) -->
    <div id="passwordGate" class="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
        <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl text-center relative overflow-hidden">
            <!-- Luxury glow effect -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-amber-500/10 blur-3xl rounded-full pointer-events-none"></div>
            
            <div class="w-14 h-14 rounded-full bg-slate-950 border border-amber-500/30 mx-auto flex items-center justify-center text-xl mb-6 shadow-inner">
                🏛️
            </div>

            <span class="text-[9px] font-bold tracking-widest text-amber-500 uppercase block mb-2 font-mono">ACESSO RESTRITO</span>
            <h2 class="text-2xl font-black text-white font-serif mb-3">Andrade & Florio</h2>
            <p class="text-xs text-slate-400 leading-relaxed mb-8 font-sans">
                Insira a chave de acesso enviada para o seu e-mail após a confirmação da compra.
            </p>

            <form onsubmit="handleUnlock(event)" class="space-y-4">
                <div>
                    <input type="password" id="passwordInput" placeholder="Sua senha..." required
                        class="w-full px-5 py-4 bg-slate-950 border border-slate-800 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 focus:outline-none rounded-xl text-sm text-center text-white placeholder:text-slate-600 font-mono tracking-widest transition-all">
                    <p id="errorMsg" class="text-rose-400 text-xs mt-3 hidden bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">Chave de acesso inválida.</p>
                </div>

                <button type="submit" class="w-full bg-white hover:bg-slate-200 text-slate-950 font-black py-4 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer mt-2 font-sans tracking-wide">
                    ACESSAR MANUAL COMPLETO
                </button>
            </form>

            <div class="mt-8 pt-6 border-t border-slate-800/50">
                <a href="#" class="text-[10px] text-slate-500 hover:text-amber-400 transition-colors uppercase tracking-widest font-bold">
                    Adquirir Licença de Acesso
                </a>
            </div>
        </div>
    </div>

    <!-- MAIN PROTECTED BOOK CONTENT -->
    <div id="bookContent" class="hidden min-h-screen flex flex-col md:flex-row">

        <!-- SIDEBAR NAVIGATION (LEFT) -->
        <aside class="w-full md:w-72 md:fixed md:inset-y-0 left-0 bg-slate-950 border-r border-slate-800/60 overflow-y-auto no-print z-30">
            <div class="p-6">
                <div class="flex items-center gap-3 mb-8">
                    <div class="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-sm">🏛️</div>
                    <div>
                        <h1 class="text-sm font-black text-white font-serif leading-tight">Andrade & Florio</h1>
                        <span class="text-[9px] text-amber-500 tracking-widest uppercase font-mono">Manual Oficial</span>
                    </div>
                </div>
                
                <div class="mb-4">
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-4 mb-2 block">Índice do Curso</span>
                    <nav class="space-y-1">
                        ${navHtml}
                    </nav>
                </div>
            </div>
            
            <div class="p-6 border-t border-slate-800/60 bg-slate-900/30 mt-auto">
                <button onclick="window.print()" class="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 font-bold py-2.5 rounded-lg text-xs transition-all flex items-center justify-center gap-2 mb-3">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                    Salvar em PDF
                </button>
                <button onclick="lockAgain()" class="w-full text-slate-500 hover:text-white py-2 text-[10px] tracking-widest uppercase font-bold transition-colors">
                    Sair / Bloquear
                </button>
            </div>
        </aside>

        <!-- MAIN CONTENT AREA (RIGHT) -->
        <main class="flex-1 md:ml-72 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-opacity-5">
            <div class="max-w-3xl mx-auto py-12 px-6 md:px-12 print-padding">
                
                <!-- COVER PAGE -->
                <div class="mb-20 text-center chapter-break pt-10">
                    <span class="font-serif text-sm tracking-widest text-amber-500 block mb-6 uppercase">Edição Definitiva 2026</span>
                    <h1 class="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-8 font-serif">
                        Transformando Posse em Propriedade pela Usucapião Extrajudicial
                    </h1>
                    <div class="w-16 h-1 bg-amber-500 mx-auto mb-8 rounded-full"></div>
                    <p class="text-slate-400 text-lg md:text-xl font-book italic max-w-2xl mx-auto mb-10 leading-relaxed">
                        O método completo, seguro e rentável para regularizar imóveis diretamente no cartório, fundamentado no Provimento 149/2023 do CNJ.
                    </p>
                    
                    <div class="inline-flex items-center gap-4 bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl shadow-xl">
                        <div class="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-xl border border-slate-700">👩‍⚖️</div>
                        <div class="text-left">
                            <p class="text-sm font-bold text-white font-sans">Dra. Lídia Florio</p>
                            <p class="text-xs text-amber-400 font-mono">Mestre pela USP • 40 Anos de Prática</p>
                        </div>
                    </div>
                </div>

                <div class="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-16"></div>

                <!-- ALL CHAPTERS AND SLIDES -->
                <article class="prose prose-invert prose-slate max-w-none">
                    ${contentHtml}
                </article>

            </div>
        </main>
    </div>

    <!-- SCRIPT DO PASSWORD GATE (MVP LOCALSTORAGE) -->
    <script>
        const VALID_PASSWORDS = ['LF2026', 'USUCAPIAO2026', 'ANDRADE2026'];

        function checkAuth() {
            const token = localStorage.getItem('ebook_member_auth');
            if (token === 'granted') {
                document.getElementById('passwordGate').classList.add('hidden');
                document.getElementById('bookContent').classList.remove('hidden');
                document.getElementById('bookContent').classList.add('flex');
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
                document.getElementById('bookContent').classList.add('flex');
                errorEl.classList.add('hidden');
            } else {
                errorEl.classList.remove('hidden');
            }
        }

        function lockAgain() {
            localStorage.removeItem('ebook_member_auth');
            document.getElementById('passwordGate').classList.remove('hidden');
            document.getElementById('bookContent').classList.remove('flex');
            document.getElementById('bookContent').classList.add('hidden');
            document.getElementById('passwordInput').value = '';
        }

        // Run on load
        checkAuth();
    </script>

</body>
</html>
`;

fs.writeFileSync('c:/Users/Alexandre/masterkey-frontend/public-ebook/index.html', fullHtml, 'utf8');
console.log('✅ HTML "Quiet Luxury" compilado com sucesso com 150 slides e navegação lateral!');
