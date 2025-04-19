"use server";

import { UserRegistrationData, RegisterUserResult } from "../types";
import { registerUser as registerUserInServer } from "../server/auth-server";

/**
 * Serviço para autenticação e registro de usuários
 * Redireciona para implementação no servidor
 */

/**
 * Registra um novo usuário no Supabase Auth
 * @param userData Dados do usuário a ser registrado
 * @returns Resultado da operação com sucesso ou erro
 */
export async function registerUser(userData: UserRegistrationData): Promise<RegisterUserResult> {
  return registerUserInServer(userData);
} 