const fs = require('fs');
let html = fs.readFileSync('public-ebook/index.html', 'utf8');

const buttonHtml = `
    <!-- FLOATING PDF BUTTON -->
    <button onclick="window.print()" class="fixed bottom-8 right-8 z-50 bg-slate-900 border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-amber-400 p-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-all group no-print">
        <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
    </button>
`;

if (!html.includes('FLOATING PDF BUTTON')) {
    html = html.replace(/<script>/i, buttonHtml + '\n    <script>');
    fs.writeFileSync('public-ebook/index.html', html);
    console.log('Button added successfully.');
} else {
    console.log('Button already exists.');
}
