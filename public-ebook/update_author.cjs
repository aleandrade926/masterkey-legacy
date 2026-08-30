const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newAuthorSection = `
    <!-- AUTHOR SECTION -->
    <section class="py-24 bg-[#0b1120] relative">
        <div class="max-w-4xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
            <div class="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full bg-slate-900 border-4 border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] flex items-center justify-center overflow-hidden relative">
                <img src="https://www.andradeflorio.com.br/dra-libia.png" alt="Dra. Líbia Florio" class="w-full h-full object-cover object-top">
            </div>
            
            <div class="text-center md:text-left">
                <span class="text-amber-500 text-xs font-bold tracking-widest uppercase mb-2 block">A Autora</span>
                <h2 class="text-3xl font-serif font-black text-white mb-4">Dra. Líbia Florio</h2>
                <p class="text-slate-400 leading-relaxed font-book mb-6">
                    Mestre pela Universidade de São Paulo (USP) e Especialista em Direito Registral Imobiliário, com mais de 40 anos de atuação prática na área. Condensou décadas de experiência nos cartórios em um método blindado, para que você pare de perder oportunidades valiosas na regularização de imóveis.
                </p>
                <div class="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <img src="https://www.andradeflorio.com.br/diploma-usp.jpg" alt="Diploma de Mestrado USP" class="w-24 md:w-32 rounded border border-slate-700 shadow-md">
                    <div class="text-left">
                        <h4 class="text-white font-bold text-sm mb-1">Chancela de Excelência USP</h4>
                        <p class="text-xs text-slate-400 font-book">Mestre em Direito pela Universidade de São Paulo. Conhecimento acadêmico e prático para entregar a você o caminho mais seguro e incontestável.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

html = html.replace(/<!-- AUTHOR SECTION -->[\s\S]*?<!-- FINAL CTA & GUARANTEE -->/, newAuthorSection + '\n\n    <!-- FINAL CTA & GUARANTEE -->');
fs.writeFileSync('index.html', html);
console.log('Author section updated successfully.');
