import fs from 'fs';
const content = fs.readFileSync('C:\\Users\\Alexandre\\.gemini\\antigravity\\brain\\a96bf9ad-4b32-4b47-b3c8-91428b4c56f5\\.system_generated\\steps\\441\\content.md', 'utf8');
const ytInitialData = content.match(/var ytInitialData = (\{.*?\});<\/script>/s) || content.match(/ytInitialPlayerResponse\s*=\s*(\{.*?\});/s);
if (ytInitialData) {
  try {
    const data = JSON.parse(ytInitialData[1]);
    const title = data?.videoDetails?.title;
    const author = data?.videoDetails?.author;
    const shortDesc = data?.videoDetails?.shortDescription;
    console.log('JSON TITLE:', title);
    console.log('AUTHOR:', author);
    console.log('SHORT DESC:', shortDesc ? shortDesc.substring(0, 500) : 'No desc');
  } catch (e) {
    console.log('Parse error:', e.message);
  }
} else {
  // regex search for "title":
  const allTitles = [...content.matchAll(/"title":\{"runs":\[\{"text":"(.*?)"\}\]/g)];
  console.log('Found titles:', allTitles.map(m => m[1]).slice(0, 10));
}
