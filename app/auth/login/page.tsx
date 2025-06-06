import { redirect } from "next/navigation";
import { LoginForm } from "./client";
import { getSession } from "./server/session-server";

/**
 * Página de login
 * Permite que usuários existentes façam login na plataforma
 */
export default async function LoginPage() {
  // Verificar se o usuário já está autenticado
  const { data: { session } } = await getSession();
  
  // Se já estiver autenticado, redirecionar para o dashboard
  if (session) {
    redirect("/dashboard");
  }
  
  return (
    <div className="w-full max-w-md mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold text-gray-900">
          Entre na sua conta
        </h2>
      </div>
      
      <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-100">
        <LoginForm />
      </div>
    </div>
  );
} 