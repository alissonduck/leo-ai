/**
 * Tipos para o formulário de login
 */

/**
 * Representa os dados do usuário para login
 */
export interface LoginData {
  email: string;
  password: string;
}

/**
 * Resultado do login do usuário
 */
export interface LoginResult {
  success: boolean;
  error?: string;
} 