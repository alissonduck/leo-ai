-- Altera o tipo da coluna cnpj de INTEGER para TEXT
ALTER TABLE public.companies 
ALTER COLUMN cnpj TYPE TEXT;

COMMENT ON COLUMN public.companies.cnpj IS 'CNPJ da empresa (formato texto para preservar zeros à esquerda)'; 