"use client";

import { PasswordResetRequestData, PasswordResetRequestResult, NewPasswordData, UpdatePasswordResult } from "../types";
import { requestPasswordReset, updatePassword } from "../server";

/**
 * Serviço que centraliza as operações de recuperação de senha
 * Interface entre o cliente e o servidor
 */

/**
 * Solicita a recuperação de senha
 * @param data Dados para solicitação de recuperação de senha
 * @returns Resultado da operação
 */
export async function sendPasswordResetRequest(data: PasswordResetRequestData): Promise<PasswordResetRequestResult> {
  try {
    const result = await requestPasswordReset(data);
    return result;
  } catch (error) {
    console.error("Erro no serviço de recuperação de senha:", error);
    return {
      success: false,
      error: "Falha ao processar solicitação. Tente novamente."
    };
  }
}

/**
 * Atualiza a senha do usuário
 * @param data Dados da nova senha
 * @returns Resultado da operação
 */
export async function updateUserPassword(data: NewPasswordData): Promise<UpdatePasswordResult> {
  try {
    const result = await updatePassword(data);
    return result;
  } catch (error) {
    console.error("Erro no serviço de atualização de senha:", error);
    return {
      success: false,
      error: "Falha ao atualizar senha. Tente novamente."
    };
  }
} 