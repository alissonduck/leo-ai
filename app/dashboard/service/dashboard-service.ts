"use client";

import { DashboardResult } from "../types";
import { getDashboardData } from "../server";

/**
 * Serviço que centraliza as operações do dashboard
 * Interface entre o cliente e o servidor
 */

/**
 * Obtém os dados do dashboard
 * @param period Período para filtrar os dados
 * @returns Resultado da operação com dados ou erro
 */
export async function fetchDashboardData(period: string = 'last_week'): Promise<DashboardResult> {
  try {
    const result = await getDashboardData(period);
    return result;
  } catch (error) {
    console.error("Erro no serviço de dashboard:", error);
    return {
      success: false,
      error: "Falha ao buscar dados do dashboard. Tente novamente."
    };
  }
} 