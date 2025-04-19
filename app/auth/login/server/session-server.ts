"use server";

import { createClient } from "@/utils/supabase/server";

/**
 * Serviço de servidor para gerenciamento de sessão
 */

/**
 * Verifica se o usuário tem uma sessão ativa
 * @returns Objeto com a sessão do usuário, se existir
 */
export async function getSession() {
  const supabase = await createClient();
  return await supabase.auth.getSession();
}