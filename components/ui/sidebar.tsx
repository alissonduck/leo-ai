"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard,
  Settings,
  HelpCircle,
  FileText,
  Blend,
  Binoculars,
  Lightbulb
} from "lucide-react";
import { NavUser } from "./nav-user";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

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
    { name: "Ideias", href: "/ideas", icon: <Lightbulb className="w-5 h-5" />, current: pathname.startsWith('/ideas') },
    { name: "Descoberta", href: "/discovery", icon: <Binoculars className="w-5 h-5" />, current: pathname.startsWith('/discovery') },
    { name: "Estratégia", href: "/strategy", icon: <Blend className="w-5 h-5" />, current: pathname.startsWith('/strategy') },
    { name: "Configurações", href: "", icon: <Settings className="w-5 h-5" />, current: pathname.startsWith('/config/') },
  ];

  // Sub-itens do menu de Configurações
  const settingsSubMenu = [
    { name: "Minha empresa", href: "/config/company" },
    { name: "Projetos", href: "/config/projects" },
    { name: "Equipes", href: "/config/teams" },
    { name: "Usuários", href: "/config/users" },
    { name: "Faturamento", href: "/config/billing" },
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
              {item.name === "Configurações" ? (
                // Caso especial para Configurações: Usar DropdownMenu
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {/* O DropdownMenuTrigger agora envolve o ícone */}
                      <DropdownMenuTrigger asChild>
                        <button // Usar um botão ou div como trigger real
                          className={cn(
                            "flex items-center w-full gap-3 rounded-md px-3 py-2 text-sm font-medium",
                            item.current 
                              ? 'bg-slate-100 text-slate-900' 
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                            'justify-center' // Layout fixo recolhido
                          )}
                        >
                          {item.icon}
                        </button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent side="right" align="start" sideOffset={5}>
                    <DropdownMenuLabel>Configurações</DropdownMenuLabel>
                    {settingsSubMenu.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link href={subItem.href} className="cursor-pointer">
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // Lógica original para outros itens de menu
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                        item.current 
                          ? 'bg-slate-100 text-slate-900' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                        'justify-center' // Layout fixo recolhido
                      )}
                    >
                      {item.icon} 
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Links de suporte */}
      <div className={cn("mt-auto border-t border-slate-200", "px-2 py-4")}> 
        <ul role="list" className="space-y-1">
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/support"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium", 
                    "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    'justify-center' // Layout fixo recolhido
                  )}
                >
                  <HelpCircle className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Suporte</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/changelog"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium", 
                    "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    'justify-center' // Layout fixo recolhido
                  )}
                >
                  <FileText className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Novidades</p>
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </div>
      
      {/* Componente de usuário */}
      <div className={cn("px-2 pb-4 flex justify-center")}>
        <NavUser collapsed={true} /> {/* Passar true fixo */}
      </div>
    </div>
  );
} 