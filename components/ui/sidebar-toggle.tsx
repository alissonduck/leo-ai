"use client";

import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Interface para as propriedades do componente SidebarToggle
 */
interface SidebarToggleProps {
  /**
   * Função para alternar o estado da sidebar
   */
  onToggle?: () => void;
  
  /**
   * Classe CSS adicional para o botão
   */
  className?: string;
}

/**
 * Componente para alternar a visibilidade da sidebar
 * Útil para layouts responsivos
 */
export function SidebarToggle({ onToggle, className = "" }: SidebarToggleProps) {
  const [visible, setVisible] = useState<boolean>(false);
  
  // Sincronizar com localStorage
  useEffect(() => {
    const isSidebarVisible = localStorage.getItem('sidebarVisible') === 'true';
    setVisible(isSidebarVisible);
  }, []);
  
  const handleToggle = () => {
    const newState = !visible;
    setVisible(newState);
    localStorage.setItem('sidebarVisible', String(newState));
    
    if (onToggle) {
      onToggle();
    }
    
    // Disparar evento para outros componentes
    const event = new CustomEvent('sidebar-toggle', { detail: { visible: newState } });
    window.dispatchEvent(event);
  };
  
  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-md hover:bg-slate-100 transition-colors ${className}`}
      aria-label={visible ? "Esconder menu lateral" : "Mostrar menu lateral"}
      title={visible ? "Esconder menu lateral" : "Mostrar menu lateral"}
    >
      <Menu className="h-5 w-5" />
    </button>
  );
} 