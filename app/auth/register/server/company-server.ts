"use server";

import { createClient } from "@/utils/supabase/server";
import { CompanyRegistrationData, RegisterCompanyResult } from "../types";

/**
 * Serviço de servidor para gerenciamento de empresas
 * Contém as funções relacionadas ao processo de registro de empresas
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
  try {
    const supabase = await createClient();

    // Inserir a empresa
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .insert({
        name: companyData.name,
        domain: companyData.domain || null,
        cnpj: companyData.cnpj || null,
      })
      .select()
      .single();

    if (companyError) {
      console.error("Erro ao registrar empresa:", companyError.message);
      return { 
        success: false, 
        error: companyError.message 
      };
    }

    // Atualizar o perfil do usuário com o ID da empresa
    if (company) {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ 
          company_id: company.id,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (profileError) {
        console.error("Erro ao atualizar perfil com empresa:", profileError.message);
        return { 
          success: true, 
          companyId: company.id,
          error: "Empresa criada, mas não foi possível associar ao usuário" 
        };
      }

      return { 
        success: true, 
        companyId: company.id 
      };
    }

    return { 
      success: false, 
      error: "Falha ao criar empresa. Tente novamente." 
    };
  } catch (error) {
    console.error("Erro não tratado:", error);
    return { 
      success: false, 
      error: "Erro interno do servidor" 
    };
  }
} 