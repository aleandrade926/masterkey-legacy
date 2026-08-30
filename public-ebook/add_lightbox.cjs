const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add cursor-pointer and onclick to the image
html = html.replace('<img src="https://www.andradeflorio.com.br/diploma-usp.jpg" alt="Diploma de Mestrado USP" class="w-24 md:w-32 rounded border border-slate-700 shadow-md">', '<img src="https://www.andradeflorio.com.br/diploma-usp.jpg" alt="Diploma de Mestrado USP" class="w-24 md:w-32 rounded border border-slate-700 shadow-md cursor-pointer hover:opacity-80 transition-opacity" onclick="openLightbox()">');

// Add lightbox HTML and JS before </body>
const lightboxCode = `
    <!-- Lightbox for Diploma -->
    <div id="lightbox" class="fixed inset-0 z-[100] bg-black/90 hidden flex items-center justify-center opacity-0 transition-opacity duration-300" onclick="closeLightbox()">
        <div class="relative max-w-4xl max-h-screen p-4">
            <button class="absolute -top-12 right-0 text-white hover:text-amber-500 text-4xl font-bold transition-colors" onclick="closeLightbox()">&times;</button>
            <img src="https://www.andradeflorio.com.br/diploma-usp.jpg" class="max-w-full max-h-[90vh] object-contain rounded border border-slate-700">
        </div>
    </div>
    
    <script>
        function openLightbox() {
            const lb = document.getElementById('lightbox');
            lb.classList.remove('hidden');
            setTimeout(() => lb.classList.remove('opacity-0'), 10);
        }
        function closeLightbox() {
            const lb = document.getElementById('lightbox');
            lb.classList.add('opacity-0');
            setTimeout(() => lb.classList.add('hidden'), 300);
        }
    </script>
`;

html = html.replace(/<\/body>/, lightboxCode + '\n</body>');
fs.writeFileSync('index.html', html);
console.log('Lightbox added');
