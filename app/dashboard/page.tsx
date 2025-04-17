import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = await createClient();
  
  // Verificar autenticação
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect("/login");
  }
  
  // Buscar perfil do usuário
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();
  
  // Buscar empresas do usuário
  const { data: companies } = await supabase
    .from("companies")
    .select("*")
    .order("name");
  
  async function signOut() {
    "use server";
    
    const cookieStore = cookies();
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Leo.ai</h1>
          <form action={signOut}>
            <Button variant="outline" size="sm">Sair</Button>
          </form>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">
                Bem-vindo, {profile?.full_name || session.user.email}
              </h2>
              
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  Empresas
                </h3>
                
                {companies && companies.length > 0 ? (
                  <div className="space-y-4">
                    {companies.map((company) => (
                      <div key={company.id} className="p-4 border rounded-md">
                        <div className="font-medium">{company.name}</div>
                        {company.domain && (
                          <div className="text-sm text-gray-600">
                            {company.domain}
                          </div>
                        )}
                        <Link 
                          href={`/companies/${company.id}`}
                          className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                        >
                          Acessar empresa
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">
                    Nenhuma empresa registrada.
                  </div>
                )}
                
                <div className="mt-6">
                  <Link 
                    href="/companies/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Nova empresa
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 