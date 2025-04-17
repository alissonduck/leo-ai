"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CompanyRegistrationData } from "../types";
import { companyRegistrationSchema } from "../schema";

/**
 * Componente de formulário para o segundo passo do registro
 * Coleta informações da empresa
 */
interface CompanyFormProps {
  /**
   * Dados iniciais da empresa
   */
  initialData: CompanyRegistrationData;
  
  /**
   * Callback chamado quando o formulário é enviado
   */
  onSubmit: (data: CompanyRegistrationData) => void;
  
  /**
   * Callback chamado quando o usuário volta para o passo anterior
   */
  onBack: () => void;
  
  /**
   * Se o formulário está sendo enviado
   */
  isSubmitting: boolean;
  
  /**
   * Mensagem de erro, se houver
   */
  error?: string;
}

export function CompanyForm({
  initialData,
  onSubmit,
  onBack,
  isSubmitting,
  error,
}: CompanyFormProps) {
  // Configuração do formulário com react-hook-form e zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyRegistrationData>({
    resolver: zodResolver(companyRegistrationSchema),
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

      {/* Nome da empresa */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Nome da empresa
        </label>
        <Input
          id="name"
          placeholder="Digite o nome da empresa"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Domínio */}
      <div className="space-y-2">
        <label
          htmlFor="domain"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Domínio (opcional)
        </label>
        <Input
          id="domain"
          placeholder="exemplo.com.br"
          {...register("domain")}
        />
        {errors.domain && (
          <p className="text-sm text-red-500 mt-1">{errors.domain.message}</p>
        )}
      </div>

      {/* Descrição */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Descrição (opcional)
        </label>
        <Textarea
          id="description"
          placeholder="Descreva brevemente sua empresa"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Botões de navegação */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="sm:flex-1"
          disabled={isSubmitting}
        >
          Voltar
        </Button>
        <Button 
          type="submit" 
          className="sm:flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Finalizar Cadastro"}
        </Button>
      </div>
    </form>
  );
} 