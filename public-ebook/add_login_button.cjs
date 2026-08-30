const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const loginButton = `
        <div class="absolute top-6 right-6 md:right-12 z-50">
            <a href="manual.html" class="text-xs md:text-sm font-bold text-amber-500 hover:text-amber-400 border border-amber-500/30 hover:border-amber-400 px-4 py-2 rounded-full transition-all bg-slate-900/50 backdrop-blur-sm">
                <span class="mr-1">🔒</span> JÁ É ALUNO? ACESSAR
            </a>
        </div>
`;

// Insert right after the opening <main ...> tag
html = html.replace(/(<main[^>]*>)/, '$1\n' + loginButton);

fs.writeFileSync('index.html', html);
console.log('Login button added');
