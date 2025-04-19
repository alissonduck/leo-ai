import { redirect } from "next/navigation";
import { getSession } from "./server";
import { Sidebar } from "@/components/ui/sidebar";

/**
 * Layout para as páginas protegidas do dashboard
 * Este layout será compartilhado entre todas as páginas que precisam de autenticação
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verificar se o usuário está autenticado
  const { data: { session } } = await getSession();
  
  // Se não estiver autenticado, redirecionar para o login
  if (!session) {
    redirect("/auth/login");
  }
  
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