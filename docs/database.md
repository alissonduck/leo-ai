Estrutura do Banco de Dados (Supabase)

O banco de dados será um PostgreSQL (fornecido pelo Supabase) modelado para refletir os módulos e relacionamentos do produto. Principais entidades e tabelas:
	•	Usuários e Times:
	•	users: gerenciado pelo Supabase Auth (campos padrão: id UUID, email, password_hash, etc.). Tabela adicional profiles armazena dados complementares (nome, avatar, etc.).
	•	teams: empresas/times clientes. Campos: id UUID, name, created_at. Representa uma conta organizacional.
	•	team_members: vínculo muitos-para-muitos entre users e teams. Campos: user_id (FK), team_id (FK), role (texto/enum – ex: owner, admin, member), joined_at. Controla permissões no workspace.
	•	projects: cada produto/projeto gerido na plataforma. Campos: id UUID, team_id (FK), name (ex: “Marketplace X”), description, created_at. (Um time pode ter vários projetos, se for uma software house com múltiplos produtos).
	•	Ideias & Pesquisa:
	•	ideas: tabela de ideias/problemas. Campos: id UUID, project_id (FK), title, description, status (enum: new, validating, validated, rejected), created_by (FK user), created_at, validated_at (timestamp quando marcada validada).
	•	personas: personas definidas no projeto. Campos: id UUID, project_id (FK), name, description (texto ou JSON com atributos), created_at. (Possível FK created_by).
	•	research_records: registros de pesquisa (resultados de entrevistas, surveys, testes). Campos: id UUID, project_id (FK), type (enum: interview, survey, etc.), title (ex: “Entrevista Cliente A”), data (JSON ou texto – ex: transcrição, respostas), idea_id (FK opcional vinculando à ideia investigada), created_at.
	•	Planejamento:
	•	features: backlog de features/épicos aprovados. Campos: id UUID, project_id (FK), title, description, priority (inteiro ou enum), status (enum: planned, in_progress, done), created_at. FK opcionais: parent_id (se feature estiver dentro de outra) e talvez release_id (se já alocada a uma release futura).
	•	(Opcional: objectives: caso se queira armazenar OKRs no banco – id, project_id, name, target_metric, current_value, etc. Caso contrário, OKRs podem ficar apenas documentais no wiki.)
	•	Design:
	•	designs: tabela para protótipos/designs armazenados ou referenciados. Campos: id UUID, project_id (FK), name, type (enum: wireframe, prototype, flow), url (link para Figma ou arquivo no storage), feature_id (FK opcional, ligando a feature relacionada), created_at.
	•	comments: tabela genérica de comentários/anotações para colaboração. Campos: id UUID, project_id (FK), user_id (autor), entity_type (ex: ‘idea’, ‘task’, ‘design’), entity_id (FK do item correspondente), content (texto), created_at. (Usada em vários módulos para centralizar comentários.)
	•	Desenvolvimento:
	•	tasks: tarefas e histórias de usuário. Campos: id UUID, project_id (FK), feature_id (FK opcional, referência à feature do planejamento), sprint_id (FK opcional, se alocada a uma sprint), title, description, status (enum: todo, doing, done, etc.), assignee_id (FK user, responsável), estimate (inteiro, pontos), created_at, updated_at, completed_at (timestamp conclusão). Campo type (story, bug, task) pode distinguir naturezas.
	•	sprints: iterações de desenvolvimento. Campos: id UUID, project_id (FK), name (ex: “Sprint 1”), start_date, end_date, goal (texto curto), type (enum: scrum_sprint, shapeup_cycle), created_at. (Para ShapeUp, duration ~6 sem; para Kanban puro, essa tabela pode ser menos usada).
	•	Documentação & Releases:
	•	documents: tabela de documentos (wiki interna). Campos: id UUID, project_id (FK), title, content (TEXT, possivelmente markdown), type (enum: PRD, guide, spec, etc.), created_by (FK user), created_at, updated_at. (Permite armazenar PRD, docs de visão, manuais, etc. em formato texto versionável).
	•	releases: registros de lançamento de versões. Campos: id UUID, project_id (FK), version (string, ex: “1.0.0”), name (opcional, ex: “Alpha Release”), description (texto curto ou FK para documento de release note na tabela documents), release_date.
	•	checklists: itens de checklist de lançamento. Campos: id UUID, release_id (FK), description (ex: “Executar testes finais”), is_done (boolean), assignee_id (FK user responsável). (Alternativamente, poderíamos armazenar checklist no JSON da release, mas tabela separada facilita atribuição e tracking individual.)
	•	Feedback & Análise:
	•	feedback: feedbacks de usuários finais coletados. Campos: id UUID, project_id (FK), source (enum: in_app, support_ticket, survey, etc.), user_ident (info de quem enviou – email ou ID anonimiz. texto), message (texto do feedback), sentiment (enum ou score numérico), created_at, feature_id (FK opcional, se feedback se refere a parte específica do produto).
	•	events: (se rastrearmos eventos de uso para métricas) Campos: id (bigserial), project_id (FK), user_id (FK do usuário final, se conhecido), event_type (texto, ex: “OpenedApp”, “ClickedButtonX”), properties (JSONB – detalhes adicionais, ex: {“page”: “/home”}), timestamp. Essa tabela pode ficar volumosa; particionamento ou retenção limitada pode ser considerada.
	•	Integrações:
	•	integrations: configurações de integrações de terceiros por projeto. Campos: id UUID, project_id (FK), service (enum: slack, zendesk, etc.), config (JSON com tokens/keys necessários, armazenados de forma segura), created_at.
	•	webhooks: endpoints de webhook configurados pelo usuário. Campos: id UUID, project_id (FK), event (ex: “idea_created”, “task_completed”), url (URL fornecida para chamada), created_at.

Considerações de Segurança e Integridade: todas as tabelas possuem chaves estrangeiras adequadas para manter consistência (ex: tasks referenciando project, feature e sprint; feedback referenciando project e possivelmente feature). Serão aplicadas políticas de Row Level Security no Supabase para que usuários só acessem registros do seu team_id (derivado via join de projects e memberships). Índices: previstos em colunas usadas para filtro/ordenamento frequente (ex: status e assignee_id em tasks, created_at em várias tabelas para ordenação cronológica, etc.). Dados semiestruturados (ex: propriedades de evento, detalhes de persona) usam coluna JSONB para flexibilidade.

A escolha por Supabase (Postgres) garante aderência a ACID – ex: podemos usar transações para atualizar múltiplas tabelas ao mover tarefas entre sprints. A estrutura suporta extensões futuras (novas colunas ou tabelas) sem rework massivo, devido ao bom nível de normalização e modularidade alinhada aos módulos do produto.