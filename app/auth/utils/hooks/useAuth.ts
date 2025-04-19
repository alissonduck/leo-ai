"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

/**
 * Interface para o usuário autenticado
 */
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
}

/**
 * Hook personalizado para gerenciar autenticação
 * Fornece o usuário atual e funções para autenticação
 */
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Carrega o usuário atual da sessão no primeiro render
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        
        // Obter a sessão atual
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Obter dados adicionais do usuário se necessário
          const { data } = await supabase
            .from('profiles')
            .select('name, avatar_url')
            .eq('id', session.user.id)
            .single();
            
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: data?.name,
            avatar_url: data?.avatar_url
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Carregar usuário inicial
    loadUser();

    // Configurar ouvinte para mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Atualizar usuário quando a autenticação mudar
          const { data } = await supabase
            .from('profiles')
            .select('name, avatar_url')
            .eq('id', session.user.id)
            .single();
            
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: data?.name,
            avatar_url: data?.avatar_url
          });
        } else {
          setUser(null);
        }
        
        // Refresh router
        router.refresh();
      }
    );

    // Limpar inscrição quando o componente for desmontado
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  /**
   * Função para fazer logout do usuário
   */
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  /**
   * Verifica se o usuário está autenticado e redireciona se não estiver
   */
  const requireAuth = (redirectTo = '/auth/login') => {
    if (!loading && !user) {
      router.push(redirectTo);
      return false;
    }
    return true;
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
    requireAuth
  };
} 