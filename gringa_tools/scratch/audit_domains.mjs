const subs = ['ezbattery', 'braintraining', 'alpilean', 'woodworking', 'puravive', 'dentabiome', 'instadoodle'];
for (const sub of subs) {
  const url = `https://${sub}.repesquisa.com.br`;
  try {
    const res = await fetch(url);
    console.log(`${sub}.repesquisa.com.br: HTTP ${res.status} OK`);
  } catch (e) {
    console.log(`${sub}.repesquisa.com.br: ERROR ${e.message}`);
  }
}
