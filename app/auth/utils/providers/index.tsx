"use client";

import React from 'react';
import { AuthProvider } from './auth-provider';
import { NotificationProvider } from './notification-provider';

/**
 * Componente que combina todos os provedores de contexto da aplicação
 * Deve envolver a aplicação na raiz do arquivo layout
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </AuthProvider>
  );
}

// Exportações para facilitar o acesso aos provedores
export * from './auth-provider';
export * from './notification-provider'; 