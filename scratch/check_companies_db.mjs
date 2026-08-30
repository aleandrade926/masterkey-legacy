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
  console.log("=== INSPEÇÃO DA TABELA taxmanagers_companies ===");
  console.log("Supabase URL:", url);

  const { data, count, error } = await supabase
    .from("taxmanagers_companies")
    .select("*", { count: "exact" })
    .limit(5);

  console.log("Error:", error);
  console.log("Count:", count);
  console.log("Data sample:", data);

})();
