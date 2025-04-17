import { z } from "zod";

/**
 * Schema para validação do formulário de registro de usuário
 */
export const userRegistrationSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
  full_name: z
    .string()
    .min(3, "O nome completo deve ter pelo menos 3 caracteres"),
});

/**
 * Schema para validação do formulário de registro de empresa
 */
export const companyRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, "O nome da empresa deve ter pelo menos 2 caracteres"),
  domain: z
    .string()
    .optional(),
  description: z
    .string()
    .optional(),
});

/**
 * Tipos derivados dos schemas
 */
export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>;
export type CompanyRegistrationFormData = z.infer<typeof companyRegistrationSchema>; 