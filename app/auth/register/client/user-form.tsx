"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRegistrationData } from "../types";
import { userRegistrationSchema } from "../schema";

/**
 * Componente de formulário para o primeiro passo do registro
 * Coleta informações básicas do usuário
 */
interface UserFormProps {
  /**
   * Dados iniciais do usuário
   */
  initialData: UserRegistrationData;
  
  /**
   * Callback chamado quando o formulário é enviado
   */
  onSubmit: (data: UserRegistrationData) => void;
  
  /**
   * Se o formulário está sendo enviado
   */
  isSubmitting: boolean;
  
  /**
   * Mensagem de erro, se houver
   */
  error?: string;
}

export function UserForm({
  initialData,
  onSubmit,
  isSubmitting,
  error,
}: UserFormProps) {
  // Configuração do formulário com react-hook-form e zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistrationData>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Exibir erro da API, se houver */}
      {error && (
        <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Nome completo */}
      <div className="space-y-2">
        <label
          htmlFor="full_name"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Nome completo
        </label>
        <Input
          id="full_name"
          placeholder="Digite seu nome completo"
          {...register("full_name")}
        />
        {errors.full_name && (
          <p className="text-sm text-red-500 mt-1">{errors.full_name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          E-mail
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Senha */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Senha
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Botão de envio */}
      <div className="pt-4">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Continuar"}
        </Button>
      </div>
    </form>
  );
} 