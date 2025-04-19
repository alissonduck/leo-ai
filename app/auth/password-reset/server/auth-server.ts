"use server";

import { createClient } from "@/utils/supabase/server";
import { PasswordResetRequestData, PasswordResetRequestResult, NewPasswordData, UpdatePasswordResult } from "../types";

/**
 * Serviço de servidor para recuperação de senha
 * Contém as funções relacionadas ao processo de recuperação de senha
 */

/**
 * Solicita recuperação de senha através do email
 * @param data Dados do usuário para recuperação de senha
 * @returns Resultado da operação com sucesso ou erro
 */
export async function requestPasswordReset(data: PasswordResetRequestData): Promise<PasswordResetRequestResult> {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/password-reset/update`,
    });

    if (error) {
      console.error("Erro ao solicitar recuperação de senha:", error.message);
      return { 
        success: false, 
        error: "Não foi possível processar a solicitação. Verifique o email e tente novamente."
      };
    }

    return { 
      success: true 
    };
  } catch (error) {
    console.error("Erro não tratado:", error);
    return { 
      success: false, 
      error: "Erro interno do servidor" 
    };
  }
}

/**
 * Atualiza a senha do usuário
 * @param data Dados da nova senha
 * @returns Resultado da operação com sucesso ou erro
 */
export async function updatePassword(data: NewPasswordData): Promise<UpdatePasswordResult> {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      console.error("Erro ao atualizar senha:", error.message);
      return { 
        success: false, 
        error: "Não foi possível atualizar sua senha. O link pode ter expirado."
      };
    }

    return { 
      success: true 
    };
  } catch (error) {
    console.error("Erro não tratado:", error);
    return { 
      success: false, 
      error: "Erro interno do servidor" 
    };
  }
}

/**
 * Verifica a sessão atual do usuário
 * @returns Objeto com a sessão do usuário
 */
export async function getSession() {
  const supabase = await createClient();
  return await supabase.auth.getSession();
} 