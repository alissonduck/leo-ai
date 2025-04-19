"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { UserRegistrationData, RegisterUserResult } from "../types";

/**
 * Serviço de servidor para autenticação e registro de usuários
 * Contém as funções relacionadas ao processo de autenticação
 */

/**
 * Registra um novo usuário no Supabase Auth
 * @param userData Dados do usuário a ser registrado
 * @returns Resultado da operação com sucesso ou erro
 */
export async function registerUser(userData: UserRegistrationData): Promise<RegisterUserResult> {
  try {
    const supabase = await createClient();

    // Registrar o usuário no Auth
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.full_name,
        },
      },
    });

    if (error) {
      console.error("Erro ao registrar usuário:", error.message);
      return { 
        success: false, 
        error: error.message 
      };
    }

    // Criar perfil na tabela profiles
    if (data?.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          full_name: userData.full_name,
          created_at: new Date().toISOString(),
        });

      if (profileError) {
        console.error("Erro ao criar perfil:", profileError.message);
        // Ainda retornamos sucesso pois o usuário foi criado
        // Um job pode sincronizar os perfis faltantes depois
        return { 
          success: true, 
          userId: data.user.id,
          error: "Perfil não pôde ser criado completamente" 
        };
      }

      return { 
        success: true, 
        userId: data.user.id 
      };
    }

    return { 
      success: false, 
      error: "Falha ao criar usuário. Tente novamente." 
    };
  } catch (error) {
    console.error("Erro não tratado:", error);
    return { 
      success: false, 
      error: "Erro interno do servidor" 
    };
  }
} 