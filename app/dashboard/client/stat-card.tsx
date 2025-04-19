"use client";

import { ReactNode } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

/**
 * Interface para as propriedades do cartão de estatísticas
 */
interface StatCardProps {
  /**
   * Título da estatística
   */
  title: string;
  
  /**
   * Valor principal da estatística
   */
  value: string;
  
  /**
   * Percentual de mudança (positivo ou negativo)
   */
  changePercent?: number;
  
  /**
   * Descrição da mudança
   */
  changeText?: string;
  
  /**
   * Ícone opcional
   */
  icon?: ReactNode;
}

/**
 * Componente de cartão para exibir estatísticas
 */
export function StatCard({ 
  title, 
  value, 
  changePercent, 
  changeText,
  icon 
}: StatCardProps) {
  const isPositive = changePercent !== undefined ? changePercent >= 0 : undefined;
  
  return (
    <div className="bg-white overflow-hidden rounded-lg shadow p-5">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 truncate">
            {title}
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {value}
          </p>
        </div>
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
      
      {changePercent !== undefined && (
        <div className="mt-4 flex items-center">
          <div 
            className={`flex-shrink-0 flex items-center text-sm ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center" />
            )}
            <span className="ml-1 font-medium">
              {Math.abs(changePercent).toFixed(1)}%
            </span>
          </div>
          <div className="ml-2 text-sm text-slate-500">
            {changeText || `from last period`}
          </div>
        </div>
      )}
    </div>
  );
} 