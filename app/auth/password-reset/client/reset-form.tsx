"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { passwordResetRequestSchema, PasswordResetRequestFormData } from "../schema";
import { sendPasswordResetRequest } from "../service";

/**
 * Componente de formulário para solicitar recuperação de senha
 */
export function PasswordResetForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PasswordResetRequestFormData>({
    resolver: zodResolver(passwordResetRequestSchema),
    defaultValues: {
      email: "",
    }
  });
  
  async function onSubmit(data: PasswordResetRequestFormData) {
    try {
      setStatus("loading");
      setError(null);
      
      const result = await sendPasswordResetRequest(data);
      
      if (!result.success) {
        setError(result.error || "Falha ao processar solicitação");
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
          <h3 className="font-medium text-green-800">Email enviado com sucesso!</h3>
          <p className="mt-1">Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.</p>
        </div>
        
        <div className="text-center mt-6">
          <Link
            href="/auth/login"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Voltar para o login
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
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          {...register("email")}
          className="w-full"
        />
        {errors.email && (
          <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      
      <Button
        type="submit"
        className="w-full mt-2"
        disabled={status === "loading"}
        size="lg"
      >
        {status === "loading" ? "Enviando..." : "Enviar email de recuperação"}
      </Button>
      
      <div className="text-center mt-4">
        <Link
          href="/auth/login"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Voltar para o login
        </Link>
      </div>
    </form>
  );
} 