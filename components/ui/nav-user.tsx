"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, User, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { useAuthContext } from "@/app/auth/utils/providers";

/**
 * Componente de navegação do usuário
 * Exibe informações do usuário atual e opções relacionadas à conta
 */
export function NavUser({ collapsed = false }: { collapsed?: boolean }) {
  const { user, logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
  };

  // Se não houver usuário autenticado, não exibe nada
  if (!user) return null;

  // Versão recolhida (apenas avatar)
  if (collapsed) {
    return (
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center w-full p-2 hover:bg-slate-100 rounded-md"
        >
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name || "Usuário"}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <span className="text-slate-600 font-medium">
                {(user.name?.charAt(0) || user.email.charAt(0)).toUpperCase()}
              </span>
            )}
          </div>
        </button>

        {isOpen && (
          <div className="absolute bottom-full mb-2 left-0 w-48 bg-white shadow-md rounded-md py-1 z-10 border border-slate-200">
            <div className="px-4 py-2 border-b border-slate-200">
              <p className="font-medium text-sm truncate">{user.name || "Usuário"}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
            <ul className="py-1">
              <li>
                <Link 
                  href="/profile" 
                  className="px-4 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 text-slate-700"
                >
                  <User className="h-4 w-4" />
                  Meu perfil
                </Link>
              </li>
              <li>
                <Link 
                  href="/change-password" 
                  className="px-4 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 text-slate-700"
                >
                  <Lock className="h-4 w-4" />
                  Alterar senha
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Versão expandida
  return (
    <div className="border-t border-slate-200 pt-2">
      <button
        onClick={toggleMenu}
        className="flex items-center justify-between w-full p-3 hover:bg-slate-50 rounded-md"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name || "Usuário"}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <span className="text-slate-600 font-medium">
                {(user.name?.charAt(0) || user.email.charAt(0)).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium truncate max-w-[120px]">
              {user.name || "Usuário"}
            </span>
            <span className="text-xs text-slate-500 truncate max-w-[120px]">
              {user.email}
            </span>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <ul className="mt-1 space-y-1 px-2">
          <li>
            <Link 
              href="/profile" 
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-slate-700 hover:bg-slate-50"
            >
              <User className="h-4 w-4" />
              Meu perfil
            </Link>
          </li>
          <li>
            <Link 
              href="/change-password" 
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-slate-700 hover:bg-slate-50"
            >
              <Lock className="h-4 w-4" />
              Alterar senha
            </Link>
          </li>
          <li>
            <a 
              href="#" 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </a>
          </li>
        </ul>
      )}
    </div>
  );
} 