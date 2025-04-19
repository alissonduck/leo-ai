"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginFormData } from "../schema";
import { login } from "../service";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Componente de formulário de login
 * Gerencia os dados e submissão do formulário de login
 */
export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  async function onSubmit(data: LoginFormData) {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await login({
        email: data.email,
        password: data.password
      });
      
      if (!result.success) {
        setError(result.error || "Falha ao fazer login");
        return;
      }
      
      // Redireciona após login bem-sucedido
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
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
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Senha
            </label>
            <Link 
              href="/auth/password-reset" 
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              Esqueceu a senha?
            </Link>
          </div>
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
        
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link 
            href="/auth/register" 
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
} 