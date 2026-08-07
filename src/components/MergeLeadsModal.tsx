import React, { useState } from "react";
import { X, Check, ArrowRight, ShieldCheck, AlertTriangle, Users } from "lucide-react";
import { Lead, DuplicateGroup, mergeLeadData, executeLeadMergeInSupabase } from "../lib/leadDeduplication";

interface MergeLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  duplicateGroups: DuplicateGroup[];
  onMergeComplete: () => void;
}

export const MergeLeadsModal: React.FC<MergeLeadsModalProps> = ({
  isOpen,
  onClose,
  duplicateGroups,
  onMergeComplete
}) => {
  if (!isOpen || !duplicateGroups || duplicateGroups.length === 0) return null;

  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
  const activeGroup = duplicateGroups[selectedGroupIndex] || duplicateGroups[0];

  const leads = activeGroup.leads;
  const [primaryLeadId, setPrimaryLeadId] = useState<string>(leads[0]?.id || "");
  const [secondaryLeadId, setSecondaryLeadId] = useState<string>(leads[1]?.id || "");

  // Update selection if active group changes
  React.useEffect(() => {
    if (activeGroup && activeGroup.leads.length >= 2) {
      setPrimaryLeadId(activeGroup.leads[0].id);
      setSecondaryLeadId(activeGroup.leads[1].id);
    }
  }, [selectedGroupIndex, activeGroup]);

  const leadA = leads.find(l => l.id === primaryLeadId) || leads[0];
  const leadB = leads.find(l => l.id === secondaryLeadId) || leads[1] || leads[0];

  // Selected overrides
  const [selectedFields, setSelectedFields] = useState<Record<string, string>>({});
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFieldSelect = (field: keyof Lead, value: string) => {
    setSelectedFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSwapRoles = () => {
    const temp = primaryLeadId;
    setPrimaryLeadId(secondaryLeadId);
    setSecondaryLeadId(temp);
    setSelectedFields({});
  };

  const handleConfirmMerge = async () => {
    if (!leadA || !leadB || leadA.id === leadB.id) {
      setErrorMsg("Selecione dois registros distintos para realizar a unificação.");
      return;
    }

    setIsMerging(true);
    setErrorMsg(null);

    const mergedData = mergeLeadData(leadA, leadB, selectedFields as Partial<Lead>);

    const result = await executeLeadMergeInSupabase(leadA.id, leadB.id, mergedData);

    setIsMerging(false);

    if (result.success) {
      onMergeComplete();
      if (duplicateGroups.length <= 1) {
        onClose();
      } else {
        // Move to next group
        const nextIndex = selectedGroupIndex >= duplicateGroups.length - 1 ? 0 : selectedGroupIndex;
        setSelectedGroupIndex(nextIndex);
      }
    } else {
      setErrorMsg(result.error || "Erro ao executar unificação de leads.");
    }
  };

  const fieldsToCompare: { key: keyof Lead; label: string }[] = [
    { key: "nome", label: "Nome" },
    { key: "empresa", label: "Empresa" },
    { key: "cargo", label: "Cargo" },
    { key: "email", label: "E-mail" },
    { key: "telefone", label: "Telefone" },
    { key: "status", label: "Status na Carteira" },
    { key: "url", label: "Link LinkedIn / Perfil" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f0f16] border border-cyan-500/20 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-[#14141f]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Unificar Leads Duplicados
                <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {duplicateGroups.length} grupo{duplicateGroups.length > 1 ? "s" : ""} encontrado{duplicateGroups.length > 1 ? "s" : ""}
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Revise os registros com dados idênticos ou muito similares e escolha quais informações manter.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Group Selector Navigation */}
        {duplicateGroups.length > 1 && (
          <div className="px-6 py-2.5 bg-[#0b0b10] border-b border-white/5 flex gap-2 overflow-x-auto text-xs">
            {duplicateGroups.map((g, idx) => (
              <button
                key={g.id}
                onClick={() => { setSelectedGroupIndex(idx); setSelectedFields({}); }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  idx === selectedGroupIndex 
                    ? "bg-cyan-600 text-white shadow-md" 
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
                }`}
              >
                Grupo #{idx + 1}: {g.matchedValue} ({g.leads.length})
              </button>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Subheader info */}
          <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-cyan-500/20 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-cyan-400">Motivo da Duplicata: </span>
              {activeGroup.reason === "nome" && `Nome Similar ("${activeGroup.matchedValue}")`}
              {activeGroup.reason === "linkedin" && `LinkedIn Key ("${activeGroup.matchedValue}")`}
              {activeGroup.reason === "email" && `E-mail ("${activeGroup.matchedValue}")`}
              {activeGroup.reason === "telefone" && `Telefone ("${activeGroup.matchedValue}")`}
            </div>

            <button
              onClick={handleSwapRoles}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all flex items-center gap-1.5"
            >
              <span>Inverter Lead Principal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Comparison Cards Header */}
          <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider">
            <div className="p-3 rounded-t-xl bg-cyan-950/40 border-t border-x border-cyan-500/30 text-cyan-300 flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Lead A (Manter Ativo)
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80">ID: {leadA?.id?.slice(0, 8)}</span>
            </div>
            <div className="p-3 rounded-t-xl bg-slate-900/60 border-t border-x border-slate-700 text-slate-400 flex justify-between items-center">
              <span>Lead B (Unificar & Arquivar)</span>
              <span className="text-[10px] font-mono text-slate-500">ID: {leadB?.id?.slice(0, 8)}</span>
            </div>
          </div>

          {/* Fields Selection Table */}
          <div className="space-y-3 border-x border-b border-white/5 rounded-b-xl p-4 bg-[#0b0b10]">
            {fieldsToCompare.map(({ key, label }) => {
              const valA = leadA?.[key] || "";
              const valB = leadB?.[key] || "";
              const selectedVal = selectedFields[key] ?? valA;

              const isDifferent = String(valA).trim().toLowerCase() !== String(valB).trim().toLowerCase();

              return (
                <div key={key} className={`p-3 rounded-xl border transition-all ${isDifferent ? "bg-white/[0.02] border-amber-500/20" : "bg-transparent border-transparent"}`}>
                  <div className="text-[11px] font-semibold text-slate-400 mb-2 flex justify-between">
                    <span>{label}</span>
                    {isDifferent && <span className="text-[10px] text-amber-400">Divergência Encontrada</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    {/* Option Lead A */}
                    <button
                      onClick={() => handleFieldSelect(key, String(valA))}
                      className={`p-3 rounded-lg border text-left transition-all flex items-start justify-between ${
                        selectedVal === String(valA)
                          ? "bg-cyan-500/10 border-cyan-500/50 text-white shadow-sm"
                          : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      <span className="break-all font-medium">{String(valA) || <em className="text-slate-600">Vazio</em>}</span>
                      {selectedVal === String(valA) && <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 ml-2" />}
                    </button>

                    {/* Option Lead B */}
                    <button
                      onClick={() => handleFieldSelect(key, String(valB))}
                      className={`p-3 rounded-lg border text-left transition-all flex items-start justify-between ${
                        selectedVal === String(valB)
                          ? "bg-cyan-500/10 border-cyan-500/50 text-white shadow-sm"
                          : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      <span className="break-all font-medium">{String(valB) || <em className="text-slate-600">Vazio</em>}</span>
                      {selectedVal === String(valB) && <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 ml-2" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Unified Note Preview */}
          <div className="p-4 rounded-xl bg-[#08080c] border border-white/10 text-xs space-y-2">
            <h4 className="font-bold text-slate-300">Histórico de Mensagens / Notas (Será consolidado):</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed bg-black/40 p-3 rounded-lg border border-white/5 font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
              {leadA?.chat_history || "Sem notas no Lead A"}
              {"\n\n--- [Histórico Unificado de (" + (leadB?.nome || "Lead B") + ")] ---\n"}
              {leadB?.chat_history || "Sem notas no Lead B"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#14141f] flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={handleConfirmMerge}
            disabled={isMerging}
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-600/20 flex items-center gap-2 disabled:opacity-50"
          >
            {isMerging ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Unificando...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Confirmar e Unificar Leads</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
