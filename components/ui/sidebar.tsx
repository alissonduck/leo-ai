"use client";

import { useState } from "react";
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
  ChevronUp
} from "lucide-react";

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
  
  // Dados mock para demonstração
  const events: Event[] = [
    { id: "1", name: "Bear Hug: Live in Concert", href: "/events/1" },
    { id: "2", name: "Six Fingers — DJ Set", href: "/events/2" },
    { id: "3", name: "We All Look The Same", href: "/events/3" },
    { id: "4", name: "Viking People", href: "/events/4" },
  ];
  
  // Menu de navegação principal
  const navigation: MenuItem[] = [
    { name: "Home", href: "/dashboard", icon: <Home className="w-5 h-5" />, current: pathname === '/dashboard' },
    { name: "Events", href: "/events", icon: <CalendarDays className="w-5 h-5" />, current: pathname.startsWith('/events') },
    { name: "Orders", href: "/orders", icon: <ShoppingCart className="w-5 h-5" />, current: pathname.startsWith('/orders') },
    { name: "Settings", href: "/settings", icon: <Settings className="w-5 h-5" />, current: pathname.startsWith('/settings') },
  ];

  return (
    <div className="flex h-full flex-col border-r border-slate-200 bg-white w-60">
      {/* Header com logo */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center">
            <span className="text-white font-semibold">L</span>
          </div>
          <span className="text-lg font-semibold">Leo.ai</span>
        </Link>
      </div>

      {/* Navegação principal */}
      <nav className="flex-1 overflow-y-auto p-4">
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
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Links de suporte */}
      <div className="mt-auto border-t border-slate-200 p-4">
        <ul role="list" className="space-y-1">
          <li>
            <Link
              href="/support"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <HelpCircle className="h-5 w-5" />
              Support
            </Link>
          </li>
          <li>
            <Link
              href="/changelog"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <FileText className="h-5 w-5" />
              Changelog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
} 