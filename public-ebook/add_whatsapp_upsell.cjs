const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const whatsappNumber = '5511945727148';
const whatsappMessage = encodeURIComponent('Olá! Estava lendo sobre o Manual Prático de Usucapião Extrajudicial e prefiro ter a assessoria jurídica completa da Dra. Líbia Florio. Gostaria de mais informações sobre honorários e como funciona a regularização.');
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const upsellSection = `
            <!-- UPSSELL HIGH TICKET WHATSAPP -->
            <div class="mt-20 pt-12 border-t border-slate-800/60 max-w-2xl mx-auto">
                <div class="bg-[#0b1120] border border-slate-700/50 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600"></div>
                    <div class="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <h3 class="text-xl font-serif font-bold text-white mb-3">Prefere não ter dor de cabeça com a burocracia cartorária?</h3>
                    <p class="text-slate-400 text-sm font-book leading-relaxed mb-6">
                        Se você percebeu que a regularização do seu imóvel é complexa e envolve riscos patrimoniais, deixe que nossa equipe resolva isso por você. 
                    </p>
                    <a href="${whatsappUrl}" target="_blank" class="inline-block w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg">
                        FALAR COM A EQUIPE NO WHATSAPP
                    </a>
                    <p class="text-[10px] text-slate-500 mt-4 uppercase tracking-widest">Assessoria Jurídica Especializada</p>
                </div>
            </div>
`;

html = html.replace(/<p class="text-xs">Risco zero.*?<\/p>\s*<\/div>\s*<\/div>/, '$&\n' + upsellSection);
fs.writeFileSync('index.html', html);
console.log('Upsell section added');
