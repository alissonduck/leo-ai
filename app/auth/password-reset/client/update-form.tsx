"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { newPasswordSchema, NewPasswordFormData } from "../schema";
import { updateUserPassword } from "../service";

/**
 * Componente de formulário para definir nova senha
 */
export function UpdatePasswordForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });
  
  async function onSubmit(data: NewPasswordFormData) {
    try {
      setStatus("loading");
      setError(null);
      
      const result = await updateUserPassword({
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      
      if (!result.success) {
        setError(result.error || "Falha ao atualizar senha");
        setStatus("error");
        return;
      }
      
      // Mostrar mensagem de sucesso
      setStatus("success");
    } catch (err) {
      setError("Ocorreu um erro inesperado. Tente novamente.");
      setStatus("error");
    }
  };
  
  if (status === "success") {
    return (
      <div className="space-y-4">
        <div className="bg-green-50 p-4 rounded-md text-green-700">
          <h3 className="font-medium text-green-800">Senha atualizada com sucesso!</h3>
          <p className="mt-1">Sua senha foi alterada. Agora você pode fazer login com sua nova senha.</p>
        </div>
        
        <div className="text-center mt-6">
          <Link
            href="/auth/login"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Ir para o login
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-destructive/10 p-3 rounded-md text-destructive text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Nova senha
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className="w-full"
        />
        {errors.password && (
          <p className="text-destructive text-xs mt-1">{errors.password.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
          Confirme a nova senha
        </label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          className="w-full"
        />
        {errors.confirmPassword && (
          <p className="text-destructive text-xs mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>
      
      <Button
        type="submit"
        className="w-full mt-2"
        disabled={status === "loading"}
        size="lg"
      >
        {status === "loading" ? "Atualizando..." : "Atualizar senha"}
      </Button>
    </form>
  );
} 