"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner'; // Importando o toast do Sonner
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'; // Importando componentes do Form (shadcn)
import { ChangePasswordSchema } from '../schema/change-password-schema';
import { ChangePasswordFormData } from '../types/change-password-types';
import { changePasswordService } from '../service/change-password-service';
import { Loader2 } from 'lucide-react';

interface ChangePasswordFormProps {
  onSuccess?: () => void; // Callback opcional para fechar o modal em caso de sucesso
}

/**
 * Componente de formulário para alteração de senha do usuário logado.
 */
export function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: ChangePasswordFormData) {
    setIsLoading(true);
    try {
      // Não precisamos verificar a senha atual aqui,
      // o Supabase faz isso implicitamente ao tentar atualizar.
      // Se a senha atual estiver incorreta, supabase.auth.updateUser retornará um erro.
      const result = await changePasswordService(data.newPassword);

      if (result.success) {
        toast.success(result.message || 'Senha alterada com sucesso!');
        form.reset(); // Limpa o formulário
        if (onSuccess) {
          onSuccess(); // Chama o callback para fechar o modal, se fornecido
        }
      } else {
        // Exibe o erro retornado pelo serviço (que já inclui a mensagem do Supabase)
        toast.error(result.message || 'Erro ao alterar a senha.');
        // Limpa apenas os campos de nova senha e confirmação em caso de erro
        form.resetField('newPassword');
        form.resetField('confirmPassword');
        form.setFocus('currentPassword'); // Foca no campo de senha atual
      }
    } catch (error) {
      console.error('Erro inesperado no formulário de alteração de senha:', error);
      toast.error('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha Atual</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Sua senha atual" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Mínimo 8 caracteres" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Nova Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Repita a nova senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Alterando...
            </>
          ) : (
            'Alterar Senha'
          )}
        </Button>
      </form>
    </Form>
  );
} 