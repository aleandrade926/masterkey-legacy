import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf8");
  const env = {};
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  });
  return env;
}

const envObj = loadEnvFile(".env");
const url = envObj.VITE_SUPABASE_URL;
const key = envObj.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(url, key);

(async () => {
  console.log("=== TESTANDO COLUNAS DA TABELA taxmanagers_companies ===");

  // Testar se updated_at existe
  const { error: errUpdate } = await supabase
    .from("taxmanagers_companies")
    .select("updated_at")
    .limit(1);

  console.log("Teste coluna 'updated_at':", errUpdate ? errUpdate.message : "Existe!");

  // Testar se linkedin_url existe
  const { error: errUrl } = await supabase
    .from("taxmanagers_companies")
    .select("linkedin_url")
    .limit(1);

  console.log("Teste coluna 'linkedin_url':", errUrl ? errUrl.message : "Existe!");

  // Testar se normalized_name existe
  const { error: errNorm } = await supabase
    .from("taxmanagers_companies")
    .select("normalized_name")
    .limit(1);

  console.log("Teste coluna 'normalized_name':", errNorm ? errNorm.message : "Existe!");

  // Testar se review_status existe
  const { error: errRev } = await supabase
    .from("taxmanagers_companies")
    .select("review_status")
    .limit(1);

  console.log("Teste coluna 'review_status':", errRev ? errRev.message : "Existe!");

})();
