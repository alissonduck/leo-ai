import { redirect } from "next/navigation";
import { PasswordResetForm } from "./client";
import { getSession } from "./server";

/**
 * Página de solicitação de recuperação de senha
 * Permite que usuários solicitem redefinição de senha
 */
export default async function PasswordResetPage() {
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
          Recuperação de senha
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Digite seu email para receber instruções de recuperação de senha
        </p>
      </div>
      
      <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-100">
        <PasswordResetForm />
      </div>
    </div>
  );
}
