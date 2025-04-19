"use server";

import { createClient } from "@/utils/supabase/server";

/**
 * Interface para o resultado da verificação de status
 */
interface RegistrationStatus {
  isAuthenticated: boolean;
  isRegistrationComplete: boolean;
}

/**
 * Server Action para verificar se o usuário está autenticado
 * e se o processo de registro (associação com empresa) foi concluído.
 * @returns Objeto com o status da autenticação e do registro.
 */
export async function checkRegistrationStatus(): Promise<RegistrationStatus> {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    // Se não há sessão, não está autenticado nem completo
    if (!session) {
      return { isAuthenticated: false, isRegistrationComplete: false };
    }

    // Se há sessão, verificar se o perfil tem company_id
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('company_id')
      .eq('id', session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Erro ao buscar perfil para verificar status de registro:", error.message);
      // Em caso de erro na busca do perfil, assume que o registro não está completo
      // mas o usuário está autenticado.
      return { isAuthenticated: true, isRegistrationComplete: false };
    }

    // Retorna autenticado e se o registro está completo (tem company_id)
    return {
      isAuthenticated: true,
      isRegistrationComplete: !!profile?.company_id,
    };

  } catch (error) {
    console.error("Erro inesperado em checkRegistrationStatus:", error);
    // Em caso de erro geral, assume não autenticado por segurança
    return { isAuthenticated: false, isRegistrationComplete: false };
  }
} 