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

if (!VITE_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || VITE_SUPABASE_URL === '[SENSITIVE]') {
  // Use anon key for schema test if service role is masked
  let anonKey = '';
  const anonMatch = envContent.match(/VITE_SUPABASE_ANON_KEY="?([^"\r\n]+)"?/);
  if (anonMatch) anonKey = anonMatch[1];
}

async function run() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl) {
    console.log("NO URL");
    return;
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.from('taxmanagers_companies').select('*').limit(1);
  if (error) {
    console.error(error);
  } else {
    if (data && data.length > 0) {
      console.log(Object.keys(data[0]));
    } else {
      console.log("Tabela vazia ou RLS bloqueando.");
    }
  }
}

// Just trying to run a hardcoded REST call if we can't use Supabase client
console.log("I cannot run this because the env vars are redacted by Vercel CLI / AI framework.");
