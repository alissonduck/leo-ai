"use client";

import { Badge } from "@/components/ui/badge";
import { RecentOrder } from "../types";

/**
 * Interface para as propriedades da tabela de pedidos recentes
 */
interface RecentOrdersProps {
  /**
   * Lista de pedidos recentes
   */
  orders: RecentOrder[];
  
  /**
   * Indica se os dados estão carregando
   */
  isLoading?: boolean;
}

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
 * Formata uma data para exibição no formato brasileiro
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

/**
 * Componente para exibir uma tabela de pedidos recentes
 */
export function RecentOrders({ orders, isLoading }: RecentOrdersProps) {
  if (isLoading) {
    return (
      <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200">
          <h3 className="text-lg font-medium leading-6 text-slate-900">
            Pedidos recentes
          </h3>
        </div>
        <div className="p-6 text-center text-slate-500">
          Carregando pedidos...
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200">
          <h3 className="text-lg font-medium leading-6 text-slate-900">
            Pedidos recentes
          </h3>
        </div>
        <div className="p-6 text-center text-slate-500">
          Nenhum pedido encontrado.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200">
        <h3 className="text-lg font-medium leading-6 text-slate-900">
          Pedidos recentes
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Número do pedido
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Data da compra
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Evento
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Valor
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {formatDate(order.purchaseDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {order.customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-slate-100 text-slate-800">
                      {order.eventName}
                    </Badge>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-900 font-medium">
                  {formatCurrency(order.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 