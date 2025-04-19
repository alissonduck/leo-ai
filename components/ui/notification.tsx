"use client";

import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
import { Notification as NotificationType } from '@/app/auth/utils/hooks/useNotification';
import { cn } from '@/lib/utils';

interface NotificationProps {
  notification: NotificationType;
  onClose: (id: string) => void;
}

/**
 * Componente individual de notificação
 */
export function Notification({ notification, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Animação de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  // Determinar as classes de cor com base no tipo de notificação
  const getTypeClasses = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-500 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-500 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-500 text-yellow-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-500 text-blue-800';
    }
  };

  // Determinar o ícone com base no tipo de notificação
  const getIconClass = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-100 text-green-500';
      case 'error':
        return 'bg-red-100 text-red-500';
      case 'warning':
        return 'bg-yellow-100 text-yellow-500';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-500';
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(notification.id), 300);
  };

  return (
    <div
      className={cn(
        'max-w-sm w-full shadow-lg rounded-lg pointer-events-auto border-l-4 overflow-hidden',
        getTypeClasses(),
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        'transition-all duration-300 ease-in-out'
      )}
    >
      <div className="p-4 flex items-start">
        <div className="flex-shrink-0">
          <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', getIconClass())}>
            {notification.type === 'success' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
            {notification.type === 'error' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
            {notification.type === 'warning' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            )}
            {notification.type === 'info' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            )}
          </div>
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="bg-transparent rounded-md inline-flex text-muted-foreground hover:text-foreground"
            onClick={handleClose}
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Componente de container para todas as notificações
 */
export function NotificationContainer({ 
  notifications,
  onClose
}: { 
  notifications: NotificationType[],
  onClose: (id: string) => void
}) {
  return (
    <div className="fixed inset-0 flex flex-col items-end justify-start p-4 space-y-4 pointer-events-none z-50">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
} 