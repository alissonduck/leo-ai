"use client";

import Link from "next/link";
import { LogOut, User, Lock } from "lucide-react";
import { useAuthContext } from "@/app/auth/utils/providers";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

/**
 * Componente de navegação do usuário com menu dropdown
 * Exibe informações do usuário atual e opções relacionadas à conta usando DropdownMenu.
 */
export function NavUser({ collapsed = false }: { collapsed?: boolean }) {
  const { user, logout } = useAuthContext();

  const handleLogout = async (event: Event) => {
    event.preventDefault();
    await logout();
  };

  const dropdownContent = (
    <DropdownMenuContent 
      className="w-56" 
      align={collapsed ? "center" : "end"}
      side={collapsed ? "top" : "right"}
      sideOffset={8}
    >
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none truncate">
            {user?.name || "Usuário"}
          </p>
          <p className="text-xs leading-none text-muted-foreground truncate">
            {user?.email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
          <User className="h-4 w-4" />
          <span>Meu perfil</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/change-password" className="flex items-center gap-2 cursor-pointer">
          <Lock className="h-4 w-4" />
          <span>Alterar senha</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem 
        onSelect={handleLogout}
        className="flex items-center gap-2 text-red-600 hover:!bg-red-50 hover:!text-red-700 cursor-pointer"
      >
        <LogOut className="h-4 w-4" />
        <span>Sair</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  const loadingPlaceholderCollapsed = (
    <div className="h-10 w-10 rounded-full bg-slate-100 animate-pulse flex items-center justify-center" />
  );

  const loadingPlaceholderExpanded = (
    <div className="flex items-center gap-3 p-3 animate-pulse w-full">
      <div className="h-10 w-10 rounded-full bg-slate-200"></div>
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
        <div className="h-3 w-32 bg-slate-200 rounded"></div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className={cn(
        "flex items-center",
        collapsed ? "justify-center h-12" : "border-t border-slate-200 pt-2 min-h-[68px] px-3 pb-3"
      )}>
        {collapsed ? loadingPlaceholderCollapsed : loadingPlaceholderExpanded}
      </div>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {collapsed ? (
          <Button 
            variant="ghost" 
            className="flex h-10 w-10 items-center justify-center rounded-full p-0 hover:bg-slate-100"
            aria-label="Menu do usuário"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar_url ?? undefined} alt={user.name || "Avatar"} />
              <AvatarFallback className="bg-slate-200 text-slate-600">
                {(user.name?.charAt(0) || user.email.charAt(0)).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            className="flex items-center justify-between w-full p-3 hover:bg-slate-50 rounded-md h-auto"
            aria-label="Menu do usuário"
          >
            <div className="flex items-center gap-3 overflow-hidden">
               <Avatar className="h-8 w-8 flex-shrink-0">
                 <AvatarImage src={user.avatar_url ?? undefined} alt={user.name || "Avatar"} />
                 <AvatarFallback className="bg-slate-200 text-slate-600">
                   {(user.name?.charAt(0) || user.email.charAt(0)).toUpperCase()}
                 </AvatarFallback>
               </Avatar>
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="text-sm font-medium truncate">
                  {user.name || "Usuário"}
                </span>
                <span className="text-xs text-slate-500 truncate">
                  {user.email}
                </span>
              </div>
            </div>
          </Button>
        )}
      </DropdownMenuTrigger>
      
      {dropdownContent} 
    </DropdownMenu>
  );
} 