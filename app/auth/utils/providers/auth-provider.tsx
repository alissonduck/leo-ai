"use client";

import React, { createContext, useContext } from 'react';
import { useAuth, AuthUser } from '@/app/auth/utils/hooks/useAuth';

// Interface para o contexto de autenticação
interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  requireAuth: (redirectTo?: string) => boolean;
}

// Criar o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook para usar o contexto de autenticação
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  
  return context;
}

/**
 * Provedor de autenticação para a aplicação
 * Deve ser usado perto da raiz da aplicação
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
} 