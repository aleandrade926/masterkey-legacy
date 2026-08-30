import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const negativeKeywords = [
  "free", "gratis", "login", "member", "members", "members area", "download", "pdf", 
  "scam", "complaints", "fake", "legit", "is it legit", "does it work", "review", "reviews",
  "ingredients", "side effects", "amazon", "ebay", "walmart", "coupon", "discount code"
];

function generateKeywords(productName) {
  const baseModifiers = ["buy", "order", "get", "official website", "where to buy", "purchase"];
  
  const exact = baseModifiers.map(mod => `[${mod} ${productName}]`);
  const exact2 = baseModifiers.map(mod => `[${productName} ${mod}]`);
  
  const phrase = baseModifiers.map(mod => `"${mod} ${productName}"`);
  const phrase2 = baseModifiers.map(mod => `"${productName} ${mod}"`);

  return {
    exact: [...exact, `[${productName}]`, ...exact2],
    phrase: [...phrase, `"${productName}"`, ...phrase2],
  };
}

rl.question('Qual o nome do produto gringo que você quer anunciar? (ex: Puravive, LivPure): ', (product) => {
  const name = product.trim().toLowerCase();
  
  console.log("\n==============================================");
  console.log(`🔥 ESTRUTURA DE CAMPANHA PARA: ${name.toUpperCase()} 🔥`);
  console.log("==============================================\n");

  const keywords = generateKeywords(name);

  console.log("✅ PALAVRAS-CHAVE EXATAS (Fundo de Funil MÁXIMO - Use para destravar a conta):");
  console.log(keywords.exact.join("\n"));
  console.log("\n----------------------------------------------");

  console.log("✅ PALAVRAS-CHAVE DE CORRESPONDÊNCIA DE FRASE (Use com cautela, após a conta aquecer):");
  console.log(keywords.phrase.join("\n"));
  console.log("\n----------------------------------------------");

  console.log("⛔ PALAVRAS-CHAVE NEGATIVAS (COPIE E COLE NA SUA CAMPANHA AGORA!):");
  console.log(negativeKeywords.join("\n"));
  console.log("\n----------------------------------------------");
  
  console.log("📝 IDEIA DE COPY PARA O ANÚNCIO (Presell -> VSL):");
  console.log(`Title 1: Buy ${product}™ Official`);
  console.log(`Title 2: Official Website (Save 80%)`);
  console.log(`Title 3: Order ${product} Today`);
  console.log(`Description 1: Get ${product} from the Official Website. 100% Natural Ingredients. Limited Time Offer!`);
  console.log(`Description 2: 180-Day Money Back Guarantee. Don't buy fakes, order from the Official Store now.`);
  
  console.log("\n==============================================");
  console.log("🚀 PRÓXIMO PASSO: Cole as palavras negativas na lista da campanha e crie 1 grupo de anúncios focado no nome exato!");

  rl.close();
});
