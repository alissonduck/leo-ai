"use client";

import { cn } from "@/lib/utils";

/**
 * Componente que exibe o progresso de preenchimento dos steps
 * Mostra os passos concluídos, atuais e pendentes
 */
interface ProgressStepsProps {
  /**
   * Etapa atual do formulário
   */
  currentStep: number;
  
  /**
   * Total de etapas no formulário
   */
  totalSteps: number;
  
  /**
   * Porcentagem de conclusão (0-100)
   */
  progressPercentage: number;
}

export function ProgressSteps({
  currentStep,
  totalSteps,
  progressPercentage,
}: ProgressStepsProps) {
  // Criar array com o número de etapas para iterar
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="mb-8">
      {/* Título e subtítulo */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold mb-1">
          {currentStep === 1 && "dados do usuário"}
          {currentStep === 2 && "dados da empresa"}
        </h2>
        <p className="text-sm text-gray-500">
          Etapa {currentStep} de {totalSteps}
        </p>
      </div>

      {/* Barra de progresso */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Indicadores de etapas */}
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                step < currentStep
                  ? "bg-primary text-primary-foreground border-primary"
                  : step === currentStep
                  ? "border-primary text-primary"
                  : "border-gray-300 text-gray-400 bg-gray-50"
              )}
            >
              {step < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                step
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-1",
                step <= currentStep ? "text-primary font-medium" : "text-gray-500"
              )}
            >
              {step === 1 ? "Usuário" : "Empresa"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 