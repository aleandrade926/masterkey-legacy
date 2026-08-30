import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lista dos 5 produtos mais consistentes da gringa
const products = [
  {
    name: 'Teds Woodworking',
    cleanName: 'teds woodworking',
    vendorId: 'tedswood',
    type: 'DIY / Carpintaria',
    budget: 30,
    cpc: 12.00,
    headlines: [
      'Teds Woodworking™ Official',
      '16,000 Woodworking Plans',
      'Instant Download PDF Plans',
      'Special Discount Today (77% Off)',
      'Official Website - Lifetime Access'
    ],
    descriptions: [
      'Get Instant Access to 16,000 Woodworking Plans & Projects. Step-by-Step Instructions!',
      'Download 16,000 Step-by-Step Plans. 60-Day 100% Money-Back Guarantee. Order Now!'
    ],
    keywords: [
      'teds woodworking',
      'buy teds woodworking',
      'order teds woodworking',
      'teds woodworking official website',
      'teds woodworking plans',
      'where to buy teds woodworking'
    ]
  },
  {
    name: 'Brain Training for Dogs',
    cleanName: 'brain training for dogs',
    vendorId: 'bt4dogs',
    type: 'Pet / Cães',
    budget: 30,
    cpc: 12.00,
    headlines: [
      'Brain Training for Dogs™',
      'Official Adrienne Farricelli',
      'Stop Dog Barking & Biting',
      'Easy 21 Force-Free Games',
      'Special 60-Day Guarantee'
    ],
    descriptions: [
      'Develop Your Dogs Hidden Intelligence to Eliminate Bad Behavior. Official Course!',
      'Certified Dog Trainer Adrienne Farricellis Proven System. 60-Day Money-Back Guarantee.'
    ],
    keywords: [
      'brain training for dogs',
      'buy brain training for dogs',
      'order brain training for dogs',
      'brain training for dogs official website',
      'adrienne farricelli dog training'
    ]
  },
  {
    name: 'Pianoforall',
    cleanName: 'pianoforall',
    vendorId: 'pianofora',
    type: 'Música / Piano',
    budget: 30,
    cpc: 10.00,
    headlines: [
      'Pianoforall™ Official Course',
      'Learn Piano in Days, Not Years',
      'Complete 9-Book Audio Course',
      'Special Limited Time 50% Off',
      'Instant Access - Lifetime Updates'
    ],
    descriptions: [
      'The Easiest Way to Learn Piano & Keyboard Online. Over 450,000 Students Worldwide!',
      'Start Playing Real Piano From Day One. 60-Day Money Back Guarantee. Official Site.'
    ],
    keywords: [
      'pianoforall',
      'buy pianoforall',
      'order pianoforall',
      'pianoforall official website',
      'learn piano pianoforall'
    ]
  },
  {
    name: 'Alpilean',
    cleanName: 'alpilean',
    vendorId: 'alpilean',
    type: 'Saúde / Físico',
    budget: 35,
    cpc: 15.00,
    headlines: [
      'Alpilean™ Official Website',
      'Buy Alpilean™ (Save 80%)',
      'Order Genuine Alpilean Today',
      'Limited Time Official Special',
      '60-Day Money Back Guarantee'
    ],
    descriptions: [
      'Get Genuine Alpilean from the Official Store. 100% Natural Alpine Formula. Order Now!',
      'Backed by a 60-Day 100% Satisfaction Guarantee. Fast USA Shipping. Dont Buy Fakes.'
    ],
    keywords: [
      'alpilean',
      'buy alpilean',
      'order alpilean',
      'alpilean official website',
      'alpilean official store',
      'where to buy alpilean'
    ]
  },
  {
    name: 'Java Burn',
    cleanName: 'java burn',
    vendorId: 'javaburn',
    type: 'Saúde / Café',
    budget: 35,
    cpc: 15.00,
    headlines: [
      'Java Burn™ Official Website',
      'Buy Java Burn™ (Save 80%)',
      'Order Java Burn Coffee Formula',
      'Official Limited Time Offer',
      '60-Day 100% Money Back'
    ],
    descriptions: [
      'Get Java Burn from the Official Website. 100% Natural Proprietary Formula. Order Now!',
      'Backed by 60-Day 100% Money Back Guarantee. Fast USA Delivery. Exclusive Online Discount.'
    ],
    keywords: [
      'java burn',
      'buy java burn',
      'order java burn',
      'java burn official website',
      'java burn official store',
      'where to buy java burn'
    ]
  }
];

const negativeList = [
  'free', 'gratis', 'login', 'member', 'members', 'download', 'pdf',
  'scam', 'complaints', 'fake', 'side effects', 'amazon', 'ebay', 'walmart',
  'coupon', 'discount code', 'refund', 'does it work', 'is it legit', 'review', 'reviews'
];

const headers = [
  'Campaign',
  'Campaign Daily Budget',
  'Campaign Type',
  'Networks',
  'Languages',
  'Ad Group',
  'Max CPC',
  'Keyword',
  'Criterion Type',
  'Headline 1',
  'Headline 2',
  'Headline 3',
  'Headline 4',
  'Headline 5',
  'Description 1',
  'Description 2',
  'Final URL',
  'Path 1',
  'Path 2'
];

const rows = [];

products.forEach(p => {
  const campName = `[01] - GS - Fundo de Funil - ${p.name.toUpperCase()}`;
  const adGroupName = `[01] - Termos de Compra`;
  const presellUrl = `https://gringatools.vercel.app/presell.html?p=${encodeURIComponent(p.name)}&link=https://SEU_NICKNAME.${p.vendorId}.hop.clickbank.net`;

  // 1. Linha do Anúncio Responsivo
  rows.push([
    campName,
    p.budget,
    'Search',
    'Google search',
    'en;pt',
    adGroupName,
    p.cpc,
    '', // Keyword vazio na linha do anúncio
    '',
    p.headlines[0],
    p.headlines[1],
    p.headlines[2],
    p.headlines[3],
    p.headlines[4],
    p.descriptions[0],
    p.descriptions[1],
    presellUrl,
    'Official',
    'Discount'
  ]);

  // 2. Palavras em Correspondência de Frase ("termo") e Exata ([termo]) para GARANTIR impressões
  p.keywords.forEach(kw => {
    // Frase
    rows.push([
      campName, '', '', '', '',
      adGroupName,
      p.cpc,
      `"${kw}"`,
      'Phrase',
      '', '', '', '', '', '', '', '', '', ''
    ]);
    // Exata
    rows.push([
      campName, '', '', '', '',
      adGroupName,
      p.cpc,
      `[${kw}]`,
      'Exact',
      '', '', '', '', '', '', '', '', '', ''
    ]);
  });

  // 3. Negativas Nível Campanha
  negativeList.forEach(neg => {
    rows.push([
      campName, '', '', '', '',
      '', // Nível campanha
      '',
      neg,
      'Negative Phrase',
      '', '', '', '', '', '', '', '', '', ''
    ]);
  });
});

const csvContent = [
  headers.join(','),
  ...rows.map(row => row.map(cell => `"${String(cell !== undefined && cell !== null ? cell : '').replace(/"/g, '""')}"`).join(','))
].join('\r\n');

const outputPath = path.join(__dirname, 'campanhas_google_ads_prontas.csv');
fs.writeFileSync(outputPath, csvContent, 'utf-8');

console.log(`Planilha gerada com sucesso em: ${outputPath}`);
console.log(`Total de linhas estruturadas: ${rows.length}`);
