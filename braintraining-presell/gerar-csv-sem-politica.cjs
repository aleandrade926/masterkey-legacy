const fs = require('fs');
const path = require('path');

const csvContent = `Action,Campaign,Ad Group,Max CPC,Keyword,Headline 1,Headline 2,Headline 3,Headline 4,Headline 5,Description 1,Description 2,Description 3,Final URL
Add,BTD - Fundo de Funil,Grupo 1 - Compradores,"2,50",,,,,,,,,,
Add,BTD - Fundo de Funil,Grupo 1 - Compradores,,"[brain training for dogs]",,,,,,,,,
Add,BTD - Fundo de Funil,Grupo 1 - Compradores,,"[brain training for dogs course]",,,,,,,,,
Add,BTD - Fundo de Funil,Grupo 1 - Compradores,,"[adrienne farricelli brain training]",,,,,,,,,
Add,BTD - Fundo de Funil,Grupo 1 - Compradores,,"[buy brain training for dogs]",,,,,,,,,
Add,BTD - Fundo de Funil,Grupo 1 - Compradores,,"[brain training for dogs discount]",,,,,,,,,
Add,BTD - Fundo de Funil,Grupo 1 - Compradores,,,Brain Training For Dogs,Stop Bad Dog Behavior Today,Official Site - Check Pricing,Stop Dog Peeing & Barking,Adrienne Farricelli Course,Does your dog pee inside or destroy furniture? Discover the hidden solution.,Unlock your dog's hidden intelligence. Stop bad behavior in weeks not years.,Wasted money on dog training? See what rescue shelters use to calm anxious dogs.,https://braintraining-presell.vercel.app
`;

const outputPath = path.join('C:\\Users\\Alexandre\\Downloads', 'campanha_SEM_POLITICA.csv');
fs.writeFileSync(outputPath, csvContent);
console.log("CSV gerado sem a linha de campanha!");
