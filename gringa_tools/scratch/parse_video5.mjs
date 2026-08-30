import fs from 'fs';
const path = 'C:/Users/Alexandre/.gemini/antigravity/brain/a96bf9ad-4b32-4b47-b3c8-91428b4c56f5/.system_generated/steps/441/content.md';
const content = fs.readFileSync(path, 'utf8');
const start = content.indexOf('ytInitialPlayerResponse =');
if (start !== -1) {
  const jsonStart = start + 'ytInitialPlayerResponse ='.length;
  const jsonEnd = content.indexOf(';</script>', jsonStart);
  const jsonStr = content.substring(jsonStart, jsonEnd !== -1 ? jsonEnd : jsonStart + 100000).trim();
  const data = JSON.parse(jsonStr);
  console.log('--- VIDEO INFO ---');
  console.log('TITLE:', data.videoDetails?.title);
  console.log('AUTHOR:', data.videoDetails?.author);
  console.log('LENGTH (sec):', data.videoDetails?.lengthSeconds);
  console.log('DESCRIPTION:', data.videoDetails?.shortDescription);
}
