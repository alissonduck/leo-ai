import { redirect } from "next/navigation";

/**
 * Página principal da aplicação
 * Redireciona para o dashboard para usuários autenticados
 * ou para a página de login para usuários não autenticados
 */
export default function HomePage() {
  redirect("/auth/login");
} 