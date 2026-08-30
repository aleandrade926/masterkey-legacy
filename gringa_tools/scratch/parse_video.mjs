import fs from 'fs';
const content = fs.readFileSync('C:\\Users\\Alexandre\\.gemini\\antigravity\\brain\\a96bf9ad-4b32-4b47-b3c8-91428b4c56f5\\.system_generated\\steps\\441\\content.md', 'utf8');
const titleMatch = content.match(/<title>(.*?)<\/title>/i);
const descMatch = content.match(/<meta name="description" content="(.*?)">/i) || content.match(/"description":{"simpleText":"(.*?)"}/);
console.log('TITLE:', titleMatch ? titleMatch[1] : 'No title');
console.log('DESC:', descMatch ? descMatch[1] : 'No desc');
