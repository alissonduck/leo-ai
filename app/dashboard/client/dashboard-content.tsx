"use client";

import { useDashboard } from "../hooks";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "./stat-card";
import { RecentOrders } from "./recent-orders";
import { DollarSign, Users, ShoppingBag, BarChart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/app/auth/utils/providers";

/**
 * Formata um valor monetário para exibição
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100);
}

/**
 * Componente principal do dashboard
 * Exibe o cabeçalho, estatísticas e tabela de pedidos recentes
 */
export function DashboardContent() {
  // Usar o hook para obter os dados do dashboard
  const { 
    data, 
    isLoading, 
    error, 
    period, 
    changePeriod 
  } = useDashboard();
  
  // Obter a função de logout do contexto de autenticação
  const { logout } = useAuthContext();
  
  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-md text-red-800 border border-red-200 flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold mb-2">Erro ao carregar o dashboard</h3>
        <p className="mb-4 text-sm">{String(error)}</p>
        <Button 
          variant="destructive"
          onClick={logout}
          className="mt-2"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Fazer Logout
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <PageHeader
        title="Dashboard"
        userName={data?.user.name}
        period={period}
        onPeriodChange={changePeriod}
      />
      
      <h2 className="text-base font-semibold leading-6 text-slate-900 mb-4">
        Visão Geral
      </h2>
      
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Receita total"
              value={formatCurrency(data.stats.totalRevenue / 100)}
              changePercent={4.5}
              changeText="comparado à semana anterior"
              icon={<DollarSign className="h-8 w-8 text-slate-400" />}
            />
            <StatCard
              title="Valor médio do pedido"
              value={formatCurrency(data.stats.averageOrderValue / 100)}
              changePercent={-0.5}
              changeText="comparado à semana anterior"
              icon={<ShoppingBag className="h-8 w-8 text-slate-400" />}
            />
            <StatCard
              title="Ingressos vendidos"
              value={data.stats.ticketsSold.toLocaleString('pt-BR')}
              changePercent={4.5}
              changeText="comparado à semana anterior"
              icon={<Users className="h-8 w-8 text-slate-400" />}
            />
            <StatCard
              title="Visualizações de página"
              value={data.stats.pageviews.toLocaleString('pt-BR')}
              changePercent={21.2}
              changeText="comparado à semana anterior"
              icon={<BarChart className="h-8 w-8 text-slate-400" />}
            />
          </div>
          
          <RecentOrders 
            orders={data.recentOrders} 
            isLoading={isLoading} 
          />
        </>
      ) : null}
    </>
  );
} 