"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  CalendarDays, 
  ShoppingCart, 
  Settings, 
  HelpCircle, 
  FileText,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Menu
} from "lucide-react";
import { NavUser } from "./nav-user";

/**
 * Interface para os itens de menu
 */
interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  current: boolean;
}

/**
 * Interface para os eventos
 */
interface Event {
  id: string;
  name: string;
  href: string;
}

/**
 * Componente de barra lateral para navegação principal
 */
export function Sidebar() {
  const pathname = usePathname();
  const [eventsExpanded, setEventsExpanded] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  
  // Salvar estado da sidebar no localStorage
  useEffect(() => {
    // Verificar se há uma preferência salva
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsed !== null) {
      setCollapsed(savedCollapsed === 'true');
    }
  }, []);
  
  // Atualizar localStorage quando o estado mudar
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(collapsed));
  }, [collapsed]);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  // Dados mock para demonstração
  const events: Event[] = [
    { id: "1", name: "Bear Hug: Live in Concert", href: "/events/1" },
    { id: "2", name: "Six Fingers — DJ Set", href: "/events/2" },
    { id: "3", name: "We All Look The Same", href: "/events/3" },
    { id: "4", name: "Viking People", href: "/events/4" },
  ];
  
  // Menu de navegação principal
  const navigation: MenuItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, current: pathname === '/dashboard' },
    { name: "Eventos", href: "/events", icon: <CalendarDays className="w-5 h-5" />, current: pathname.startsWith('/events') },
    { name: "Pedidos", href: "/orders", icon: <ShoppingCart className="w-5 h-5" />, current: pathname.startsWith('/orders') },
    { name: "Configurações", href: "/settings", icon: <Settings className="w-5 h-5" />, current: pathname.startsWith('/settings') },
  ];

  return (
    <div 
      className={`
        flex h-full flex-col border-r border-slate-200 bg-white
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Header com logo */}
      <div className="flex h-16 shrink-0 items-center px-4 border-b border-slate-200 justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold">L</span>
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold">Leo.ai</span>
          )}
        </Link>
        <button 
          onClick={toggleSidebar}
          className="w-6 h-6 rounded-md hover:bg-slate-100 flex items-center justify-center"
          title={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navegação principal */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul role="list" className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`
                  flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
                  ${item.current 
                    ? 'bg-slate-100 text-slate-900' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? item.name : ""}
              >
                {item.icon}
                {!collapsed && item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Links de suporte */}
      <div className={`${collapsed ? "px-2 py-4" : "p-4"} mt-auto border-t border-slate-200`}>
        {!collapsed && (
          <div className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
            Suporte
          </div>
        )}
        <ul role="list" className="space-y-1">
          <li>
            <Link
              href="/support"
              className={`
                flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium 
                text-slate-600 hover:bg-slate-50 hover:text-slate-900
                ${collapsed ? 'justify-center' : ''}
              `}
              title={collapsed ? "Suporte" : ""}
            >
              <HelpCircle className="h-5 w-5" />
              {!collapsed && "Suporte"}
            </Link>
          </li>
          <li>
            <Link
              href="/changelog"
              className={`
                flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium 
                text-slate-600 hover:bg-slate-50 hover:text-slate-900
                ${collapsed ? 'justify-center' : ''}
              `}
              title={collapsed ? "Novidades" : ""}
            >
              <FileText className="h-5 w-5" />
              {!collapsed && "Novidades"}
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Componente de usuário */}
      <div className={`${collapsed ? "px-2 pb-4" : "px-4 pb-4"}`}>
        <NavUser collapsed={collapsed} />
      </div>
    </div>
  );
} 