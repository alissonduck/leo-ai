import Link from "next/link";
import { redirect } from "next/navigation";
import { RegisterForm } from "./client";
import { ReactQueryProvider } from "@/lib/react-query";
import { getSession } from "./server";

/**
 * Página de registro
 * Contém o formulário multi-etapas para registro de usuários e empresas
 */
export default async function RegisterPage() {
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
        <ReactQueryProvider>
          <RegisterForm />
        </ReactQueryProvider>
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