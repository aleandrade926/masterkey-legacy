const fs = require('fs');
let html = fs.readFileSync('manual.html', 'utf8');

html = html.replace(/const VALID_PASSWORDS = \['LF2026', 'USUCAPIAO2026', 'ANDRADE2026'\];/, "const VALID_PASSWORDS = ['LF2026', 'LC2026', 'USUCAPIAO2026', 'ANDRADE2026'];");
fs.writeFileSync('manual.html', html);
console.log('Password LC2026 added.');
