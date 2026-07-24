import React, { useState } from "react";
import {
  validateInput,
  validateOutput,
  buildBlockedOutput,
  EXAMPLE_READY_PAYLOAD,
  EXAMPLE_BLOCKED_PAYLOAD,
  type FootInTheDoorInput,
  type FootInTheDoorOutput,
} from "../lib/taxmanagers/foot-in-the-door-agent";

// Extending the output locally to show debug data
interface LabOutput extends FootInTheDoorOutput {
  _debug_metadata?: {
    prompt_tokens: number;
    completion_tokens: number;
    execution_time_ms: number;
    raw_response: string;
  };
}

export default function FootInTheDoorLab() {
  const [rawInput, setRawInput] = useState(JSON.stringify(EXAMPLE_READY_PAYLOAD, null, 2));
  const [output, setOutput] = useState<LabOutput | null>(null);
  const [parseError, setParseError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setParseError("");
    setOutput(null);
    setLoading(true);

    let parsed: FootInTheDoorInput;
    try {
      parsed = JSON.parse(rawInput) as FootInTheDoorInput;
    } catch (err: any) {
      setParseError(`Erro ao processar JSON de entrada: ${err.message}`);
      setLoading(false);
      return;
    }

    // 1. Validação estática antes de chamar a API
    const inputErrors = validateInput(parsed);
    if (inputErrors.length > 0) {
      setOutput(buildBlockedOutput(inputErrors, parsed.informacoes_nao_confirmadas || []));
      setLoading(false);
      return;
    }

    try {
      // 2. Chamada à Groq via Vercel Serverless
      const response = await fetch('/api/foot_in_the_door_lab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsed)
      });

      if (!response.ok) {
        setParseError(`Erro HTTP da API: ${response.status}`);
        setLoading(false);
        return;
      }

      const apiResult = await response.json() as LabOutput;
      
      // Se a própria API bloqueou (por timeout ou json inválido)
      if (apiResult.status === "blocked") {
         setOutput(apiResult);
         setLoading(false);
         return;
      }

      // 3. Validação estática da saída do LLM
      const finalValidatedResult = validateOutput(apiResult) as LabOutput;
      
      // Preserve debug metadata through validation
      if (apiResult._debug_metadata) {
        finalValidatedResult._debug_metadata = apiResult._debug_metadata;
      }

      setOutput(finalValidatedResult);
    } catch (err: any) {
      setParseError(`Erro de rede ao chamar a API: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadExample = (type: "ready" | "blocked" | "superficial") => {
    let payload;
    if (type === "ready") {
      payload = EXAMPLE_READY_PAYLOAD;
    } else if (type === "blocked") {
      payload = EXAMPLE_BLOCKED_PAYLOAD;
    } else {
      payload = {
        nome: "Fernanda",
        cargo: "Analista",
        empresa: "Empresa XPTO",
        setor: "",
        vinculo_atual_confirmado: true,
        historico: [],
        fatos_confirmados: [],
        hipoteses_permitidas: [],
        informacoes_nao_confirmadas: ["Setor", "Operações", "Regime tributário"]
      };
    }
    setRawInput(JSON.stringify(payload, null, 2));
    setOutput(null);
    setParseError("");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "#e2e8f0",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      padding: "2rem",
    }}>
      {/* Header */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        marginBottom: "2rem",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "0.5rem",
        }}>
          <span style={{ fontSize: "2rem" }}>🦙</span>
          <h1 style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #f59e0b, #ef4444)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
          }}>
            Foot in the Door — IA Real Lab (LLaMA 3.3)
          </h1>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "0.875rem", margin: 0 }}>
          Protótipo local • Validação TS Estrita • IA rodando via Serverless + Groq
        </p>
      </div>

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.5rem",
      }}>
        {/* INPUT PANEL */}
        <div style={{
          background: "#1e293b",
          borderRadius: "0.75rem",
          border: "1px solid #334155",
          padding: "1.5rem",
        }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: 0, marginBottom: "1rem", color: "#f1f5f9" }}>
            📥 Payload de Entrada
          </h2>

          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <button onClick={() => loadExample("ready")} style={btnStyle("#059669")}>Caso A: Completo</button>
            <button onClick={() => loadExample("blocked")} style={btnStyle("#dc2626")}>Caso B: Vínculo Antigo</button>
            <button onClick={() => loadExample("superficial")} style={btnStyle("#ea580c")}>Caso C: Superficial</button>
          </div>

          <textarea
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            style={{
              width: "100%",
              minHeight: "500px",
              background: "#0f172a",
              color: "#e2e8f0",
              border: "1px solid #475569",
              borderRadius: "0.5rem",
              padding: "1rem",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: "0.75rem",
              lineHeight: "1.5",
              resize: "vertical",
            }}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "1rem",
              padding: "0.75rem 1.5rem",
              background: loading ? "#475569" : "linear-gradient(135deg, #2563eb, #7c3aed)",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            {loading ? "⏳ Processando via LLaMA..." : "🚀 Gerar Análise (IA)"}
          </button>

          {parseError && (
            <div style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              background: "#7f1d1d",
              border: "1px solid #dc2626",
              borderRadius: "0.5rem",
              color: "#fca5a5",
              fontSize: "0.813rem",
            }}>
              ❌ {parseError}
            </div>
          )}
        </div>

        {/* OUTPUT PANEL */}
        <div style={{
          background: "#1e293b",
          borderRadius: "0.75rem",
          border: "1px solid #334155",
          padding: "1.5rem",
          overflow: "auto",
        }}>
          <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: 0, marginBottom: "1rem", color: "#f1f5f9" }}>
            📤 Saída IA (Validada)
          </h2>

          {!output && !parseError && !loading && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px", color: "#64748b" }}>
              Aguardando requisição
            </div>
          )}

          {output && (
            <>
              {/* Status Badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "2rem",
                marginBottom: "1rem",
                background: output.status === "ready" ? "#064e3b" : "#7f1d1d",
                border: `1px solid ${output.status === "ready" ? "#059669" : "#dc2626"}`,
                color: output.status === "ready" ? "#6ee7b7" : "#fca5a5",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}>
                {output.status === "ready" ? "✅ READY (APROVADO PELA VALIDAÇÃO)" : "🚫 BLOCKED (INTERCEPTADO)"}
              </div>

              {/* Debug Metadata */}
              {output._debug_metadata && (
                <div style={{ marginBottom: "1rem", padding: "0.5rem", background: "#334155", borderRadius: "0.25rem", fontSize: "0.75rem", display: "flex", gap: "1rem" }}>
                  <span>⏱️ {output._debug_metadata.execution_time_ms}ms</span>
                  <span>🪙 Tokens: {output._debug_metadata.prompt_tokens} (P) + {output._debug_metadata.completion_tokens} (C)</span>
                </div>
              )}

              {/* Blocking Reasons */}
              {output.status === "blocked" && output.blocking_reasons.length > 0 && (
                <div style={{ marginBottom: "1rem", padding: "1rem", background: "#450a0a", border: "1px solid #dc2626", borderRadius: "0.5rem" }}>
                  <h3 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", color: "#fca5a5" }}>Razões de Bloqueio (Validador):</h3>
                  <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.813rem", color: "#fecaca" }}>
                    {output.blocking_reasons.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}

              {/* Recommended Message */}
              {output.status === "ready" && output.recommended_message && (
                <div style={{ marginBottom: "1rem", padding: "1rem", background: "#0c4a6e", border: "1px solid #0284c7", borderRadius: "0.5rem" }}>
                  <h3 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", color: "#7dd3fc" }}>💬 Mensagem Finalizada:</h3>
                  <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: "0.813rem", color: "#e0f2fe", lineHeight: "1.6" }}>{output.recommended_message}</pre>
                </div>
              )}

              {/* Full JSON */}
              <details open={output.status === "blocked"}>
                <summary style={{ cursor: "pointer", fontSize: "0.875rem", fontWeight: 600, color: "#94a3b8", marginBottom: "0.5rem" }}>
                  📋 JSON Completo da Saída (Pós-Validação)
                </summary>
                <pre style={{
                  background: "#0f172a", border: "1px solid #475569", borderRadius: "0.5rem",
                  padding: "1rem", fontSize: "0.688rem", color: "#cbd5e1", overflow: "auto", maxHeight: "400px", lineHeight: "1.5"
                }}>
                  {JSON.stringify(output, null, 2)}
                </pre>
              </details>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function btnStyle(color: string) {
  return {
    padding: "0.5rem 1rem",
    background: color,
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    cursor: "pointer",
    fontSize: "0.813rem",
    fontWeight: 500,
  };
}
