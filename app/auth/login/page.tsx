import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { LoginForm } from "./client/login-form";

export default async function LoginPage() {
  const cookieStore = cookies();
  const supabase = await createClient();

  const { data } = await supabase.auth.getSession();
  
  // Se o usuário já estiver autenticado, redireciona para o dashboard
  if (data.session) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Entrar</h2>
        <p className="text-sm text-gray-500 mt-1">
          Digite suas credenciais para acessar a plataforma
        </p>
      </div>
      
      <LoginForm />
      
      <div className="text-center text-sm">
        <p>
          Não tem uma conta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
} 