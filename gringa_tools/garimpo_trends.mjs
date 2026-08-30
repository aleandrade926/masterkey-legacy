import googleTrends from 'google-trends-api';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o nome do produto ou nicho para analisar no Google Trends US: ', async (keyword) => {
  console.log(`\n🔍 Buscando dados de tendências para: "${keyword}" nos Estados Unidos (Últimos 3 meses)...`);

  try {
    const data = await googleTrends.interestOverTime({
      keyword: keyword,
      geo: 'US', // Mercado gringo principal
      startTime: new Date(Date.now() - (90 * 24 * 60 * 60 * 1000)), // Últimos 90 dias
    });

    const parsedData = JSON.parse(data);
    const timelineData = parsedData.default.timelineData;

    if (!timelineData || timelineData.length === 0) {
      console.log("⚠️ Sem dados suficientes. Produto pode ser muito novo, irrelevante ou com baixo volume de buscas.");
      process.exit(0);
    }

    const firstHalf = timelineData.slice(0, Math.floor(timelineData.length / 2));
    const secondHalf = timelineData.slice(Math.floor(timelineData.length / 2));

    const avgFirstHalf = firstHalf.reduce((acc, curr) => acc + curr.value[0], 0) / firstHalf.length;
    const avgSecondHalf = secondHalf.reduce((acc, curr) => acc + curr.value[0], 0) / secondHalf.length;

    console.log(`\n📊 Média de interesse (1ª Metade dos últimos 3 meses): ${avgFirstHalf.toFixed(2)}`);
    console.log(`📊 Média de interesse (2ª Metade dos últimos 3 meses): ${avgSecondHalf.toFixed(2)}`);

    console.log("\n==============================================");
    if (avgSecondHalf > avgFirstHalf * 1.2) {
      console.log("🚀 VEREDITO: PRODUTO EM ALTA! Demanda subindo consideravelmente. Ótimo momento para anunciar!");
    } else if (avgSecondHalf < avgFirstHalf * 0.8) {
      console.log("📉 VEREDITO: PRODUTO EM QUEDA! O hype parece estar passando. Cuidado com o ROI.");
    } else {
      console.log("⚖️ VEREDITO: PRODUTO ESTÁVEL. A demanda se manteve regular. Pode ser testado com cautela.");
    }
    console.log("==============================================\n");

  } catch (err) {
    console.error("Erro ao buscar dados:", err);
  } finally {
    rl.close();
  }
});
