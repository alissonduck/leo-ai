/**
 * Tipos para o dashboard
 */

/**
 * Representa as estatísticas do usuário/empresa
 */
export interface DashboardStats {
  totalRevenue: number;
  averageOrderValue: number;
  ticketsSold: number;
  pageviews: number;
}

/**
 * Representa os dados de um pedido recente
 */
export interface RecentOrder {
  id: string;
  orderNumber: string;
  purchaseDate: string;
  customer: {
    name: string;
  };
  eventName: string;
  eventId: string;
  amount: number;
}

/**
 * Resposta da API com os dados do dashboard
 */
export interface DashboardData {
  stats: DashboardStats;
  recentOrders: RecentOrder[];
  user: {
    name: string;
  };
}

/**
 * Resultado da operação de busca dos dados do dashboard
 */
export interface DashboardResult {
  success: boolean;
  data?: DashboardData;
  error?: string;
} 