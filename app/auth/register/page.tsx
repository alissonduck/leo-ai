import Link from "next/link";
import { redirect } from "next/navigation";
import { RegisterForm } from "./client";
import { checkRegistrationStatus } from "./service"; // Importar o novo serviço

/**
 * Página de registro
 * Contém o formulário multi-etapas para registro de usuários e empresas
 */
export default async function RegisterPage() {
  // Verificar status de autenticação e registro usando o serviço/Server Action
  const { isAuthenticated, isRegistrationComplete } = await checkRegistrationStatus();
  
  // Se autenticado E o registro estiver completo (Step 2 feito), redirecionar
  if (isAuthenticated && isRegistrationComplete) {
    redirect("/dashboard");
  }
  
  // Se isAuthenticated for true mas isRegistrationComplete for false,
  // significa que o Step 1 foi feito, mas o Step 2 não.
  // A página será renderizada normalmente, permitindo que o RegisterForm
  // (no lado do cliente) mostre o Step 2.

  // Renderiza a página se não houver sessão ou se o registro não estiver completo
  return (
    <div className="w-full max-w-md mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-extrabold text-gray-900">
          Crie sua conta na Leo.ai
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Entre aqui
          </Link>
        </p>
      </div>
      
      <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-100">
        <RegisterForm />
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Ao se cadastrar, você concorda com nossos{" "}
          <Link href="/terms" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Termos de Serviço
          </Link>{" "}
          e{" "}
          <Link href="/privacy" className="font-medium text-primary hover:text-primary/80 transition-colors">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  );
} 