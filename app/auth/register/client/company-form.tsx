"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CompanyRegistrationData } from "../types";
import { companyRegistrationSchema } from "../schema";
import { useState } from "react";
import { formatCNPJ, removeCNPJFormat } from "@/utils/format";

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
  // Estado local para o valor formatado do CNPJ
  const [displayCNPJ, setDisplayCNPJ] = useState(
    initialData.cnpj ? formatCNPJ(initialData.cnpj) : ""
  );

  // Configuração do formulário com react-hook-form e zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CompanyRegistrationData>({
    resolver: zodResolver(companyRegistrationSchema),
    defaultValues: initialData,
  });

  // Função para lidar com a mudança no input de CNPJ
  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatCNPJ(inputValue);
    setDisplayCNPJ(formattedValue);
    
    // Atualiza o valor no formulário (apenas números)
    setValue("cnpj", removeCNPJFormat(formattedValue));
  };

  // Função personalizada para submeter o formulário
  const onFormSubmit = (data: CompanyRegistrationData) => {
    // Garantir que o CNPJ seja apenas números antes de enviar
    const formData = {
      ...data,
      cnpj: data.cnpj ? removeCNPJFormat(data.cnpj) : "",
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
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

      {/* CNPJ */}
      <div className="space-y-2">
        <label
          htmlFor="cnpj"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          CNPJ
        </label>
        <Input
          id="cnpj"
          placeholder="XX.XXX.XXX/XXXX-XX"
          value={displayCNPJ}
          onChange={handleCNPJChange}
        />
        <input type="hidden" {...register("cnpj")} />
        {errors.cnpj && (
          <p className="text-sm text-red-500 mt-1">{errors.cnpj.message}</p>
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