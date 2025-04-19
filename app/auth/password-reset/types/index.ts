/**
 * Tipos para o formulário de recuperação de senha
 */

/**
 * Representa os dados para solicitar a recuperação de senha
 */
export interface PasswordResetRequestData {
  email: string;
}

/**
 * Representa os dados para definir uma nova senha
 */
export interface NewPasswordData {
  password: string;
  confirmPassword: string;
}

/**
 * Resultado da operação de solicitação de recuperação de senha
 */
export interface PasswordResetRequestResult {
  success: boolean;
  error?: string;
}

/**
 * Resultado da operação de definição de nova senha
 */
export interface UpdatePasswordResult {
  success: boolean;
  error?: string;
} 