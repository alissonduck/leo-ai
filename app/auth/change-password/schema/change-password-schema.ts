import { z } from 'zod';

/**
 * Schema de validação Zod para o formulário de alteração de senha.
 * 
 * Validações:
 * - currentPassword: obrigatório, mínimo 8 caracteres.
 * - newPassword: obrigatório, mínimo 8 caracteres.
 * - confirmPassword: obrigatório, mínimo 8 caracteres.
 * - Refinamento 1: newPassword e confirmPassword devem ser iguais.
 * - Refinamento 2: newPassword deve ser diferente de currentPassword.
 */
export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: 'Senha atual é obrigatória' }).min(8, { message: 'Senha atual deve ter no mínimo 8 caracteres' }),
  newPassword: z.string().min(1, { message: 'Nova senha é obrigatória' }).min(8, { message: 'Nova senha deve ter no mínimo 8 caracteres' }),
  confirmPassword: z.string().min(1, { message: 'Confirmação da nova senha é obrigatória' }).min(8, { message: 'Confirmação deve ter no mínimo 8 caracteres' }),
})
.refine((data) => data.newPassword === data.confirmPassword, {
  message: 'As novas senhas não coincidem',
  path: ['confirmPassword'], // Indica qual campo receberá a mensagem de erro
})
.refine((data) => data.newPassword !== data.currentPassword, {
    message: 'A nova senha deve ser diferente da senha atual',
    path: ['newPassword'], // Indica qual campo receberá a mensagem de erro
}); 