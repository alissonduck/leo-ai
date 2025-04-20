import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react'; // Ícone para indicar "não encontrado"

/**
 * Página customizada para a rota /404.
 * Exibe uma mensagem amigável e um link para voltar ao Dashboard.
 * Nota: Para um manipulador global 404, crie app/not-found.tsx.
 */
export default function Custom404Page() {
  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center text-center px-4">
      {/* Ícone */}
      <SearchX className="h-16 w-16 text-slate-400 mb-6" strokeWidth={1.5} />

      {/* Título */}
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Página não encontrada
      </h1>

      {/* Descrição */}
      <p className="mt-4 text-base text-slate-600">
        Desculpe, não conseguimos encontrar a página que você está procurando.
      </p>

      {/* Botão para voltar */}
      <div className="mt-8">
        <Button asChild>
          <Link href="/dashboard">Voltar ao Dashboard</Link>
        </Button>
      </div>
    </div>
  );
} 