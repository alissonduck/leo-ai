"use client";

import { ReactNode } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

/**
 * Interface para as propriedades do cabeçalho da página
 */
interface PageHeaderProps {
  /**
   * Título principal
   */
  title: string;
  
  /**
   * Nome do usuário para saudação personalizada
   */
  userName?: string;
  
  /**
   * Período atual selecionado
   */
  period?: string;
  
  /**
   * Callback para quando o período é alterado
   */
  onPeriodChange?: (period: string) => void;
  
  /**
   * Conteúdo adicional para o cabeçalho (opcional)
   */
  children?: ReactNode;
}

/**
 * Obtém a saudação com base na hora do dia
 */
function getGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

/**
 * Componente de cabeçalho da página com saudação e controles
 */
export function PageHeader({ 
  title, 
  userName, 
  period = "last_week", 
  onPeriodChange,
  children 
}: PageHeaderProps) {
  // Traduzir o valor do período para exibição
  const getPeriodDisplay = (period: string): string => {
    switch(period) {
      case 'today': return 'Hoje';
      case 'yesterday': return 'Ontem';
      case 'last_week': return 'Última semana';
      case 'last_month': return 'Último mês';
      case 'last_year': return 'Último ano';
      default: return 'Última semana';
    }
  };

  return (
    <div className="pb-5 mb-8 border-b border-slate-200">
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div>
          {userName ? (
            <h2 className="text-2xl font-bold leading-7 text-slate-900">
              {getGreeting()}, {userName}
            </h2>
          ) : (
            <h2 className="text-2xl font-bold leading-7 text-slate-900">
              {title}
            </h2>
          )}
        </div>
        
        <div className="flex mt-4 sm:ml-4 sm:mt-0">
          {onPeriodChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-x-1 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white px-3 py-2 border border-slate-300 rounded-md"
                >
                  {getPeriodDisplay(period)}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Selecione o período</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onPeriodChange('today')}>
                  Hoje
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPeriodChange('yesterday')}>
                  Ontem
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPeriodChange('last_week')}>
                  Última semana
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPeriodChange('last_month')}>
                  Último mês
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPeriodChange('last_year')}>
                  Último ano
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {children}
        </div>
      </div>
    </div>
  );
} 