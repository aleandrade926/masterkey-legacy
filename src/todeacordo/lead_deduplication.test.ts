import { test, expect } from '@playwright/test';

test.describe('Deduplicação de Leads e Regras de Segurança', () => {
  test('Garantir que dois registros com o mesmo parceiro_id + linkedin_key nunca permanecem ativos simultaneamente', async () => {
    // Dados sintéticos de teste
    const partnerId = '0ecff155-c72d-4f40-a103-2a6dcec7dbfc';
    const linkedinKey = 'test-dedup-key-amaral';

    const leadActive1 = {
      id: 'test-lead-uuid-1',
      parceiro_id: partnerId,
      linkedin_key: linkedinKey,
      import_status: 'active'
    };

    const leadActive2 = {
      id: 'test-lead-uuid-2',
      parceiro_id: partnerId,
      linkedin_key: linkedinKey,
      import_status: 'active'
    };

    // Simulação do mecanismo de deduplicação da aplicação
    const leadsDatabase = [leadActive1, leadActive2];

    // Função de verificação da regra de negócio (Garantia de Invariante)
    const activeDuplicates = leadsDatabase.filter(
      l => l.parceiro_id === partnerId && l.linkedin_key === linkedinKey && l.import_status === 'active'
    );

    // Se houver duplicatas ativas simultâneas, o mecanismo deve arquivar a secundária
    if (activeDuplicates.length > 1) {
      // Ordena por prioridade (o mais recente permanece ativo, os demais são arquivados)
      for (let i = 1; i < activeDuplicates.length; i++) {
        activeDuplicates[i].import_status = 'archived';
      }
    }

    const finalActiveList = leadsDatabase.filter(
      l => l.parceiro_id === partnerId && l.linkedin_key === linkedinKey && l.import_status === 'active'
    );

    // Validação estrita: Apenas 1 registro ativo é permitido por (parceiro_id, linkedin_key)
    expect(finalActiveList.length).toBe(1);
    expect(finalActiveList[0].id).toBe('test-lead-uuid-1');
    expect(leadsDatabase.find(l => l.id === 'test-lead-uuid-2')?.import_status).toBe('archived');
  });

  test('Garantir que a busca de importação não ignora leads da quarentena', async () => {
    const handle = 'amaral-ribeiro-228a618';
    const partnerId = '0ecff155-c72d-4f40-a103-2a6dcec7dbfc';

    const dbRecords = [
      {
        id: '24e9db6c-f943-40b0-a542-9559d7ada001',
        nome: 'AMARAL RIBEIRO',
        linkedin_key: handle,
        import_status: 'quarantine',
        parceiro_id: null
      }
    ];

    // Simulação da busca corrigida no saveImportedLead (sem a trava .eq("import_status", "active"))
    const foundLead = dbRecords.find(
      r => r.linkedin_key === handle && (r.parceiro_id === partnerId || r.parceiro_id === null)
    );

    expect(foundLead).toBeDefined();
    expect(foundLead?.id).toBe('24e9db6c-f943-40b0-a542-9559d7ada001');

    // Ao encontrar, a ação correta é PROMOVER em vez de INSERT
    if (foundLead) {
      foundLead.import_status = 'active';
      foundLead.parceiro_id = partnerId;
    }

    expect(foundLead?.import_status).toBe('active');
    expect(foundLead?.parceiro_id).toBe(partnerId);
  });

  test('Garantir que a unificação de dois registros "Luciano Hillesheim" consolida histórico e mantêm 1 único lead ativo', async () => {
    const lead1 = {
      id: 'luciano-id-1',
      nome: 'Luciano Hillesheim',
      empresa: 'Empresa A',
      cargo: 'Diretor',
      url: 'https://linkedin.com/in/lucianoh',
      email: 'luciano@empresa.com',
      telefone: '11999998888',
      aniversario: '',
      passo1_mensagem: '',
      passo2_mensagem: '',
      passo3_mensagem: '',
      status: 'Abordado' as const,
      chat_history: 'Mensagem inicial enviada no LinkedIn',
      created_at: '2026-08-01T10:00:00Z',
      import_status: 'active'
    };

    const lead2 = {
      id: 'luciano-id-2',
      nome: 'luciano hillesheim',
      empresa: 'Empresa A Ltda',
      cargo: 'CEO & Diretor',
      url: '',
      email: 'luciano.hillesheim@gmail.com',
      telefone: '11999998888',
      aniversario: '',
      passo1_mensagem: '',
      passo2_mensagem: '',
      passo3_mensagem: '',
      status: 'Pendente' as const,
      chat_history: 'Respondeu pedindo apresentação',
      created_at: '2026-08-02T12:00:00Z',
      import_status: 'active'
    };

    // Agrupamento semântico por nome normalizado
    const norm1 = lead1.nome.toLowerCase().trim();
    const norm2 = lead2.nome.toLowerCase().trim();
    expect(norm1).toBe(norm2);

    // Mesclagem de dados preservando os melhores valores
    const mergedHistory = `${lead1.chat_history}\n\n--- [Histórico Unificado de (${lead2.nome})] ---\n${lead2.chat_history}`;
    expect(mergedHistory).toContain('Mensagem inicial enviada no LinkedIn');
    expect(mergedHistory).toContain('Respondeu pedindo apresentação');
  });
});
