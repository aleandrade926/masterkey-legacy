const fs = require('fs');
let html = fs.readFileSync('public-ebook/index.html', 'utf8');

// Notice: In the current HTML, the character is  (replacement character) due to encoding issues with MÓDULO TÉCNICO. 
// We will use a more generic regex to catch it.
html = html.replace(/<div class="mt-16 mb-10 p-10 bg-gradient-to-br[^>]*>.*?<div class="absolute[^>]*>[^<]*<\/div>\s*<span class="[^"]*">M.*?DULO T.*?CNICO<\/span>\s*<h2 class="[^"]*">\s*(.*?)\s*<\/h2>\s*<\/div>/gs, (match, title) => {
    let chapNumMatch = title.match(/PASSO No\.?\s*(\d+):?\s*(.*)/i);
    if (!chapNumMatch) chapNumMatch = title.match(/^(\d+)\.\s*(.*)/);
    
    let badgeText = 'CAPÍTULO';
    let cleanTitle = title;
    
    if (chapNumMatch) {
        badgeText = 'CAPÍTULO ' + chapNumMatch[1];
        cleanTitle = chapNumMatch[2] || chapNumMatch[0];
    }
    
    return `
    <h2 class="text-2xl md:text-3xl font-black text-white font-serif leading-tight mt-20 mb-8 border-b border-slate-800 pb-4">
        <span class="bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold mr-3 uppercase tracking-widest align-middle">${badgeText}</span>
        ${cleanTitle}
    </h2>`;
});

fs.writeFileSync('public-ebook/index.html', html);
console.log("Formatting applied!");
