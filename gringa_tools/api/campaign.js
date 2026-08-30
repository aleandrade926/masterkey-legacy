export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const productName = (req.query.product || '').trim();
  const affiliateLink = (req.query.link || '').trim();
  
  if (!productName) return res.status(400).json({ error: 'Product name required' });

  const upperProduct = productName.toUpperCase();
  const lowerProduct = productName.toLowerCase();

  const negativeKeywords = [
    "free", "gratis", "login", "member", "members", "members area", "download", "pdf", 
    "scam", "complaints", "fake", "legit", "is it legit", "does it work", "review", "reviews",
    "ingredients", "side effects", "amazon", "ebay", "walmart", "coupon", "discount code"
  ];

  const baseModifiers = ["buy", "order", "get", "official website", "where to buy", "purchase"];
  const exact = baseModifiers.map(mod => `[${mod} ${lowerProduct}]`);
  const exact2 = baseModifiers.map(mod => `[${lowerProduct} ${mod}]`);
  const phrase = baseModifiers.map(mod => `"${mod} ${lowerProduct}"`);
  const phrase2 = baseModifiers.map(mod => `"${lowerProduct} ${mod}"`);

  const date = new Date();
  const dateStr = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;

  // Nomenclatura Sobral
  const campaignName = `[01] - GS - Fundo de Funil - ${upperProduct} - [${dateStr}]`;
  const adGroup1 = `[01] - Nome Exato [Fundo de Funil]`;
  const adGroup2 = `[02] - Frase e Modificadores`;

  res.status(200).json({
    success: true,
    sobral: {
      campaignName,
      adGroup1,
      adGroup2,
      budget: 'U$ 10 a U$ 20 / Dia (Para iniciar)',
      biddingStrategy: 'Max. Cliques (Limite de CPC: U$ 1,50 a U$ 2,50)',
      locations: 'United States, Canada, United Kingdom, Australia, New Zealand (Tier 1)',
      languages: 'English'
    },
    exact: [...exact, `[${lowerProduct}]`, ...exact2],
    phrase: [...phrase, `"${lowerProduct}"`, ...phrase2],
    negatives: negativeKeywords,
    ads: {
      finalUrl: affiliateLink ? affiliateLink : 'https://SuaPresell.com',
      displayPath1: 'Official',
      displayPath2: 'Discount',
      titles: [
        `${upperProduct}™ Official`,
        `Official Website (Save 80%)`,
        `Order ${upperProduct} Today`,
        `Limited Time Special Offer`,
        `180-Day Money Back`
      ],
      descriptions: [
        `Get ${upperProduct} from the Official Website. 100% Natural. Order Now!`,
        `180-Day Money Back Guarantee. Don't buy fakes, order from the Official Store now.`,
        `Exclusive Discount Available Today. Stock is strictly limited. Order ${upperProduct}™.`
      ],
      callouts: [
        "180-Day Guarantee",
        "Free Shipping USA",
        "100% Natural",
        "Secure Checkout"
      ]
    }
  });
}
