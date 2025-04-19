"use client";

import { toast as sonnerToast } from 'sonner';

/**
 * Interface para a ação opcional do toast.
 */
interface ToastAction {
  /**
   * Texto exibido no botão de ação.
   */
  label: string;
  /**
   * Função a ser executada quando o botão de ação é clicado.
   */
  onClick: () => void;
}

/**
 * Propriedades obrigatórias e opcionais para exibir um toast.
 */
interface ToastProps {
  /**
   * O título principal da notificação.
   */
  title: string;
  /**
   * A descrição detalhada da notificação.
   */
  description: string;
  /**
   * Uma ação opcional a ser exibida como um botão na notificação.
   */
  action?: ToastAction;
}

/**
 * Tipos de toast disponíveis.
 */
type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Mapeamento dos tipos de toast para suas respectivas classes CSS.
 * Essas classes devem ser definidas no arquivo CSS global (ex: app/globals.css).
 */
const typeToClassMap: Record<ToastType, string> = {
  success: 'toast-success',
  error: 'toast-error',
  warning: 'toast-warning',
  info: 'toast-info',
};

/**
 * Hook customizado para exibir notificações toast padronizadas usando Sonner.
 *
 * @returns Um objeto contendo funções para disparar toasts de diferentes tipos:
 *   - `toastSuccess`: Exibe uma notificação de sucesso (fundo verde).
 *   - `toastError`: Exibe uma notificação de erro (fundo vermelho).
 *   - `toastWarning`: Exibe uma notificação de aviso (fundo laranja).
 *   - `toastInfo`: Exibe uma notificação informativa (fundo azul).
 *
 * @example
 * import { useToast } from '@/components/ui/use-toast';
 * import { Button } from '@/components/ui/button';
 *
 * function MyComponent() {
 *   const { toastSuccess, toastError } = useToast();
 *
 *   const handleSuccess = () => {
 *     toastSuccess({
 *       title: "Operação Concluída",
 *       description: "Seus dados foram salvos com sucesso.",
 *       action: {
 *         label: "Desfazer",
 *         onClick: () => console.log("Ação desfazer clicada!"),
 *       },
 *     });
 *   };
 *
 *   const handleError = () => {
 *     toastError({
 *       title: "Falha na Operação",
 *       description: "Não foi possível salvar os dados.",
 *     });
 *   };
 *
 *   return (
 *     <div>
 *       <Button onClick={handleSuccess}>Mostrar Sucesso</Button>
 *       <Button onClick={handleError} variant="destructive">Mostrar Erro</Button>
 *     </div>
 *   );
 * }
 */
export function useToast() {
  /**
   * Função interna para exibir o toast com base no tipo e nas propriedades.
   * @param type O tipo de toast ('success', 'error', 'warning', 'info').
   * @param props As propriedades do toast (title, description, action).
   */
  const showToast = (type: ToastType, { title, description, action }: ToastProps) => {
    sonnerToast(title, {
      description,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
      /**
       * Aplica a classe CSS base 'toast' e a classe específica do tipo.
       * Ex: "group toast toast-success"
       */
      className: `group toast ${typeToClassMap[type]}`,
      /**
       * Permite customizações mais finas de elementos internos do toast, se necessário.
       */
      classNames: {
        // Exemplo: Estilizar o botão de ação especificamente para toasts de sucesso
        // actionButton: type === 'success' ? 'bg-green-700 hover:bg-green-800' : '',
      },
      /**
       * Define um tempo padrão para o toast desaparecer (em milissegundos).
       * Pode ser sobrescrito por chamada individual, se necessário.
       */
      duration: 5000, // 5 segundos
    });
  };

  /**
   * Exibe uma notificação de sucesso.
   * @param props As propriedades do toast (title, description, action).
   */
  const toastSuccess = (props: ToastProps) => showToast('success', props);

  /**
   * Exibe uma notificação de erro.
   * @param props As propriedades do toast (title, description, action).
   */
  const toastError = (props: ToastProps) => showToast('error', props);

  /**
   * Exibe uma notificação de aviso.
   * @param props As propriedades do toast (title, description, action).
   */
  const toastWarning = (props: ToastProps) => showToast('warning', props);

  /**
   * Exibe uma notificação informativa.
   * @param props As propriedades do toast (title, description, action).
   */
  const toastInfo = (props: ToastProps) => showToast('info', props);

  return {
    toastSuccess,
    toastError,
    toastWarning,
    toastInfo,
  };
} 