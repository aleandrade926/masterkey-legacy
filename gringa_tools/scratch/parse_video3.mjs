import fs from 'fs';
const content = fs.readFileSync('C:\\Users\\Alexandre\\.gemini\antigravity\\brain\\a96bf9ad-4b32-4b47-b3c8-91428b4c56f5\\.system_generated\\steps\\441\\content.md', 'utf8');
const idx = content.indexOf('ytInitialPlayerResponse =');
if (idx !== -1) {
  const sub = content.substring(idx, idx + 5000);
  console.log('PLAYER RESPONSE CHUNK:', sub.substring(0, 1000));
} else {
  console.log('ytInitialPlayerResponse not found');
  const idx2 = content.indexOf('videoDetails');
  if (idx2 !== -1) {
    console.log('videoDetails chunk:', content.substring(idx2 - 100, idx2 + 500));
  } else {
    console.log('videoDetails not found');
  }
}
