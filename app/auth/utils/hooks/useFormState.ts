import { useState } from 'react';

/**
 * Hook personalizado para gerenciar estados de formulários
 * Facilita o controle de estados de carregamento e erros
 * 
 * @returns Um objeto com os estados e funções para manipulá-los
 */
export function useFormState<ErrorType = string>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  /**
   * Define o formulário como em carregamento e limpa erros
   */
  const startLoading = () => {
    setIsLoading(true);
    setError(null);
  };

  /**
   * Define o formulário como finalizado (não carregando)
   */
  const stopLoading = () => {
    setIsLoading(false);
  };

  /**
   * Define um erro no formulário e para o carregamento
   */
  const setFormError = (err: ErrorType) => {
    setError(err);
    setIsLoading(false);
  };

  /**
   * Limpa o erro do formulário
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Função para executar uma ação assíncrona com tratamento automático
   * de estado de carregamento e erros
   */
  const executeWithLoading = async <T>(
    asyncFn: () => Promise<T>,
    onError?: (err: any) => ErrorType
  ): Promise<T | null> => {
    try {
      startLoading();
      const result = await asyncFn();
      return result;
    } catch (err) {
      if (onError) {
        setFormError(onError(err));
      } else {
        setFormError('Ocorreu um erro inesperado' as ErrorType);
      }
      return null;
    } finally {
      stopLoading();
    }
  };

  return {
    isLoading,
    error,
    startLoading,
    stopLoading,
    setError: setFormError,
    clearError,
    executeWithLoading
  };
} 