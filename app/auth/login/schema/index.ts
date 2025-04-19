import { z } from "zod";

/**
 * Schema para validação do formulário de login
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  password: z
    .string()
    .min(1, "A senha é obrigatória"),
});

/**
 * Tipos derivados dos schemas
 */
export type LoginFormData = z.infer<typeof loginSchema>; 