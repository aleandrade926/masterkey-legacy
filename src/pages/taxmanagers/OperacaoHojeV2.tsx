import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { supabase } from "../../lib/supabase";
import { 
  Calendar, CheckCircle2, AlertCircle, Clock, 
  Plus, Search, ArrowRight, User, Workflow, X
} from "lucide-react";

export default function OperacaoHojeV2() {
  const [, setLocation] = useLocation();
  const [profile, setProfile] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for custom tasks
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [customTaskTitle, setCustomTaskTitle] = useState("");
  const [customTaskDesc, setCustomTaskDesc] = useState("");
  const [customTaskDate, setCustomTaskDate] = useState("");
  const [customTaskTime, setCustomTaskTime] = useState("");
  const [taskLeadSearch, setTaskLeadSearch] = useState("");
  const [taskLeadResults, setTaskLeadResults] = useState<any[]>([]);
  const [taskSelectedLead, setTaskSelectedLead] = useState<any>(null);
  const [isSearchingLeads, setIsSearchingLeads] = useState(false);

  useEffect(() => {
    fetchProfileAndTasks();
  }, []);

  const fetchProfileAndTasks = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLocation("/auth");
        return;
      }
      
      const { data: prof } = await supabase
        .from("taxmanagers_partners")
        .select("*")
        .eq("id", session.user.id)
        .single();
        
      if (prof) {
        setProfile(prof);
        await fetchV2Tasks(prof);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const fetchV2Tasks = async (prof: any) => {
    try {
      const { data: rawTasks } = await supabase
        .from("taxmanagers_tasks")
        .select("*")
        .order("due_at", { ascending: true });
        
      if (rawTasks && rawTasks.length > 0) {
        const leadIds = [...new Set(rawTasks.map(t => t.lead_id).filter(Boolean))];
        const { data: leadsData } = await supabase
          .from("taxmanagers_leads")
          .select("id, nome, empresa, cargo, import_status, parceiro_id")
          .in("id", leadIds);
          
        const leadsMap: any = {};
        if (leadsData) {
          leadsData.forEach(l => { leadsMap[l.id] = l; });
        }
        
        const enrichedTasks = rawTasks.map(t => ({
          ...t,
          lead: leadsMap[t.lead_id] || null
        }));
        
        const filteredTasks = prof.is_admin 
          ? enrichedTasks 
          : enrichedTasks.filter(t => t.partner_id === prof.id || (t.lead && t.lead.parceiro_id === prof.id));
          
        const activeTasks = filteredTasks.filter(t => t.lead && t.lead.import_status !== "quarantine");
        setTasks(activeTasks);
      } else {
        setTasks([]);
      }
    } catch (e) {
      console.error("Erro ao carregar Fila:", e);
    }
  };

  useEffect(() => {
    if (!taskLeadSearch || taskLeadSearch.length < 3) {
      setTaskLeadResults([]);
      return;
    }
    const delay = setTimeout(async () => {
      setIsSearchingLeads(true);
      const { data } = await supabase
        .from("taxmanagers_leads")
        .select("id, nome, empresa")
        .ilike("nome", `%${taskLeadSearch}%`)
        .neq("import_status", "quarantine")
        .limit(10);
      setTaskLeadResults(data || []);
      setIsSearchingLeads(false);
    }, 500);
    return () => clearTimeout(delay);
  }, [taskLeadSearch]);

  const handleCompleteTask = async (taskId: string) => {
    try {
      await supabase
        .from("taxmanagers_tasks")
        .update({
          status: "done",
          completed_at: new Date().toISOString()
        })
        .eq("id", taskId);
        
      if (profile) fetchV2Tasks(profile);
    } catch (e) {
      console.error("Erro ao completar", e);
    }
  };

  const handleCreateCustomTask = async () => {
    if (!customTaskTitle || !customTaskDate || !customTaskTime || !taskSelectedLead) {
      alert("Preencha título, data, hora e selecione um Lead.");
      return;
    }
    try {
      const dueAt = new Date(`${customTaskDate}T${customTaskTime}:00`);
      
      const { error } = await supabase.from("taxmanagers_tasks").insert([{
        lead_id: taskSelectedLead.id,
        partner_id: profile?.id,
        type: "follow_up",
        channel: "custom",
        title: customTaskTitle,
        description: customTaskDesc,
        due_at: dueAt.toISOString(),
        status: "pending"
      }]);
      
      if (error) throw error;
      
      setShowTaskModal(false);
      setCustomTaskTitle("");
      setCustomTaskDesc("");
      setTaskSelectedLead(null);
      setTaskLeadSearch("");
      
      if (profile) fetchV2Tasks(profile);
    } catch (e: any) {
      console.error(e);
      alert("Erro ao criar tarefa: " + e.message);
    }
  };

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);

  const pendingTasks = tasks.filter(t => t.status === "pending");
  const overdueTasks = pendingTasks.filter(t => new Date(t.due_at) < todayStart);
  const todayTasks = pendingTasks.filter(t => new Date(t.due_at) >= todayStart && new Date(t.due_at) <= todayEnd);
  const futureTasks = pendingTasks.filter(t => new Date(t.due_at) > todayEnd);
  const completedToday = tasks.filter(t => t.status === "done" && new Date(t.completed_at || t.updated_at) >= todayStart && new Date(t.completed_at || t.updated_at) <= todayEnd);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-300 font-sans p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Workflow className="w-5 h-5 text-white" />
              </div>
              Operação Hoje <span className="text-cyan-500">V2</span>
            </h1>
            <p className="text-slate-400 mt-2 ml-13">Pipeline ultra responsivo para alta volumetria (Salesforce/Pipedrive style)</p>
          </div>
          
          <button 
            onClick={() => setLocation("/taxmanagers/app")}
            className="px-4 py-2 bg-[#1a1a24] hover:bg-[#222230] border border-white/10 rounded-lg text-sm transition-colors flex items-center gap-2 text-white"
          >
            Voltar ao CRM Legacy
          </button>
        </header>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111117] border border-cyan-500/20 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Calendar className="w-16 h-16 text-cyan-500" />
            </div>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Para Hoje</p>
            <p className="text-5xl font-bold text-white">{todayTasks.length}</p>
          </div>
          
          <div className="bg-[#111117] border border-red-500/20 p-6 rounded-2xl relative overflow-hidden group hover:border-red-500/40 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <p className="text-sm font-semibold text-red-400/80 uppercase tracking-wider mb-2">Atrasadas</p>
            <p className="text-5xl font-bold text-red-400">{overdueTasks.length}</p>
          </div>
          
          <div className="bg-[#111117] border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
            </div>
            <p className="text-sm font-semibold text-emerald-400/80 uppercase tracking-wider mb-2">Concluídas Hoje</p>
            <p className="text-5xl font-bold text-emerald-400">{completedToday.length}</p>
          </div>
        </div>

        {/* Queue Workspace */}
        <div className="bg-[#111117] border border-white/5 rounded-2xl p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-xl font-bold text-white">Fila de Atividades (Pipeline)</h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => {
                  if (profile) fetchV2Tasks(profile);
                }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-semibold transition-all"
              >
                Atualizar Fila
              </button>
              <button 
                onClick={() => setShowTaskModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Plus className="w-4 h-4" /> Agendar Nova Tarefa
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-500">
              <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
              <p>Carregando pipeline de execução...</p>
            </div>
          ) : pendingTasks.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-500 bg-[#0a0a0f] rounded-xl border border-dashed border-white/10">
              <CheckCircle2 className="w-16 h-16 text-emerald-500/20 mb-4" />
              <p className="text-lg text-white">Tudo limpo!</p>
              <p className="text-sm">Você não tem tarefas pendentes. Acesse um Lead para agendar.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Overdue */}
              {overdueTasks.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Atrasadas ({overdueTasks.length})
                  </h3>
                  <div className="grid gap-3">
                    {overdueTasks.map(task => (
                      <TaskRow key={task.id} task={task} onComplete={handleCompleteTask} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Today */}
              {todayTasks.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Para Fazer Hoje ({todayTasks.length})
                  </h3>
                  <div className="grid gap-3">
                    {todayTasks.map(task => (
                      <TaskRow key={task.id} task={task} onComplete={handleCompleteTask} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Future */}
              {futureTasks.length > 0 && (
                <div className="space-y-4 opacity-70">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Próximos Passos ({futureTasks.length})
                  </h3>
                  <div className="grid gap-3">
                    {futureTasks.map(task => (
                      <TaskRow key={task.id} task={task} onComplete={handleCompleteTask} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
      </div>

      {/* MODAL DE CRIAÇÃO DE TAREFA */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111117] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-500" />
                Agendar Tarefa Customizada
              </h3>
              <button 
                onClick={() => setShowTaskModal(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 overflow-y-auto">
              
              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vincular a um Lead (Busca)</label>
                {!taskSelectedLead ? (
                  <>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        type="text" 
                        value={taskLeadSearch}
                        onChange={e => setTaskLeadSearch(e.target.value)}
                        placeholder="Digite o nome do lead (mín. 3 letras)..."
                        className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:border-cyan-500/50 outline-none"
                      />
                    </div>
                    {isSearchingLeads && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a24] border border-white/10 rounded-lg p-3 text-center text-xs text-slate-400 z-10 shadow-xl">
                        Buscando leads...
                      </div>
                    )}
                    {taskLeadResults.length > 0 && !isSearchingLeads && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a24] border border-white/10 rounded-lg shadow-xl overflow-hidden z-10 max-h-48 overflow-y-auto">
                        {taskLeadResults.map(lead => (
                          <div 
                            key={lead.id}
                            onClick={() => {
                              setTaskSelectedLead(lead);
                              setTaskLeadResults([]);
                              setTaskLeadSearch("");
                            }}
                            className="p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0"
                          >
                            <div className="font-medium text-sm text-white">{lead.nome}</div>
                            {lead.empresa && <div className="text-xs text-slate-400">{lead.empresa}</div>}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-between bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                    <div>
                      <div className="font-medium text-sm text-cyan-100">{taskSelectedLead.nome}</div>
                      {taskSelectedLead.empresa && <div className="text-xs text-cyan-500/70">{taskSelectedLead.empresa}</div>}
                    </div>
                    <button 
                      onClick={() => setTaskSelectedLead(null)}
                      className="text-cyan-400 hover:text-white"
                      title="Remover Lead"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Título da Ação</label>
                <input 
                  type="text" 
                  value={customTaskTitle}
                  onChange={e => setCustomTaskTitle(e.target.value)}
                  placeholder="Ex: Ligar para confirmar recebimento da proposta"
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:border-cyan-500/50 outline-none"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Descrição / Contexto (Opcional)</label>
                <textarea 
                  value={customTaskDesc}
                  onChange={e => setCustomTaskDesc(e.target.value)}
                  placeholder="Detalhes adicionais..."
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg p-4 text-sm text-white h-24 focus:border-cyan-500/50 outline-none resize-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Data do Follow-up</label>
                  <input 
                    type="date" 
                    value={customTaskDate}
                    onChange={e => setCustomTaskDate(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:border-cyan-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hora do Follow-up</label>
                  <input 
                    type="time" 
                    value={customTaskTime}
                    onChange={e => setCustomTaskTime(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:border-cyan-500/50 outline-none [color-scheme:dark]"
                  />
                </div>
              </div>

            </div>
            
            <div className="p-5 border-t border-white/10 bg-[#0a0a0f] flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setShowTaskModal(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreateCustomTask}
                disabled={!customTaskTitle || !customTaskDate || !customTaskTime || !taskSelectedLead}
                className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/20 transition-all"
              >
                Agendar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function TaskRow({ task, onComplete }: { task: any, onComplete: (id: string) => void }) {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-[#0a0a0f] border border-white/5 hover:border-cyan-500/30 transition-colors p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-sm">
      <div className="flex items-start gap-4">
        <button 
          onClick={() => onComplete(task.id)}
          className="mt-1 w-7 h-7 rounded border border-slate-600 hover:border-emerald-500 hover:bg-emerald-500/10 flex items-center justify-center transition-colors shrink-0 bg-[#111117]"
          title="Marcar como Concluída"
        >
          <CheckCircle2 className="w-4 h-4 opacity-0 group-hover:opacity-100 text-emerald-500" />
        </button>
        
        <div>
          <h4 className="text-white font-medium flex items-center gap-2 text-base">
            {task.title}
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
              {task.type}
            </span>
          </h4>
          
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded">
              <User className="w-3.5 h-3.5" />
              <strong className="text-slate-200">{task.lead?.nome || "Lead Desconhecido"}</strong> 
              {task.lead?.empresa && ` • ${task.lead.empresa}`}
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded text-slate-300">
              <Clock className="w-3.5 h-3.5" />
              {new Date(task.due_at).toLocaleDateString("pt-BR", { hour: '2-digit', minute:'2-digit' })}
            </span>
          </div>
          
          {task.description && (
            <p className="mt-3 text-sm text-slate-400 bg-white/5 p-3 rounded-lg border border-white/5">
              {task.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-2 shrink-0 sm:self-center">
        <button 
          onClick={() => setLocation(`/taxmanagers/app?tab=leads&leadId=${task.lead_id}`)}
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg shadow-cyan-500/20"
        >
          Tratar Lead <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
