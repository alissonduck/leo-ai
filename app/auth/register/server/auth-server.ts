"use server";

import { createClient } from "@/utils/supabase/server";
import { UserRegistrationData, RegisterUserResult } from "../types";

/**
 * Serviço de servidor para autenticação e registro de usuários
 * Contém as funções relacionadas ao processo de autenticação
 */

/**
 * Registra um novo usuário no Supabase Auth e cria seu perfil
 * @param userData Dados do usuário a ser registrado (inclui email, senha, nome e telefone opcional)
 * @returns Resultado da operação com sucesso ou erro
 */
export async function registerUser(userData: UserRegistrationData): Promise<RegisterUserResult> {
  try {
    const supabase = await createClient();

    // Registrar o usuário no Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        // Não passamos mais o full_name aqui, ele vai direto no profile
      },
    });

    if (authError) {
      console.error("Erro ao registrar usuário no Auth:", authError.message);
      // Simplificar mensagem de erro para o usuário
      const userFriendlyError = authError.message.includes("User already registered")
        ? "Este e-mail já está cadastrado."
        : "Falha ao registrar usuário. Verifique os dados e tente novamente.";
      return { 
        success: false, 
        error: userFriendlyError 
      };
    }

    // Criar perfil na tabela profiles somente se o signUp foi bem-sucedido
    if (authData?.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id, // Usar o ID retornado pelo signUp
          email: userData.email, // Salvar email no perfil
          full_name: userData.full_name,
          phone: userData.phone, // Salvar telefone no perfil (será null se não fornecido)
          created_at: new Date().toISOString(),
        });

      if (profileError) {
        console.error("Erro crítico ao criar perfil após signUp:", profileError.message);
        // Considerar isso um erro grave, pois o usuário existe no Auth mas não no Profiles
        // Idealmente, teríamos um mecanismo de retry ou alerta aqui.
        // Por ora, retornamos um erro mais específico.
        return { 
          success: false, 
          error: "Falha ao finalizar a criação do perfil. Contate o suporte." 
          // Não retornamos userId aqui, pois o processo não foi completo
        };
      }

      // Sucesso completo
      return { 
        success: true, 
        userId: authData.user.id
      };
    }

    // Caso inesperado onde authData.user não existe mesmo sem authError
    console.error("Registro de usuário: authData.user não encontrado após signUp sem erro.");
    return { 
      success: false, 
      error: "Falha inesperada durante o registro. Tente novamente." 
    };

  } catch (error) {
    console.error("Erro não tratado em registerUser:", error);
    return { 
      success: false, 
      error: "Erro interno do servidor ao tentar registrar." 
    };
  }
} 