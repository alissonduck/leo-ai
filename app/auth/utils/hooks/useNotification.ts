"use client";

import { useState, useCallback } from 'react';

/**
 * Tipo de notificação
 */
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

/**
 * Interface para a notificação
 */
export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

/**
 * Hook personalizado para gerenciar notificações
 * Permite adicionar, remover e gerenciar notificações na aplicação
 */
export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  /**
   * Gera um ID único para a notificação
   */
  const generateId = () => {
    return `notification-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  /**
   * Adiciona uma nova notificação
   */
  const addNotification = useCallback((
    message: string,
    type: NotificationType = 'info',
    duration = 5000  // 5 segundos por padrão
  ) => {
    const id = generateId();
    const newNotification: Notification = {
      id,
      type,
      message,
      duration
    };

    setNotifications(prev => [...prev, newNotification]);

    // Remover a notificação após a duração especificada
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  /**
   * Remove uma notificação pelo ID
   */
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  /**
   * Limpa todas as notificações
   */
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Funções de conveniência para diferentes tipos de notificações
   */
  const success = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'success', duration);
  }, [addNotification]);

  const error = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'error', duration);
  }, [addNotification]);

  const info = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'info', duration);
  }, [addNotification]);

  const warning = useCallback((message: string, duration?: number) => {
    return addNotification(message, 'warning', duration);
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    info,
    warning
  };
} 