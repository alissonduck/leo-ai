-- +migrate Up
-- Tabela de perfis (estendendo tabela de auth)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    company_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

COMMENT ON TABLE public.profiles IS 'Perfis de usuários estendendo a tabela de auth';

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Usuários podem ver perfis públicos" 
    ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Usuários podem editar seus próprios perfis" 
    ON public.profiles FOR UPDATE USING (auth.uid() = id);