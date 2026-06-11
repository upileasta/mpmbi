import * as fs from 'fs';
import * as cheerio from 'cheerio';

const html2 = fs.readFileSync('/home/rvllfil/.gemini/antigravity-ide/brain/01b367d0-e706-4d71-b6e0-8d243ba27ce9/scratch/berita.html', 'utf-8');

const parts = html2.split('<h1>Artikel ');
const chunk = '<h1>Artikel ' + parts[1];
const $ = cheerio.load(chunk, null, false);

const contentNodes: string[] = [];
let startRecording = false;
$.root().contents().each((idx, el) => {
  const isTable = el.type === 'tag' && el.name === 'table';
  if (isTable) {
    startRecording = true; // start after metadata table
    return;
  }
  if (startRecording) {
    if (el.type === 'tag' && el.name === 'h2') {
      startRecording = false; // Stop at Catatan unggahan
    } else {
      contentNodes.push($.html(el));
    }
  }
});

console.log("Extracted berita content:");
console.log(contentNodes.join('\n'));
