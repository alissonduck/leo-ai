"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard,
  CalendarDays,
  ShoppingCart,
  Settings,
  HelpCircle,
  FileText
} from "lucide-react";
import { NavUser } from "./nav-user";
import { cn } from "@/lib/utils";

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
 * Componente de barra lateral FIXA e RECOLHIDA para navegação principal
 */
export function Sidebar() {
  const pathname = usePathname();
  
  // Menu de navegação principal
  const navigation: MenuItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, current: pathname === '/dashboard' },
    { name: "Eventos", href: "/events", icon: <CalendarDays className="w-5 h-5" />, current: pathname.startsWith('/events') },
    { name: "Pedidos", href: "/orders", icon: <ShoppingCart className="w-5 h-5" />, current: pathname.startsWith('/orders') },
    { name: "Configurações", href: "/settings", icon: <Settings className="w-5 h-5" />, current: pathname.startsWith('/settings') },
  ];

  return (
    <div 
      className={cn(
        "flex h-full flex-col border-r border-slate-200 bg-white",
        "transition-all duration-300 ease-in-out",
        'w-16' // Largura fixa recolhida
      )}
    >
      {/* Header com logo */}
      <div className={cn(
        "flex h-16 shrink-0 items-center border-b border-slate-200",
        "justify-center px-2" // Layout fixo recolhido
      )}>
        <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0">
          {/* Logo sempre como ícone */}
          <Image 
            src="/leo_icon.svg" 
            alt="Leo.ai Icon" 
            width={32} 
            height={32}
            className="h-8 w-8"
          />
        </Link>
      </div>

      {/* Navegação principal */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul role="list" className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                  item.current 
                    ? 'bg-slate-100 text-slate-900' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                  'justify-center' // Layout fixo recolhido
                )}
                title={item.name} // Tooltip sempre ativo
              >
                {item.icon} 
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Links de suporte */}
      <div className={cn("mt-auto border-t border-slate-200", "px-2 py-4")}> 
        <ul role="list" className="space-y-1">
          <li>
            <Link
              href="/support"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium", 
                "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                'justify-center' // Layout fixo recolhido
              )}
              title={"Suporte"} // Tooltip sempre ativo
            >
              <HelpCircle className="h-5 w-5" />
            </Link>
          </li>
          <li>
            <Link
              href="/changelog"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium", 
                "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                'justify-center' // Layout fixo recolhido
              )}
              title={"Novidades"} // Tooltip sempre ativo
            >
              <FileText className="h-5 w-5" />
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Componente de usuário */}
      <div className={cn("px-2 pb-4")}>
        <NavUser collapsed={true} /> {/* Passar true fixo */}
      </div>
    </div>
  );
} 