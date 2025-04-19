"use client";

import { useRouter, usePathname } from 'next/navigation';
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
  const pathname = usePathname();
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
            .select('full_name, avatar_url')
            .eq('id', session.user.id)
            .single();
            
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: data?.full_name,
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
        let shouldRefresh = true;

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user) {
            // Atualizar usuário quando a autenticação mudar
            const { data } = await supabase
              .from('profiles')
              .select('full_name, avatar_url')
              .eq('id', session.user.id)
              .single();
              
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: data?.full_name,
              avatar_url: data?.avatar_url
            });

            if (event === 'SIGNED_IN' && pathname === '/auth/register') {
              shouldRefresh = false;
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        
        if (shouldRefresh) {
          router.refresh();
        }
      }
    );

    // Limpar inscrição quando o componente for desmontado
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router, pathname]);

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

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
    // Função para verificar se o usuário está autenticado (sem redirecionamento)
    isLoggedIn: () => !!user
  };
} 