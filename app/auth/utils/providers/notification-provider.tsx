"use client";

import React, { createContext, useContext } from 'react';
import { useNotification, NotificationType } from '@/app/auth/utils/hooks/useNotification';
import { NotificationContainer } from '@/components/ui/notification';

// Interface para o contexto de notificações
interface NotificationContextType {
  notifications: {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number;
  }[];
  addNotification: (message: string, type?: NotificationType, duration?: number) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
}

// Criar o contexto
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

/**
 * Hook para usar o contexto de notificações
 */
export function useNotificationContext() {
  const context = useContext(NotificationContext);
  
  if (context === undefined) {
    throw new Error('useNotificationContext deve ser usado dentro de um NotificationProvider');
  }
  
  return context;
}

/**
 * Provedor de notificações para a aplicação
 * Deve ser usado perto da raiz da aplicação
 */
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const notificationHook = useNotification();
  
  return (
    <NotificationContext.Provider value={notificationHook}>
      {children}
      <NotificationContainer 
        notifications={notificationHook.notifications}
        onClose={notificationHook.removeNotification}
      />
    </NotificationContext.Provider>
  );
} 