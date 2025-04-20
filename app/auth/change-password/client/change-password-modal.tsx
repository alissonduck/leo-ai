"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChangePasswordForm } from "./change-password-form";

interface ChangePasswordModalProps {
  children?: React.ReactNode; // O elemento que vai acionar o modal (DialogTrigger) - TORNADO OPCIONAL
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Componente modal para alteração de senha.
 * Envolve o ChangePasswordForm dentro de um Dialog do shadcn/ui.
 */
export function ChangePasswordModal({ children, open, onOpenChange }: ChangePasswordModalProps) {

  // Função para fechar o modal, passada para o formulário
  const handleSuccess = () => {
    onOpenChange(false); // Fecha o modal
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* O children aqui será o DialogTrigger vindo do NavUser */}
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alterar Senha</DialogTitle>
          <DialogDescription>
            Digite sua senha atual e defina uma nova senha segura para sua conta.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {/* Passa a função handleSuccess para o onSuccess prop do formulário */}
          <ChangePasswordForm onSuccess={handleSuccess} />
        </div>
        {/* DialogFooter pode ser adicionado aqui se botões extras forem necessários */}
         <DialogFooter>
           <DialogClose asChild>
             <Button variant="outline">Cancelar</Button>
           </DialogClose>
         </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 