import { createClient } from '@/utils/supabase/client';
import { ChangePasswordResponse } from '../types/change-password-types';

/**
 * Serviço para alterar a senha do usuário autenticado.
 *
 * @param newPassword A nova senha fornecida pelo usuário.
 * @returns Uma promessa que resolve para um objeto ChangePasswordResponse indicando sucesso ou falha.
 */
export const changePasswordService = async (
  newPassword: string
): Promise<ChangePasswordResponse> => {
  // Cria uma instância do cliente Supabase para interações no lado do cliente.
  const supabase = createClient();

  // Tenta atualizar a senha do usuário usando a API de autenticação do Supabase.
  // A função updateUser atualiza os dados do usuário autenticado atualmente.
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  // Verifica se ocorreu um erro durante a atualização.
  if (error) {
    console.error('Erro ao alterar a senha:', error.message);
    // Retorna uma resposta de falha com a mensagem de erro.
    return {
      success: false,
      message: `Erro ao alterar a senha: ${error.message}`,
    };
  }

  // Retorna uma resposta de sucesso se a senha foi alterada sem erros.
  return {
    success: true,
    message: 'Senha alterada com sucesso!',
  };
}; 