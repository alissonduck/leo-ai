import { z } from 'zod';
import { ChangePasswordSchema } from '../schema/change-password-schema';

/**
 * Tipo inferido do schema Zod para os dados do formulário de alteração de senha.
 * Contém currentPassword, newPassword e confirmPassword.
 */
export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

/**
 * Tipo para a resposta do serviço de alteração de senha.
 */
export interface ChangePasswordResponse {
  success: boolean;
  message?: string;
} 