/**
 * Tipos para o formulário de registro
 */

/**
 * Representa os dados do usuário que será registrado
 */
export interface UserRegistrationData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
}

/**
 * Representa os dados da empresa que será registrada
 */
export interface CompanyRegistrationData {
  name: string;
  domain?: string;
  cnpj?: string;
}

/**
 * Estado completo do formulário de registro
 */
export interface RegisterFormState {
  user: UserRegistrationData;
  company: CompanyRegistrationData;
  currentStep: number;
  totalSteps: number;
}

/**
 * Resultado do registro do usuário
 */
export interface RegisterUserResult {
  success: boolean;
  userId?: string;
  error?: string;
}

/**
 * Resultado do registro da empresa
 */
export interface RegisterCompanyResult {
  success: boolean;
  companyId?: string;
  error?: string;
} 