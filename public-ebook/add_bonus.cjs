const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Bonus under the Hero CTA
const heroBonus = `
            <div class="mt-8 flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/30 px-5 py-3 rounded-xl max-w-lg mx-auto text-left shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                <span class="text-2xl animate-bounce">🎁</span>
                <p class="text-sm text-red-200 font-medium leading-tight">
                    <strong class="text-red-400 uppercase tracking-wide">Bônus de Ação Rápida:</strong> Os 10 primeiros compradores desta semana ganham uma <span class="text-white font-bold">Consulta Gratuita</span> com a Dra. Líbia!
                </p>
            </div>
`;
html = html.replace(/(SIM, QUERO O MANUAL POR APENAS R\$ 47\s*<\/a>)/, '$1\n' + heroBonus);

// 2. Add an explicit Bonus Section before Final CTA
const bonusSection = `
    <!-- SCARCITY BONUS -->
    <section class="py-16 bg-gradient-to-br from-red-900/20 to-slate-950 border-y border-red-900/30 relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <div class="inline-block bg-red-600 text-white text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 animate-pulse">
                ATENÇÃO: VAGAS LIMITADAS
            </div>
            <h2 class="text-3xl md:text-4xl font-serif font-black text-white mb-6">Bônus Especial: Consulta Gratuita</h2>
            <p class="text-slate-300 text-lg md:text-xl font-book max-w-2xl mx-auto leading-relaxed mb-8">
                Para premiar os mais decididos, os <strong class="text-amber-400">10 primeiros</strong> que garantirem o Manual nesta semana receberão como bônus uma <strong>Consulta de Avaliação Gratuita</strong> diretamente com a Dra. Líbia Florio para tirar dúvidas sobre o seu caso específico.
            </p>
            <div class="flex justify-center">
                <div class="w-full max-w-sm bg-slate-900 border border-red-500/30 rounded-2xl p-6 shadow-xl">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm text-slate-400 font-bold uppercase tracking-widest">Disponibilidade:</span>
                        <span class="text-red-500 font-bold animate-pulse">Quase Esgotado</span>
                    </div>
                    <div class="w-full bg-slate-800 rounded-full h-2.5 mt-4">
                        <div class="bg-gradient-to-r from-red-600 to-amber-500 h-2.5 rounded-full" style="width: 85%"></div>
                    </div>
                    <p class="text-xs text-slate-500 mt-3">Apenas algumas vagas restantes para esta semana.</p>
                </div>
            </div>
        </div>
    </section>
`;

html = html.replace(/<!-- FINAL CTA & GUARANTEE -->/, bonusSection + '\n\n    <!-- FINAL CTA & GUARANTEE -->');
fs.writeFileSync('index.html', html);
console.log('Scarcity bonus added');
