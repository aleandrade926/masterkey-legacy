import fs from 'fs';

const filePath = 'c:/Users/Alexandre/masterkey-frontend/conteudo_ebook_extraido.txt';
let text = fs.readFileSync(filePath, 'utf8');

const replacements = [
    // Tipografia / Caracteres soltos
    { regex: /a\s*usucapião/gi, replace: "a usucapião" },
    { regex: /à\s*usucapião/gi, replace: "à usucapião" },
    { regex: /o\s*usucapião/gi, replace: "a usucapião" }, // usucapião is feminine
    { regex: /ao\s*usucapião/gi, replace: "à usucapião" },
    { regex: /[\s]{2,}/g, replace: " " }, // Remover espaços duplos
    
    // Termos Técnicos
    { regex: /animus\s+domini/gi, replace: "<em>animus domini</em>" },
    { regex: /jus\s+possidendi/gi, replace: "<em>jus possidendi</em>" },
    { regex: /jus\s+possessionis/gi, replace: "<em>jus possessionis</em>" },
    { regex: /ad\s+usucapionem/gi, replace: "<em>ad usucapionem</em>" },
    { regex: /in\s+loco/gi, replace: "<em>in loco</em>" },
    
    // Correções Gramaticais / Ortográficas comuns detectadas em extração de PDF/PPT
    { regex: /usucapi[aá]o\s+extra\s*judicial/gi, replace: "usucapião extrajudicial" },
    { regex: /documento\s+comprobat[oó]rios/gi, replace: "documentos comprobatórios" },
    { regex: /certid[aã]o\s+negativas/gi, replace: "certidões negativas" },
    { regex: /bem\s+como\s+de\s+que/gi, replace: "bem como que" },
    { regex: /,\s*\./g, replace: "." }, // Remove comma before dot
    { regex: /\.\s*\./g, replace: "." }, // Remove double dots (except ellipsis)
    
    // Formatação de Leis
    { regex: /Provimento\s*(?:n[oOº]?\.?\s*)?149[\s\/]*de\s*2023\s*(?:do\s*)?CNJ/gi, replace: "Provimento nº 149/2023 do CNJ" },
    { regex: /Art\.\s*216[-\s]A/g, replace: "Art. 216-A" },
    { regex: /Artigo\s*/g, replace: "Art. " },
    
    // Removendo quebras de linha estranhas no meio das frases
    { regex: /([a-záéíóúãõâêîôûç])\s*\n\s*([a-záéíóúãõâêîôûç])/gi, replace: "$1 $2" }
];

let correctedText = text;

replacements.forEach(({ regex, replace }) => {
    correctedText = correctedText.replace(regex, replace);
});

// Resplit back to proper slide format
const originalLines = text.split('\n');
const newLines = [];
let buffer = "";
for(let line of originalLines) {
    if(line.startsWith("### SLIDE")) {
        if(buffer.trim()) {
            let processed = buffer;
            replacements.forEach(({ regex, replace }) => {
                processed = processed.replace(regex, replace);
            });
            newLines.push(processed.trim());
            buffer = "";
        }
        newLines.push("\n" + line);
    } else {
        buffer += " " + line;
    }
}
if(buffer.trim()) {
    let processed = buffer;
    replacements.forEach(({ regex, replace }) => {
        processed = processed.replace(regex, replace);
    });
    newLines.push(processed.trim());
}


fs.writeFileSync('c:/Users/Alexandre/masterkey-frontend/conteudo_ebook_extraido_corrigido.txt', newLines.join('\n'), 'utf8');
console.log('Correção gramatical, ortográfica e técnica aplicada no texto fonte.');
