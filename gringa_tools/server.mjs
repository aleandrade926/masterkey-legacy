import express from 'express';
import cors from 'cors';
import ytSearch from 'yt-search';
import googleTrends from 'google-trends-api';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint: Discover Products
app.get('/api/discover', async (req, res) => {
  const searchQueries = [
    '"honest review" supplement',
    '"weight loss" review scam',
    '"blood sugar" review scam',
    '"tinnitus" review scam',
    '"dental" review scam',
    '"buygoods" review',
    '"digistore24" review'
  ];

  const productCounts = {};
  const recentProducts = [];

  try {
    for (const query of searchQueries) {
      const r = await ytSearch(query);
      const videos = r.videos.slice(0, 15);

      videos.forEach(v => {
        const titleRegex = /(.*?)\s+review/i;
        const match = v.title.match(titleRegex);
        
        if (match && match[1]) {
          let productName = match[1].trim()
                                  .replace(/[\[\]\(\)!?|]/g, '')
                                  .replace(/honest/i, '')
                                  .replace(/my/i, '')
                                  .replace(/updated/i, '')
                                  .replace(/2023|2024|2025/g, '')
                                  .trim();
          
          if (productName && productName.split(' ').length <= 3 && productName.length > 3) {
            productName = productName.toUpperCase();
            productCounts[productName] = (productCounts[productName] || 0) + 1;
            recentProducts.push({
              name: productName,
              title: v.title,
              views: v.views,
              ago: v.ago,
              url: v.url
            });
          }
        }
      });
    }

    const sortedProducts = Object.entries(productCounts)
      .sort((a, b) => b[1] - a[1])
      .filter(item => item[1] > 1)
      .map(item => ({ name: item[0], count: item[1] }));

    res.json({ success: true, products: sortedProducts, recent: recentProducts.slice(0, 10) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint: Check Trends
app.get('/api/trends', async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) return res.status(400).json({ error: 'Keyword is required' });

  try {
    const data = await googleTrends.interestOverTime({
      keyword: keyword,
      geo: 'US',
      startTime: new Date(Date.now() - (90 * 24 * 60 * 60 * 1000)),
    });

    const parsedData = JSON.parse(data);
    const timelineData = parsedData.default.timelineData;

    if (!timelineData || timelineData.length === 0) {
      return res.json({ success: true, status: 'NOT_ENOUGH_DATA', message: 'Sem dados suficientes' });
    }

    const firstHalf = timelineData.slice(0, Math.floor(timelineData.length / 2));
    const secondHalf = timelineData.slice(Math.floor(timelineData.length / 2));

    const avgFirstHalf = firstHalf.reduce((acc, curr) => acc + curr.value[0], 0) / (firstHalf.length || 1);
    const avgSecondHalf = secondHalf.reduce((acc, curr) => acc + curr.value[0], 0) / (secondHalf.length || 1);

    let verdict = 'ESTÁVEL';
    if (avgSecondHalf > avgFirstHalf * 1.2) verdict = 'ALTA';
    else if (avgSecondHalf < avgFirstHalf * 0.8) verdict = 'QUEDA';

    res.json({ 
      success: true, 
      status: verdict, 
      avgFirstHalf, 
      avgSecondHalf,
      timeline: timelineData.map(d => ({ date: d.formattedTime, value: d.value[0] }))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint: Generate Campaign
app.get('/api/campaign', (req, res) => {
  const productName = (req.query.product || '').trim().toLowerCase();
  if (!productName) return res.status(400).json({ error: 'Product name required' });

  const negativeKeywords = [
    "free", "gratis", "login", "member", "members", "members area", "download", "pdf", 
    "scam", "complaints", "fake", "legit", "is it legit", "does it work", "review", "reviews",
    "ingredients", "side effects", "amazon", "ebay", "walmart", "coupon", "discount code"
  ];

  const baseModifiers = ["buy", "order", "get", "official website", "where to buy", "purchase"];
  const exact = baseModifiers.map(mod => `[${mod} ${productName}]`);
  const exact2 = baseModifiers.map(mod => `[${productName} ${mod}]`);
  const phrase = baseModifiers.map(mod => `"${mod} ${productName}"`);
  const phrase2 = baseModifiers.map(mod => `"${productName} ${mod}"`);

  res.json({
    success: true,
    exact: [...exact, `[${productName}]`, ...exact2],
    phrase: [...phrase, `"${productName}"`, ...phrase2],
    negatives: negativeKeywords,
    copy: [
      `Title 1: Buy ${productName.toUpperCase()}™ Official`,
      `Title 2: Official Website (Save 80%)`,
      `Title 3: Order ${productName.toUpperCase()} Today`,
      `Description 1: Get ${productName.toUpperCase()} from the Official Website. 100% Natural Ingredients. Limited Time Offer!`,
      `Description 2: 180-Day Money Back Guarantee. Don't buy fakes, order from the Official Store now.`
    ]
  });
});

const PORT = 3456;
app.listen(PORT, () => {
  console.log(`Gringa Tools Frontend rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
