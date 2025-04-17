import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { RegisterForm } from "./client";
import { ReactQueryProvider } from "@/lib/react-query";

/**
 * Página de registro
 * Contém o formulário multi-etapas para registro de usuários e empresas
 */
export default async function RegisterPage() {
  // Verificar se o usuário já está autenticado
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  // Se já estiver autenticado, redirecionar para o dashboard
  if (session) {
    redirect("/dashboard");
  }
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col items-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Criar sua conta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:text-primary/80"
              >
                Entre aqui
              </Link>
            </p>
          </div>
          
          <div className="mt-8">
            {/* Provedor do React Query */}
            <ReactQueryProvider>
              {/* Formulário de registro */}
              <RegisterForm />
            </ReactQueryProvider>
          </div>
        </div>
      </div>
      
      {/* Banner lateral */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-8 text-center text-white">
            <h1 className="text-4xl font-bold mb-6">
              Bem-vindo à Leo.ai
            </h1>
            <p className="text-xl">
              A plataforma completa para gestão de equipes e ideias
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 