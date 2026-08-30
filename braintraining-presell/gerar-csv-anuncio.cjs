const fs = require('fs');
const path = require('path');

const csvContent = `Action,Campaign,Ad Group,Ad type,Headline 1,Headline 2,Headline 3,Headline 4,Headline 5,Description 1,Description 2,Description 3,Final URL
Add,BTD - Fundo de Funil,Grupo 1 - Compradores,Responsive search ad,Brain Training For Dogs,Stop Bad Dog Behavior Today,Official Site - Check Pricing,Stop Dog Peeing & Barking,Adrienne Farricelli Course,Does your dog pee inside or destroy furniture? Discover the hidden solution.,Unlock your dog's hidden intelligence. Stop bad behavior in weeks not years.,Wasted money on dog training? See what rescue shelters use to calm anxious dogs.,https://braintraining-presell.vercel.app
`;

const outputPath = path.join('C:\\Users\\Alexandre\\Downloads', 'anuncio_final.csv');
fs.writeFileSync(outputPath, csvContent);
console.log("CSV do anúncio gerado!");
