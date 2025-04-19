import { Sidebar } from "@/components/ui/sidebar";

/**
 * Layout para as páginas protegidas do dashboard
 * Este layout será compartilhado entre todas as páginas que precisam de autenticação
 * O middleware já garante que apenas usuários autenticados cheguem aqui.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Barra lateral com navegação */}
      <Sidebar />
      
      {/* Conteúdo principal */}
      <main className="flex-1 overflow-y-auto">
        <div className="py-6 px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 