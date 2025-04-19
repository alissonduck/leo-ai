"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "../service";
import { DashboardData } from "../types";

/**
 * Hook para gerenciar os dados do dashboard
 * @returns Estado e funções para manipular os dados do dashboard
 */
export function useDashboard() {
  const [period, setPeriod] = useState<string>("last_week");
  
  // Usar React Query para buscar e cachear os dados
  const { 
    data, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['dashboard', period],
    queryFn: () => fetchDashboardData(period),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const dashboardData: DashboardData | undefined = data?.success ? data.data : undefined;
  
  // Função para trocar o período do dashboard
  const changePeriod = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

  return {
    data: dashboardData,
    isLoading,
    error: error || (data && !data.success ? data.error : null),
    period,
    changePeriod,
    refetch
  };
} 