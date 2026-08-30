import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env.production.local');
const envContent = fs.readFileSync(envPath, 'utf8');

let VITE_SUPABASE_URL = '';
let SUPABASE_SERVICE_ROLE_KEY = '';

const urlMatch = envContent.match(/VITE_SUPABASE_URL="?([^"\r\n]+)"?/);
if (urlMatch) VITE_SUPABASE_URL = urlMatch[1];

const keyMatch = envContent.match(/SUPABASE_SERVICE_ROLE_KEY="?([^"\r\n]+)"?/);
if (keyMatch) SUPABASE_SERVICE_ROLE_KEY = keyMatch[1];

if (!VITE_SUPABASE_URL) throw new Error("Could not find VITE_SUPABASE_URL");
if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("Could not find SUPABASE_SERVICE_ROLE_KEY");

const supabase = createClient(VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log("Searching for Amaral Ribeiro...");
  const { data, error } = await supabase.from('taxmanagers_leads').select('*').ilike('nome', '%Amaral%');
  if (error) {
    console.error(error);
  } else {
    console.log(`Found ${data.length} records.`);
    console.log(JSON.stringify(data, null, 2));
  }
}

run();
