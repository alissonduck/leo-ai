
# Plano Arquitetural: Projeto Leo.ai

## 1. Análise das Tecnologias Existentes

Analisando o `package.json`, identificamos as seguintes tecnologias já configuradas:

- **Framework**: Next.js 15.3.1 com React 19.0.0 
- **Backend**: Supabase via `@supabase/ssr` e `@supabase/supabase-js`
- **Gerenciamento de Estado**: React Query (TanStack)
- **Formulários**: React Hook Form
- **Validação**: Zod
- **UI**: Componentes Radix UI, TailwindCSS, componentes Shadcn
- **Temas**: next-themes para suporte a temas claro/escuro

## 2. Estrutura de Diretórios

Seguindo as regras do `arquitetura.mdc`, implementaremos a seguinte estrutura:

```
leo-ai/
├─ app/                      # Diretório principal da aplicação Next.js
│  ├─ (auth)/                # Grupo de autenticação
│  │  ├─ login/              # Página de login
│  │  └─ register/           # Página de registro
│  ├─ api/                   # Rotas de API
│  ├─ dashboard/             # Dashboard principal
│  └─ [feature]/             # Para cada módulo da aplicação
│     ├─ client/             # Componentes client-side específicos do módulo
│     ├─ hooks/              # Hooks React específicos do módulo
│     ├─ schema/             # Schemas de validação Zod
│     ├─ server/             # Componentes server-side específicos do módulo
│     ├─ service/            # Lógica de negócio e interações com banco de dados
│     └─ types/              # Tipos TypeScript específicos do módulo
├─ components/               # Componentes compartilhados
│  ├─ ui/                    # Componentes UI do Shadcn
│  └─ [feature]/             # Componentes específicos por funcionalidade
├─ lib/                      # Utilitários e configurações
│  └─ supabase/              # Configuração do cliente Supabase
├─ utils/                    # Funções utilitárias
├─ supabase/                 # Configurações do Supabase
│  ├─ migrations/            # Migrações do banco de dados
│  └─ seed/                  # Dados iniciais
└─ public/                   # Arquivos estáticos
```

## 3. Módulos da Aplicação (features)

Implementaremos cada módulo como diretório separado seguindo a arquitetura proposta:

1. **ideas/** - Problema ou Ideia Mapeada
   - Registro e gerenciamento de ideias/problemas
   - Banco colaborativo de ideias
   - Assistente de IA para ideação

2. **discovery/** - Descoberta e Validação
   - Planejamento de pesquisas
   - Captura de dados e evidências
   - Análise de feedback com IA

3. **planning/** - Planejamento e Estratégia
   - Visão do produto e objetivos
   - Roadmap e priorização
   - Backlog de funcionalidades

4. **design/** - Design e Prototipação
   - Biblioteca de wireframes/protótipos
   - Mapeamento de fluxos de usuário
   - Integração com ferramentas de design

5. **development/** - Desenvolvimento Ágil
   - Backlog de tarefas
   - Quadro de sprints (ou ciclos Shape Up)
   - Métricas de acompanhamento

6. **release/** - Comunicação, Documentação e Lançamento
   - Central de documentação
   - Geração de notas e anúncios
   - Checklist de lançamento

7. **analytics/** - Análise e Aprendizado Contínuo
   - Dashboard de métricas
   - Feedback centralizado
   - Insights automatizados

8. **integrations/** - Integrações com Ferramentas Externas
   - Configuração e gestão de integrações
   - Webhooks e APIs

## 4. Arquitetura de Backend (Supabase)

### 4.1 Estrutura de Banco de Dados

Seguindo o `database.md` e as práticas do `database.mdc`, implementaremos:

```
supabase/
├─ migrations/
│  ├─ 202407010001_create_auth_tables.sql
│  ├─ 202407010002_create_teams_tables.sql
│  ├─ 202407010003_create_projects_tables.sql
│  ├─ 202407010004_create_ideas_tables.sql
│  ├─ 202407010005_create_discovery_tables.sql
│  └─ ...outras migrações organizadas por módulo
└─ seed/
   └─ initial_data.sql
```

### 4.2 Principais Tabelas e Relações

A estrutura seguirá o esquema definido em `database.md`:

- **Usuários e Times**:
  - `companies` (empresa cadastrada)
  - `users` (gerenciado pelo Supabase Auth)
  - `profiles`
  - `teams`
  - `team_members`
  - `projects`

- **Por Módulo**:
  - `ideas`, `research_records`, `personas`
  - `features`, `objectives`
  - `designs`, `comments`
  - `tasks`, `sprints`
  - `documents`, `releases`, `checklists`
  - `feedback`, `events`
  - `integrations`, `webhooks`

### 4.3 Segurança e RLS

Implementaremos políticas de Row Level Security para cada tabela, como:

```sql
-- Exemplo para tabela projects
CREATE POLICY "Usuários acessam apenas projetos de seus times"
ON public.projects FOR ALL
USING (team_id IN (
  SELECT team_id FROM team_members 
  WHERE user_id = auth.uid()
));
```

## 5. Arquitetura de Frontend

### 5.1 Server Components vs Client Components

Seguindo a arquitetura.mdc, utilizaremos:

- **Server Components (RSC)** para:
  - Busca de dados iniciais
  - Renderização de páginas
  - Operações de autenticação
  - Componentes que não precisam de interatividade

- **Client Components** para:
  - Componentes interativos
  - Formulários
  - Componentes com estado local
  - Interações dinâmicas

### 5.2 Estrutura de Autenticação

```typescript
// app/(auth)/layout.tsx - Server Component
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
}

// app/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data } = await supabase.auth.getSession();
  
  // Redirecionar usuários não autenticados para login
  if (!data.session && !req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return res;
}
```

### 5.3 Gerenciamento de Estado e Dados

Utilizaremos React Query para gerenciamento de estado do servidor:

```typescript
// lib/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { ReactNode, useState } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

## 6. Camada de Serviços

### 6.1 Estrutura de Serviços

Para cada módulo, criaremos serviços que abstraem a interação com Supabase:

```typescript
// app/ideas/service/ideas-service.ts
import { supabase } from '@/lib/supabase/server';
import { IdeaSchema } from '../schema/idea-schema';
import type { Idea, IdeaInput } from '../types';

export async function getIdeas(projectId: string): Promise<Idea[]> {
  const { data, error } = await supabase
    .from('ideas')
    .select('id, title, description, status, created_at, created_by')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });
    
  if (error) throw new Error(`Erro ao buscar ideias: ${error.message}`);
  return data;
}

export async function createIdea(idea: IdeaInput): Promise<Idea> {
  // Validação com Zod
  const validatedData = IdeaSchema.parse(idea);
  
  const { data, error } = await supabase
    .from('ideas')
    .insert(validatedData)
    .select()
    .single();
    
  if (error) throw new Error(`Erro ao criar ideia: ${error.message}`);
  return data;
}

// ... outros métodos
```

### 6.2 Integração com OpenAI

```typescript
// lib/ai/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateIdeasSuggestions(description: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Você é um assistente especializado em gestão de produtos"
        },
        {
          role: "user",
          content: `Analise esta descrição de ideia e sugira melhorias: ${description}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });
    
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao gerar sugestões:', error);
    throw new Error('Falha ao gerar sugestões com IA');
  }
}
```

## 7. Implementação de Server Actions

```typescript
// app/ideas/server/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { createIdea, updateIdea, deleteIdea } from '../service/ideas-service';
import type { IdeaInput } from '../types';

export async function createIdeaAction(formData: FormData) {
  try {
    const ideaData: IdeaInput = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      project_id: formData.get('project_id') as string,
      status: 'new',
    };
    
    await createIdea(ideaData);
    revalidatePath('/ideas');
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    };
  }
}

// ... outras actions
```

## 8. Componentes UI Reutilizáveis

Utilizaremos a estrutura do Shadcn UI:

```typescript
// components/ui/button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Componente Button
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

## 9. Fluxo de Autenticação e Autorização

```typescript
// app/(auth)/login/page.tsx
import { createServerComponentClient } from '@supabase/ssr';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { LoginForm } from './client/login-form';

export default async function Login() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  
  if (data.session) {
    redirect('/dashboard');
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Login</h1>
      <LoginForm />
    </div>
  );
}

// app/(auth)/login/client/login-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createBrowserClient } from '@supabase/ssr';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginValues = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
  });
  
  const onSubmit = async (data: LoginValues) => {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) throw error;
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="bg-red-100 p-3 text-red-700 rounded">{error}</div>}
      
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" {...register('email')} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      
      <div>
        <label htmlFor="password">Senha</label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
}
```

## 10. Migração do Banco de Dados

Seguindo o padrão definido em `database.mdc`, criaremos as migrations SQL:

```sql
-- supabase/migrations/202407010001_create_auth_tables.sql
-- +migrate Up
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    avatar_url TEXT,
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

-- +migrate Down
DROP TABLE public.profiles;
```

## 11. Integrações com APIs Externas

```typescript
// app/integrations/service/integration-service.ts
import { supabase } from '@/lib/supabase/server';
import { encrypt, decrypt } from '@/utils/crypto';

export async function saveIntegration(
  projectId: string, 
  service: string, 
  config: Record<string, string>
) {
  // Criptografa tokens e chaves sensíveis
  const encryptedConfig = Object.entries(config).reduce((acc, [key, value]) => {
    acc[key] = key.includes('token') || key.includes('key') ? 
      encrypt(value) : value;
    return acc;
  }, {} as Record<string, string>);
  
  const { data, error } = await supabase
    .from('integrations')
    .insert({
      project_id: projectId,
      service,
      config: encryptedConfig
    })
    .select()
    .single();
    
  if (error) throw new Error(`Erro ao salvar integração: ${error.message}`);
  return data;
}

export async function getIntegration(projectId: string, service: string) {
  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('project_id', projectId)
    .eq('service', service)
    .single();
    
  if (error) return null;
  
  // Descriptografa tokens e chaves
  if (data.config) {
    Object.keys(data.config).forEach(key => {
      if (key.includes('token') || key.includes('key')) {
        data.config[key] = decrypt(data.config[key]);
      }
    });
  }
  
  return data;
}
```

## 12. Próximos Passos de Implementação

1. **Fase 1: Configuração Inicial**
   - Configurar banco de dados Supabase
   - Implementar autenticação básica
   - Criar estrutura de pastas
   - Configurar estilos e componentes base

2. **Fase 2: Funcionalidades Core**
   - Implementar gerenciamento de usuários e times
   - Desenvolver módulo de ideias
   - Criar interface de dashboard principal

3. **Fase 3: Expansão por Módulos**
   - Implementar módulos restantes em ordem de prioridade
   - Integrar funcionalidades de IA
   - Desenvolver integrações com ferramentas externas

4. **Fase 4: Refinamento e Otimização**
   - Melhorar UX/UI
   - Otimizar performance
   - Implementar testes
   - Preparar para deploy de produção

Este plano arquitetural segue as melhores práticas de desenvolvimento com Next.js e Supabase, aderindo aos padrões especificados nos documentos de referência.