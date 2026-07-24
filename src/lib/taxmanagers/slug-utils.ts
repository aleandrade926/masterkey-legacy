import { supabase } from "../supabase";

export const RESERVED_SLUGS = new Set([
  "novo",
  "admin",
  "app",
  "login",
  "api",
  "settings",
  "empresas",
  "pessoas",
  "negocios",
  "oportunidades",
  "entregas",
  "in",
  "company",
  "p",
  "c",
  "taxmanagers"
]);

export function normalizeSlug(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-z0-9]+/g, "-")     // Substitui caracteres nao alfanumericos por hífen
    .replace(/^-+|-+$/g, "")          // Remove hifens no inicio/fim
    .replace(/-{2,}/g, "-");          // Substitui hifens duplicados
}

export function validateSlugFormat(slug: string): { valid: boolean; error?: string } {
  if (!slug || slug.length < 3) {
    return { valid: false, error: "O slug deve ter pelo menos 3 caracteres." };
  }
  if (slug.length > 60) {
    return { valid: false, error: "O slug deve ter no máximo 60 caracteres." };
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { valid: false, error: "O slug contém caracteres inválidos. Use apenas letras minúsculas, números e hífens." };
  }
  if (RESERVED_SLUGS.has(slug)) {
    return { valid: false, error: "Este slug é um termo reservado do sistema." };
  }
  return { valid: true };
}

export async function checkSlugAvailability(
  table: "taxmanagers_leads" | "taxmanagers_companies",
  slug: string,
  currentId?: string
): Promise<{ available: boolean; error?: string }> {
  const formatCheck = validateSlugFormat(slug);
  if (!formatCheck.valid) {
    return { available: false, error: formatCheck.error };
  }

  let query = supabase.from(table).select("id").eq("slug", slug);
  if (currentId) {
    query = query.neq("id", currentId);
  }

  const { data, error } = await query;
  if (error) {
    return { available: false, error: error.message };
  }

  if (data && data.length > 0) {
    return { available: false, error: "Este slug já está em uso por outro registro." };
  }

  return { available: true };
}

export async function generateUniqueSlug(
  table: "taxmanagers_leads" | "taxmanagers_companies",
  baseText: string,
  currentId?: string
): Promise<string> {
  let candidate = normalizeSlug(baseText);
  if (!candidate || candidate.length < 3) {
    candidate = "registro-" + Math.random().toString(36).substring(2, 7);
  }

  if (RESERVED_SLUGS.has(candidate)) {
    candidate = `${candidate}-ref`;
  }

  let uniqueSlug = candidate;
  let counter = 1;

  while (true) {
    const { available } = await checkSlugAvailability(table, uniqueSlug, currentId);
    if (available) {
      return uniqueSlug;
    }
    counter++;
    uniqueSlug = `${candidate}-${counter}`;
  }
}
