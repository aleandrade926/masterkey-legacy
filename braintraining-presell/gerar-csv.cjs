const fs = require('fs');

// Cabeçalhos que o Google Ads reconhece para importação em massa
const csvContent = `Campaign,Ad Group,Keyword,Match Type,Headline 1,Headline 2,Headline 3,Headline 4,Headline 5,Headline 6,Description 1,Description 2,Description 3,Description 4,Final URL
BTD - Fundo de Funil,Grupo 1 - Compradores,brain training for dogs,Exact,,,,,,,,,,,
BTD - Fundo de Funil,Grupo 1 - Compradores,brain training for dogs course,Exact,,,,,,,,,,,
BTD - Fundo de Funil,Grupo 1 - Compradores,adrienne farricelli brain training,Exact,,,,,,,,,,,
BTD - Fundo de Funil,Grupo 1 - Compradores,buy brain training for dogs,Exact,,,,,,,,,,,
BTD - Fundo de Funil,Grupo 1 - Compradores,brain training for dogs discount,Exact,,,,,,,,,,,
BTD - Fundo de Funil,Grupo 1 - Compradores,brain training for dogs review,Exact,,,,,,,,,,,
BTD - Fundo de Funil,Grupo 1 - Compradores,,,Brain Training For Dogs,Stop Bad Dog Behavior Today,Official Site - Check Pricing,Stop Dog Peeing & Barking,Adrienne Farricelli Course,Make Your Dog Listen To You,Does your dog pee inside or destroy furniture? Discover the hidden solution.,Unlock your dog's hidden intelligence. Stop bad behavior in weeks not years.,Wasted money on dog training? See what rescue shelters use to calm anxious dogs.,Check current availability and official pricing for the Brain Training program.,https://braintraining-presell.vercel.app
`;

// Cria a string para palavras negativas
const negativeKeywords = `Campaign,Keyword,Match Type
BTD - Fundo de Funil,free,Broad
BTD - Fundo de Funil,gratis,Broad
BTD - Fundo de Funil,pdf,Broad
BTD - Fundo de Funil,download,Broad
BTD - Fundo de Funil,torrent,Broad
BTD - Fundo de Funil,login,Broad
BTD - Fundo de Funil,members area,Broad
BTD - Fundo de Funil,scam,Broad
BTD - Fundo de Funil,does it work,Broad
BTD - Fundo de Funil,youtube,Broad
`;

fs.writeFileSync('C:\\Users\\Alexandre\\masterkey-frontend\\braintraining-presell\\anuncios_e_palavras.csv', csvContent);
fs.writeFileSync('C:\\Users\\Alexandre\\masterkey-frontend\\braintraining-presell\\palavras_negativas.csv', negativeKeywords);

console.log("Arquivos CSV gerados com sucesso!");
