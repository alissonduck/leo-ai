"use server";

import { CompanyRegistrationData, RegisterCompanyResult } from "../types";
import { registerCompany as registerCompanyInServer } from "../server/company-server";

/**
 * Serviço para gerenciamento de empresas
 * Redireciona para implementação no servidor
 */

/**
 * Registra uma nova empresa e associa ao usuário
 * @param companyData Dados da empresa a ser registrada
 * @param userId ID do usuário que está registrando a empresa
 * @returns Resultado da operação com sucesso ou erro
 */
export async function registerCompany(
  companyData: CompanyRegistrationData, 
  userId: string
): Promise<RegisterCompanyResult> {
  return registerCompanyInServer(companyData, userId);
} 