"use server"; // <- Embora chame uma Server Action, pode ser marcado aqui também

import { checkRegistrationStatus as checkRegistrationStatusServer } from "../server/auth-check-server";

/**
 * Serviço para verificar o status de autenticação e registro.
 * Chama a Server Action correspondente.
 */
export async function checkRegistrationStatus() {
  // Simplesmente repassa a chamada para a Server Action
  return checkRegistrationStatusServer();
} 