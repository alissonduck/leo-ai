"use client";

import { LoginData, LoginResult } from "../types";
import { loginWithEmailPassword } from "../server";

/**
 * Serviço que centraliza as operações de autenticação
 * Interface entre o cliente e o servidor
 */

/**
 * Realiza o login do usuário
 * @param loginData Dados do usuário para login
 * @returns Resultado da operação com sucesso ou erro
 */
export async function login(loginData: LoginData): Promise<LoginResult> {
  try {
    const result = await loginWithEmailPassword(loginData);
    return result;
  } catch (error) {
    console.error("Erro no serviço de login:", error);
    return {
      success: false,
      error: "Falha ao processar login. Tente novamente."
    };
  }
} 