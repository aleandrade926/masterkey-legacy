import fs from 'fs';
const path = 'C:/Users/Alexandre/.gemini/antigravity/brain/a96bf9ad-4b32-4b47-b3c8-91428b4c56f5/.system_generated/steps/441/content.md';
const content = fs.readFileSync(path, 'utf8');
const idx = content.indexOf('ytInitialPlayerResponse =');
if (idx !== -1) {
  const sub = content.substring(idx, idx + 2000);
  console.log('PLAYER RESPONSE CHUNK:', sub.substring(0, 1000));
} else {
  const idx2 = content.indexOf('"videoDetails"');
  if (idx2 !== -1) {
    console.log('videoDetails chunk:', content.substring(idx2, idx2 + 1000));
  } else {
    console.log('videoDetails not found');
  }
}
