-- Inserir uma empresa de demonstração
INSERT INTO public.companies (id, name, logo_url, domain, active)
VALUES (
    '00000000-0000-0000-0000-000000000001', 
    'Empresa Demonstração', 
    'https://via.placeholder.com/150', 
    'demo.com',
    true
);

-- Inserir um time na empresa de demonstração
INSERT INTO public.teams (id, company_id, name, description)
VALUES (
    '00000000-0000-0000-0000-000000000001', 
    '00000000-0000-0000-0000-000000000001', 
    'Time Produto', 
    'Time responsável pelo desenvolvimento de produtos'
);

-- Inserir um projeto para o time
INSERT INTO public.projects (id, team_id, name, description, status)
VALUES (
    '00000000-0000-0000-0000-000000000001', 
    '00000000-0000-0000-0000-000000000001', 
    'Projeto Demonstração', 
    'Projeto para demonstração das funcionalidades da plataforma',
    'active'
);

-- Inserir algumas tags para o projeto
INSERT INTO public.idea_tags (id, project_id, name, color)
VALUES 
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'UX', '#FF5733'),
    ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Performance', '#33FF57'),
    ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Feature', '#3357FF');

-- Inserir uma persona para o projeto
INSERT INTO public.personas (id, project_id, name, description)
VALUES (
    '00000000-0000-0000-0000-000000000001', 
    '00000000-0000-0000-0000-000000000001', 
    'Gerente de Produto', 
    '{"idade": "30-45", "dores": ["Dificuldade em organizar ideias", "Problemas de comunicação com o time"], "necessidades": ["Organização", "Visibilidade", "Colaboração"]}'
);

-- Nota: Os usuários reais serão adicionados via sistema de autenticação
-- e depois associados ao time e empresa 