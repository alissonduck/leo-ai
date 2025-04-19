"use server";

import { createClient } from "@/utils/supabase/server";
import { LoginData, LoginResult } from "../types";

/**
 * Serviço de servidor para autenticação
 * Contém as funções relacionadas ao processo de login
 */

/**
 * Realiza o login do usuário utilizando email e senha
 * @param loginData Dados do usuário para login
 * @returns Resultado da operação com sucesso ou erro
 */
export async function loginWithEmailPassword(loginData: LoginData): Promise<LoginResult> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });

    if (error) {
      console.error("Erro ao realizar login:", error.message);
      let friendlyMessage = "Credenciais inválidas";
      
      // Melhorar as mensagens de erro para o usuário
      if (error.message.includes("Invalid login credentials")) {
        friendlyMessage = "Email ou senha incorretos";
      } else if (error.message.includes("Email not confirmed")) {
        friendlyMessage = "Email não confirmado. Verifique sua caixa de entrada";
      }
      
      return { 
        success: false, 
        error: friendlyMessage
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