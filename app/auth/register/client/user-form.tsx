"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserRegistrationData } from "../types";
import { userRegistrationSchema, UserRegistrationFormData } from "../schema";
import { formatPhone, removePhoneFormat } from "@/utils/format";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserRegistrationFormData>({
    resolver: zodResolver(userRegistrationSchema),
    mode: 'onSubmit',
    defaultValues: {
      ...initialData,
      confirmPassword: "",
      phone: initialData.phone || "",
    },
  });

  const initialPhoneValue = watch('phone');
  const [formattedPhone, setFormattedPhone] = useState<string>(() => 
    initialPhoneValue ? formatPhone(initialPhoneValue) : ""
  );

  useEffect(() => {
    const unformattedInitial = initialData.phone || "";
    setFormattedPhone(formatPhone(unformattedInitial));
  }, [initialData.phone]);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const digitsOnly = removePhoneFormat(rawValue);
    const maskedValue = formatPhone(digitsOnly);
    
    setFormattedPhone(maskedValue);
    setValue("phone", digitsOnly, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Exibir erro da API, se houver */}
      {error && (
        <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Nome completo */}
      <div className="space-y-1">
        <Label htmlFor="full_name">Nome completo</Label>
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
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
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

      {/* Telefone (opcional) */}
      <div className="space-y-1">
        <Label htmlFor="phone">WhatsApp</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(XX) XXXXX-XXXX"
          value={formattedPhone}
          onChange={handlePhoneChange}
          maxLength={15}
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Senha */}
      <div className="space-y-1">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="Mínimo 8 caracteres"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirmar Senha */}
      <div className="space-y-1">
        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Repita a senha"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
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