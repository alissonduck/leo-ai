-- +migrate Up
-- Tabela de ideias
CREATE TABLE public.ideas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'validating', 'validated', 'rejected'
    impact TEXT, -- 'high', 'medium', 'low'
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    validated_at TIMESTAMPTZ
);

COMMENT ON TABLE public.ideas IS 'Ideias ou problemas identificados';

-- Tabela de personas
CREATE TABLE public.personas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description JSONB, -- Perfil demográfico, necessidades, dores, etc.
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

COMMENT ON TABLE public.personas IS 'Personas definidas no projeto';

-- Tabela de tags para ideias
CREATE TABLE public.idea_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    color TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(project_id, name)
);

COMMENT ON TABLE public.idea_tags IS 'Tags para categorizar ideias';

-- Relacionamento muitos-para-muitos entre ideias e tags
CREATE TABLE public.idea_to_tag (
    idea_id UUID REFERENCES public.ideas(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.idea_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (idea_id, tag_id)
);

COMMENT ON TABLE public.idea_to_tag IS 'Relacionamento entre ideias e tags';

-- Relacionamento entre ideias e personas
CREATE TABLE public.idea_to_persona (
    idea_id UUID REFERENCES public.ideas(id) ON DELETE CASCADE,
    persona_id UUID REFERENCES public.personas(id) ON DELETE CASCADE,
    PRIMARY KEY (idea_id, persona_id)
);

COMMENT ON TABLE public.idea_to_persona IS 'Relacionamento entre ideias e personas';

-- Tabela de comentários para ideias
CREATE TABLE public.idea_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    idea_id UUID NOT NULL REFERENCES public.ideas(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

COMMENT ON TABLE public.idea_comments IS 'Comentários nas ideias';

-- Tabela de votos para ideias
CREATE TABLE public.idea_votes (
    idea_id UUID REFERENCES public.ideas(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (idea_id, user_id)
);

COMMENT ON TABLE public.idea_votes IS 'Votos de usuários em ideias';

-- Índices
CREATE INDEX idx_ideas_project ON public.ideas(project_id);
CREATE INDEX idx_ideas_created_by ON public.ideas(created_by);
CREATE INDEX idx_ideas_status ON public.ideas(status);
CREATE INDEX idx_personas_project ON public.personas(project_id);
CREATE INDEX idx_idea_tags_project ON public.idea_tags(project_id);
CREATE INDEX idx_idea_comments_idea ON public.idea_comments(idea_id);
CREATE INDEX idx_idea_comments_user ON public.idea_comments(user_id);

-- RLS
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idea_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idea_to_tag ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idea_to_persona ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idea_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.idea_votes ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para ideias
CREATE POLICY "Usuários podem ver ideias dos seus projetos" 
    ON public.ideas FOR SELECT USING (
        project_id IN (
            SELECT p.id FROM public.projects p
            JOIN public.team_members tm ON p.team_id = tm.team_id
            WHERE tm.user_id = auth.uid()
        )
    );

CREATE POLICY "Usuários podem criar ideias nos seus projetos" 
    ON public.ideas FOR INSERT WITH CHECK (
        project_id IN (
            SELECT p.id FROM public.projects p
            JOIN public.team_members tm ON p.team_id = tm.team_id
            WHERE tm.user_id = auth.uid()
        )
    );

CREATE POLICY "Usuários podem atualizar suas próprias ideias" 
    ON public.ideas FOR UPDATE USING (
        created_by = auth.uid() OR
        project_id IN (
            SELECT p.id FROM public.projects p
            JOIN public.team_members tm ON p.team_id = tm.team_id
            WHERE tm.user_id = auth.uid() 
            AND tm.role IN ('admin', 'owner')
        )
    );

-- Políticas semelhantes para as outras tabelas
CREATE POLICY "Usuários podem ver personas dos seus projetos" 
    ON public.personas FOR SELECT USING (
        project_id IN (
            SELECT p.id FROM public.projects p
            JOIN public.team_members tm ON p.team_id = tm.team_id
            WHERE tm.user_id = auth.uid()
        )
    );

-- +migrate Down
DROP TABLE public.idea_votes;
DROP TABLE public.idea_comments;
DROP TABLE public.idea_to_persona;
DROP TABLE public.idea_to_tag;
DROP TABLE public.idea_tags;
DROP TABLE public.personas;
DROP TABLE public.ideas; 