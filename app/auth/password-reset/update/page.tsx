import { redirect } from "next/navigation";
import { UpdatePasswordForm } from "../client";
import { getSession } from "../server";

/**
 * Página de atualização de senha
 * Permite que usuários definam uma nova senha após o processo de recuperação
 */
export default async function UpdatePasswordPage() {
  // Verificamos se o usuário está autenticado pelo token na URL
  const { data: { session } } = await getSession();
  
  // Se não houver sessão, redirecionar para o login
  // (isso ocorre se tentar acessar diretamente sem o token na URL)
  if (!session) {
    redirect("/auth/login");
  }
  
  return (
    <div className="w-full max-w-md mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold text-gray-900">
          Definir nova senha
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Crie uma nova senha segura para sua conta
        </p>
      </div>
      
      <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-100">
        <UpdatePasswordForm />
      </div>
    </div>
  );
} 