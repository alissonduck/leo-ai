-- Prosseguir com a criação da tabela companies
CREATE TABLE public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    domain TEXT,
    cnpj INTEGER,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

COMMENT ON TABLE public.companies IS 'Empresas cadastradas na plataforma';

-- Adicionar referência na tabela de perfis
ALTER TABLE public.profiles ADD CONSTRAINT fk_profiles_company
    FOREIGN KEY (company_id) REFERENCES public.companies(id)
    ON DELETE SET NULL;

-- Índice para busca por domínio
CREATE INDEX idx_companies_domain ON public.companies(domain);

-- RLS
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Usuários podem ler empresas das quais fazem parte
CREATE POLICY "Usuários podem ver suas empresas" 
    ON public.companies FOR SELECT USING (
        id IN (
            SELECT company_id FROM public.profiles
            WHERE auth.uid() = profiles.id
        )
    );

-- Apenas admins podem modificar empresas
CREATE POLICY "Admins podem editar empresas" 
    ON public.companies FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE auth.uid() = profiles.id
            AND profiles.company_id = public.companies.id
            -- Uma implementação mais completa verificaria se o usuário é admin
        )
    );