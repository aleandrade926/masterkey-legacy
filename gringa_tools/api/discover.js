import ytSearch from 'yt-search';

const PLATFORM_AND_NOISE_BLACKLIST = new Set([
  'DIGISTORE24', 'DIGISTORE', 'BUYGOODS', 'CLICKBANK', 'MAXWEB', 'AMAZON', 'EBAY', 'WALMART',
  'SUPPLEMENT', 'SUPPLEMENTS', 'WEIGHT LOSS', 'BLOOD SUGAR', 'TINNITUS', 'DENTAL',
  'HONEST', 'REAL', 'THE REAL', 'MY HONEST', 'UPDATED', 'CUSTOMER', 'USER',
  'DOCTOR', 'SCAM', 'WARNING', 'EXPOSED', 'SIDE EFFECTS', 'INGREDIENTS',
  'DOES IT WORK', 'IS IT LEGIT', 'MUST WATCH', 'DONT BUY', 'BEFORE YOU BUY',
  'NEW', 'OFFICIAL', 'WEBSITE', 'DROPS', 'PILLS', 'CAPSULES', 'GUMMIES', 'FORMULA',
  'VIDEO', 'YOUTUBE', 'FULL', 'TRUTH', 'EXPERIENCE', 'RESULTS',
  'AFFILIATE', 'MARKETING', 'AFFILIATE MARKETING', 'FFILIATE MARKETING', 'FFILIATE',
  'TUTORIAL', 'BEGINNER', 'BEGINNERS', 'COURSE', 'STEP BY STEP', 'FREE TRAFFIC',
  'TRAFFIC', 'ADS', 'STRATEGY', 'PASSIVE INCOME', 'ONLINE MONEY', 'EARN MONEY',
  'HOW TO', 'METHOD', 'GUIDE', 'MAKE MONEY', 'BEST WAY', 'COMMISSION'
]);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const searchJobs = [
    { platform: 'ClickBank', query: '"honest review" "clickbank" -amazon' },
    { platform: 'ClickBank', query: '"official website" "clickbank" review supplement' },
    { platform: 'BuyGoods', query: '"honest review" "buygoods" -amazon' },
    { platform: 'Digistore24', query: '"honest review" "digistore24" -amazon' },
    { platform: 'MaxWeb', query: '"honest review" "maxweb" -amazon' },
    { platform: 'ClickBank', query: '"official website" "180 days guarantee" supplement review' },
    { platform: 'ClickBank', query: '"official website" "60 days guarantee" supplement review' },
    { platform: 'ClickBank', query: '"blood sugar" "ingredients" "official website" review' },
    { platform: 'ClickBank', query: '"tinnitus" "official website" review' }
  ];

  const productMap = {};

  try {
    for (const job of searchJobs) {
      const r = await ytSearch(job.query);
      const videos = (r.videos || []).slice(0, 15);

      videos.forEach(v => {
        const title = v.title || '';
        
        const patterns = [
          /^(?:honest\s+|new\s+|updated\s+|dr\.?\s+[\w]+\s+)?([A-Za-z0-9\s\-']{3,25}?)(?:\s+(?:reviews?|honest review|scam|warning|exposed|ingredients|drops|formula|supplement|capsules|gummies|official|does it work))/i,
          /([A-Za-z0-9\s\-']{3,25}?)\s+review/i
        ];

        let extracted = null;
        for (const pattern of patterns) {
          const m = title.match(pattern);
          if (m && m[1]) {
            extracted = m[1];
            break;
          }
        }

        if (extracted) {
          let cleanName = extracted
            .replace(/[\[\]\(\)!?|:–—\-#\*\"]/g, ' ')
            .replace(/\b(honest|my|updated|real|dr|doctor|prof|new|urgent|watch|before|buying|buy|the|best|scam|warning|exposed|alert|official|website|review|reviews|2024|2025|2026|affiliate|marketing)\b/gi, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .toUpperCase();

          let words = cleanName.split(' ').filter(w => w.length > 1);
          // Remove palavras repetidas seguidas (ex: ALPILEAN ALPILEAN -> ALPILEAN)
          words = words.filter((item, pos, arr) => pos === 0 || item !== arr[pos - 1]);
          cleanName = words.join(' ');
          
          if (
            words.length >= 1 &&
            words.length <= 3 &&
            cleanName.length >= 3 &&
            cleanName.length <= 25 &&
            !PLATFORM_AND_NOISE_BLACKLIST.has(cleanName) &&
            !words.some(w => ['AFFILIATE', 'MARKETING', 'TUTORIAL', 'COURSE', 'INCOME', 'MONEY'].includes(w)) &&
            !words.every(w => PLATFORM_AND_NOISE_BLACKLIST.has(w))
          ) {
            if (!productMap[cleanName]) {
              productMap[cleanName] = {
                name: cleanName,
                count: 0,
                platform: job.platform, // Plataforma detectada de onde veio a oferta
                sampleTitle: title,
                views: v.views,
                ago: v.ago,
                url: v.url
              };
            }
            productMap[cleanName].count += 1;
          }
        }
      });
    }

    const sortedProducts = Object.values(productMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 18);

    res.status(200).json({
      success: true,
      products: sortedProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
