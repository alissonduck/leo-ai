"use server";

import { createClient } from "@/utils/supabase/server";
import { DashboardResult } from "../types";

/**
 * Serviço de servidor para o dashboard
 * Contém as funções relacionadas ao dashboard
 */

/**
 * Obtém os dados do dashboard
 * @param period Período para filtrar os dados
 * @returns Resultado da operação com dados ou erro
 */
export async function getDashboardData(period: string = 'last_week'): Promise<DashboardResult> {
  try {
    const supabase = await createClient();

    // Buscar dados do usuário autenticado
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { 
        success: false, 
        error: "Usuário não autenticado" 
      };
    }

    // Buscar perfil do usuário
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, full_name, company_id")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Erro ao obter perfil:", profileError.message);
      return { 
        success: false, 
        error: "Falha ao carregar perfil do usuário" 
      };
    }

    // Normalmente aqui buscaríamos dados reais do banco
    // Para fins de demonstração, estamos usando dados mock
    
    // Simulação de diferentes valores com base no período
    let multiplier = 1;
    switch (period) {
      case 'today':
        multiplier = 0.2;
        break;
      case 'yesterday':
        multiplier = 0.3;
        break;
      case 'last_week':
        multiplier = 1;
        break;
      case 'last_month':
        multiplier = 4.5;
        break;
      case 'last_year':
        multiplier = 52;
        break;
    }

    // Dados estáticos do dashboard para demonstração
    const mockDashboardData = {
      stats: {
        totalRevenue: 2600000 * multiplier,
        averageOrderValue: 455,
        ticketsSold: 5888 * multiplier,
        pageviews: 823067 * multiplier
      },
      recentOrders: [
        {
          id: "1",
          orderNumber: "3000",
          purchaseDate: "2024-05-09T10:00:00.000Z",
          customer: { name: "Leslie Alexander" },
          eventName: "Bear Hug: Live in Concert",
          eventId: "event-1",
          amount: 8000
        },
        {
          id: "2",
          orderNumber: "3001",
          purchaseDate: "2024-05-05T14:30:00.000Z",
          customer: { name: "Michael Foster" },
          eventName: "Six Fingers — DJ Set",
          eventId: "event-2",
          amount: 29900
        },
        {
          id: "3",
          orderNumber: "3002",
          purchaseDate: "2024-04-28T09:15:00.000Z",
          customer: { name: "Dries Vincent" },
          eventName: "We All Look The Same",
          eventId: "event-3",
          amount: 15000
        },
        {
          id: "4",
          orderNumber: "3003",
          purchaseDate: "2024-04-23T16:45:00.000Z",
          customer: { name: "Lindsay Walton" },
          eventName: "Bear Hug: Live in Concert",
          eventId: "event-1",
          amount: 8000
        },
        {
          id: "5",
          orderNumber: "3004",
          purchaseDate: "2024-04-18T11:20:00.000Z",
          customer: { name: "Courtney Henry" },
          eventName: "Viking People",
          eventId: "event-4",
          amount: 11499
        }
      ],
      user: {
        name: profile.full_name
      }
    };

    return { 
      success: true, 
      data: mockDashboardData
    };
  } catch (error) {
    console.error("Erro não tratado:", error);
    return { 
      success: false, 
      error: "Erro interno do servidor" 
    };
  }
}

/**
 * Verifica a sessão atual do usuário
 * @returns Objeto com a sessão do usuário
 */
export async function getSession() {
  const supabase = await createClient();
  return await supabase.auth.getSession();
} 