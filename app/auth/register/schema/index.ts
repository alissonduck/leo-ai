import { z } from "zod";

/**
 * Schema para validação do formulário de registro de usuário
 */
export const userRegistrationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O e-mail é obrigatório" })
    .email({ message: "Formato de e-mail inválido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  confirmPassword: z
    .string()
    .min(8, { message: "A confirmação de senha deve ter pelo menos 8 caracteres" }),
  full_name: z
    .string()
    .min(3, { message: "O nome completo deve ter pelo menos 3 caracteres" }),
  phone: z
    .string()
    .regex(/^(\(\d{2}\)\s?)?\d{4,5}-?\d{4}$|^\d{10,11}$/, {
      message: "Telefone inválido (use (XX) XXXX-XXXX, (XX) XXXXX-XXXX ou apenas números)",
    })
    .optional()
    .transform(val => val ? val.replace(/\D/g, '') : val),
})
.refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

/**
 * Schema para validação do formulário de registro de empresa
 */
export const companyRegistrationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome da empresa deve ter pelo menos 2 caracteres" }),
  domain: z
    .string()
    .optional(),
  cnpj: z
    .string()
    .regex(/^\d{14}$/, { message: "CNPJ deve conter 14 dígitos numéricos" })
    .optional(),
});

/**
 * Tipos derivados dos schemas
 */
export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>;
export type CompanyRegistrationFormData = z.infer<typeof companyRegistrationSchema>; 