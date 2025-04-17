"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { 
  UserRegistrationData, 
  CompanyRegistrationData, 
  RegisterFormState 
} from "../types";
import { userRegistrationSchema, companyRegistrationSchema } from "../schema";

import { registerUser, registerCompany } from "../service";

/**
 * Hook para gerenciar o registro de usuários e empresas
 * Fornece estado, validação e mutações para o formulário de registro
 */
export function useRegister() {
  const router = useRouter();

  // Estado para o formulário de registro em etapas
  const [formState, setFormState] = useState<RegisterFormState>({
    user: {
      email: "",
      password: "",
      full_name: "",
    },
    company: {
      name: "",
      domain: "",
      description: "",
    },
    currentStep: 1,
    totalSteps: 2,
  });

  // Estado para armazenar o ID do usuário após o registro
  const [userId, setUserId] = useState<string | null>(null);

  // Mutação para registro de usuário
  const userMutation = useMutation({
    mutationFn: async (userData: UserRegistrationData) => {
      return await registerUser(userData);
    },
    onSuccess: (data) => {
      if (data.success && data.userId) {
        setUserId(data.userId);
        nextStep();
      }
    },
  });

  // Mutação para registro de empresa
  const companyMutation = useMutation({
    mutationFn: async (companyData: CompanyRegistrationData) => {
      if (!userId) {
        throw new Error("ID do usuário não encontrado");
      }
      return await registerCompany(companyData, userId);
    },
    onSuccess: (data) => {
      if (data.success) {
        // Redirecionar para página de sucesso/dashboard
        router.push("/dashboard");
      }
    },
  });

  // Funções para navegação entre etapas
  const nextStep = () => {
    if (formState.currentStep < formState.totalSteps) {
      setFormState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    }
  };

  const prevStep = () => {
    if (formState.currentStep > 1) {
      setFormState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }));
    }
  };

  // Funções para atualizar dados do formulário
  const updateUserData = (userData: Partial<UserRegistrationData>) => {
    setFormState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...userData,
      },
    }));
  };

  const updateCompanyData = (companyData: Partial<CompanyRegistrationData>) => {
    setFormState((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        ...companyData,
      },
    }));
  };

  // Funções de submissão para cada etapa
  const submitUserRegistration = async () => {
    try {
      // Validar dados do usuário
      const validatedUserData = userRegistrationSchema.parse(formState.user);
      
      // Iniciar mutação para registrar usuário
      userMutation.mutate(validatedUserData);
    } catch (error) {
      console.error("Erro de validação:", error);
      // Erros de validação são tratados pelo hook form
    }
  };

  const submitCompanyRegistration = async () => {
    try {
      // Validar dados da empresa
      const validatedCompanyData = companyRegistrationSchema.parse(formState.company);
      
      // Iniciar mutação para registrar empresa
      companyMutation.mutate(validatedCompanyData);
    } catch (error) {
      console.error("Erro de validação:", error);
      // Erros de validação são tratados pelo hook form
    }
  };

  // Retornar estado e funções para o componente
  return {
    formState,
    userMutation,
    companyMutation,
    nextStep,
    prevStep,
    updateUserData,
    updateCompanyData,
    submitUserRegistration,
    submitCompanyRegistration,
    progressPercentage: (formState.currentStep / formState.totalSteps) * 100,
  };
} 