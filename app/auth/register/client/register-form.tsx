"use client";

import { useRegister } from "../hooks";
import { ProgressSteps } from "./progress-steps";
import { UserForm } from "./user-form";
import { CompanyForm } from "./company-form";
import { UserRegistrationData, CompanyRegistrationData } from "../types";

/**
 * Componente principal de formulário de registro
 * Orquestra os diferentes passos do formulário e gerencia o estado
 */
export function RegisterForm() {
  // Utilizar o hook de registro
  const {
    formState,
    userMutation,
    companyMutation,
    prevStep,
    updateUserData,
    updateCompanyData,
    submitUserRegistration,
    submitCompanyRegistration,
    progressPercentage,
  } = useRegister();

  // Função para lidar com o envio do formulário de usuário
  const handleUserSubmit = (data: UserRegistrationData) => {
    updateUserData(data);
    submitUserRegistration();
  };

  // Função para lidar com o envio do formulário de empresa
  const handleCompanySubmit = (data: CompanyRegistrationData) => {
    updateCompanyData(data);
    submitCompanyRegistration();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Componente de progresso */}
      <ProgressSteps
        currentStep={formState.currentStep}
        totalSteps={formState.totalSteps}
        progressPercentage={progressPercentage}
      />

      {/* Renderizar o formulário adequado para a etapa atual */}
      {formState.currentStep === 1 && (
        <UserForm
          initialData={formState.user}
          onSubmit={handleUserSubmit}
          isSubmitting={userMutation.isPending}
          error={userMutation.error?.message}
        />
      )}

      {formState.currentStep === 2 && (
        <CompanyForm
          initialData={formState.company}
          onSubmit={handleCompanySubmit}
          onBack={prevStep}
          isSubmitting={companyMutation.isPending}
          error={companyMutation.error?.message}
        />
      )}
    </div>
  );
} 