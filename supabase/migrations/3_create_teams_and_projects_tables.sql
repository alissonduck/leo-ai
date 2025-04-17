-- +migrate Up
-- Tabela de times
CREATE TABLE public.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

COMMENT ON TABLE public.teams IS 'Times de trabalho dentro de uma empresa';

-- Tabela de membros de times
CREATE TABLE public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member', -- 'owner', 'admin', 'member'
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(team_id, user_id)
);

COMMENT ON TABLE public.team_members IS 'Associação entre usuários e times';

-- Tabela de projetos
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'archived', 'completed'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

COMMENT ON TABLE public.projects IS 'Projetos gerenciados por um time';

-- Índices
CREATE INDEX idx_teams_company ON public.teams(company_id);
CREATE INDEX idx_team_members_team ON public.team_members(team_id);
CREATE INDEX idx_team_members_user ON public.team_members(user_id);
CREATE INDEX idx_projects_team ON public.projects(team_id);

-- RLS para times
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem ver times de sua empresa" 
    ON public.teams FOR SELECT USING (
        company_id IN (
            SELECT company_id FROM public.profiles
            WHERE auth.uid() = profiles.id
        )
    );

-- RLS para membros de times
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem ver membros dos seus times" 
    ON public.team_members FOR SELECT USING (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
        )
    );

-- RLS para projetos
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem ver projetos dos seus times" 
    ON public.projects FOR SELECT USING (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
        )
    );
CREATE POLICY "Admins e owners podem editar projetos" 
    ON public.projects FOR UPDATE USING (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
            AND role IN ('admin', 'owner')
        )
    );

-- +migrate Down
DROP TABLE public.projects;
DROP TABLE public.team_members;
DROP TABLE public.teams; 