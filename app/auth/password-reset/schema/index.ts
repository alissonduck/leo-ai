import { z } from "zod";

/**
 * Schema para validação do formulário de solicitação de recuperação de senha
 */
export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
});

/**
 * Schema para validação do formulário de definição de nova senha
 */
export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z
      .string()
      .min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

/**
 * Tipos derivados dos schemas
 */
export type PasswordResetRequestFormData = z.infer<typeof passwordResetRequestSchema>;
export type NewPasswordFormData = z.infer<typeof newPasswordSchema>; 