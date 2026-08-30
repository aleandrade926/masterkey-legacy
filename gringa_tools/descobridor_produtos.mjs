import ytSearch from 'yt-search';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const searchQueries = [
  '"honest review" supplement',
  '"weight loss" review scam',
  '"blood sugar" review scam',
  '"tinnitus" review scam',
  '"dental" review scam',
  '"buygoods" review',
  '"digistore24" review'
];

console.log("\n🕵️  INICIANDO O ESPIÃO DE PRODUTOS OCULTOS (YOUTUBE MINING) 🕵️\n");
console.log("A lógica: Afiliados criam vídeos de 'Review' no YouTube para produtos que estão vendendo muito.");
console.log("Vamos varrer o YouTube em busca dos nomes de produtos que estão sendo promovidos AGORA.\n");

async function runSpy() {
  const productCounts = {};
  const recentProducts = [];

  for (const query of searchQueries) {
    console.log(`🔎 Minerando footprint: ${query}...`);
    try {
      const r = await ytSearch(query);
      const videos = r.videos.slice(0, 15); // Pega os 15 primeiros de cada busca

      videos.forEach(v => {
        // Tenta extrair o nome do produto antes da palavra "Review"
        const titleRegex = /(.*?)\s+review/i;
        const match = v.title.match(titleRegex);
        
        if (match && match[1]) {
          // Limpa o nome extraído
          let productName = match[1].trim()
                                  .replace(/[\[\]\(\)!?|]/g, '')
                                  .replace(/honest/i, '')
                                  .replace(/my/i, '')
                                  .replace(/updated/i, '')
                                  .replace(/2023|2024|2025/g, '')
                                  .trim();
          
          // Filtra nomes muito grandes ou vazios (falsos positivos)
          if (productName && productName.split(' ').length <= 3 && productName.length > 3) {
            productName = productName.toUpperCase();
            productCounts[productName] = (productCounts[productName] || 0) + 1;
            recentProducts.push({
              name: productName,
              title: v.title,
              views: v.views,
              ago: v.ago,
              author: v.author.name
            });
          }
        }
      });
    } catch (e) {
      console.log(`Erro ao buscar: ${query}`);
    }
  }

  // Ordena os produtos por frequência de aparição
  const sortedProducts = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])
    .filter(item => item[1] > 1); // Pelo menos 2 menções para evitar lixo

  console.log("\n==============================================");
  console.log("🔥 PRODUTOS MAIS PROMOVIDOS PELOS AFILIADOS AGORA 🔥");
  console.log("==============================================\n");

  if (sortedProducts.length === 0) {
    console.log("Não encontramos produtos fortes repetidos nesta varredura. Tente rodar novamente ou mudar os termos no código.");
  } else {
    sortedProducts.forEach((item, index) => {
      console.log(`${index + 1}. ${item[0]} (${item[1]} vídeos encontrados)`);
    });
    
    console.log("\n💡 PRÓXIMO PASSO: Pegue esses nomes e jogue no 'node garimpo_trends.mjs' para ver qual está com o gráfico subindo!");
  }

  console.log("\n==============================================");
  console.log("📺 VÍDEOS RECENTES ENCONTRADOS (Para você analisar a concorrência):");
  
  // Mostra alguns vídeos recentes para contexto
  recentProducts.slice(0, 10).forEach(p => {
    console.log(`- [${p.name}] ${p.title} (${p.views} views | ${p.ago})`);
  });
  console.log("==============================================\n");

  rl.close();
}

runSpy();
