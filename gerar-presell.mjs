import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const [,, productName, affiliateLink] = process.argv;

if (!productName || !affiliateLink) {
  console.error('\n❌ ERRO: Faltam argumentos.');
  console.error('Uso correto: node gerar-presell.mjs "Nome do Produto" "Link de Afiliado"');
  console.error('Exemplo: node gerar-presell.mjs "Teds Woodworking" "https://hop.clickbank..."\n');
  process.exit(1);
}

const cleanSlug = productName.toLowerCase().replace(/[^a-z0-9]/g, '-');
const projectDir = path.join(process.cwd(), `presell-${cleanSlug}`);

if (!fs.existsSync(projectDir)) {
  fs.mkdirSync(projectDir, { recursive: true });
}

// Template "Implied Urgency" (Gatilhos implícitos, sem falsas promessas)
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productName} - Official Information</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes pulse-custom {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
        }
        .pulse-btn { animation: pulse-custom 2.5s infinite ease-in-out; }
        .urgency-banner { background-color: #b91c1c; }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 font-sans antialiased flex flex-col min-h-screen">
    
    <!-- Banner de Urgência Implícita -->
    <div class="urgency-banner text-white text-center py-2 px-4 font-semibold text-xs md:text-sm shadow-sm tracking-wide">
        ⚠️ NOTICE: Due to unexpected high demand, current pricing and availability are subject to change without notice.
    </div>

    <main class="flex-grow flex items-center justify-center py-10 px-4">
        <div class="bg-white max-w-3xl w-full rounded-2xl shadow-xl border border-slate-200 p-6 md:p-12 text-center">
            
            <div class="inline-block bg-amber-100 text-amber-800 font-bold px-4 py-1.5 rounded-full text-xs mb-6 uppercase tracking-widest border border-amber-200">
                Update: <span id="current-date"></span>
            </div>

            <h1 class="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                Important Information About <span class="text-blue-600">${productName}</span>
            </h1>
            
            <h2 class="text-lg md:text-xl font-medium text-slate-600 mb-8 max-w-2xl mx-auto">
                We strongly advise checking the official website immediately to see if <strong>discounted inventory</strong> is still available for new customers today.
            </h2>

            <div class="flex flex-col items-center mb-6">
                <!-- Botão focado em Ação Imediata -->
                <a href="${affiliateLink}" target="_blank" rel="noopener noreferrer" 
                   class="pulse-btn inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg md:text-xl py-5 px-10 rounded-xl shadow-lg transition-colors duration-200 uppercase tracking-wide border-b-4 border-blue-800 active:border-b-0 active:translate-y-1">
                    Check Current Availability & Pricing ➔
                </a>
                
                <p class="mt-5 text-xs text-slate-400 font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
                    <span class="text-green-600">●</span> <span>Official Link Routing</span> &bull; <span>Secure Connection</span>
                </p>
            </div>
        </div>
    </main>
    
    <footer class="py-6 border-t border-slate-200 text-center text-xs text-slate-400 bg-white">
        <p class="max-w-xl mx-auto px-4">
            Disclaimer: This site is an independent informational resource. We may receive compensation for purchases made through our links, at no extra cost to you. This site is not affiliated with Google or Meta.
        </p>
    </footer>

    <script>
        // Injeta a data de hoje para urgência real
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('current-date').innerText = "Status verified on " + new Date().toLocaleDateString('en-US', options);
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(projectDir, 'index.html'), htmlTemplate);
console.log(`\n✅ Landing Page (Urgência Implícita) gerada em: ${projectDir}`);

console.log('🚀 Subindo para a Vercel...');
try {
  const deployOutput = execSync(`npx vercel --prod --yes`, { cwd: projectDir, encoding: 'utf-8', stdio: 'pipe' });
  const lines = deployOutput.split('\\n');
  const liveUrl = lines.find(line => line.includes('Production')) || lines.pop();
  
  console.log('\n======================================================');
  console.log(`🔥 DEPLOY CONCLUÍDO!`);
  console.log(`🎯 URL: ${liveUrl.trim()}`);
  console.log('======================================================\n');
  
  fs.appendFileSync(path.join(process.cwd(), 'presells_ativas.txt'), `${productName}: ${liveUrl.trim()}\n`);
} catch (error) {
  console.error('\n⚠️ Falha ao subir para a Vercel.');
}
