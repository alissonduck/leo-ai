import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

// Lista de rotas públicas (que não requerem autenticação)
const publicRoutes = ["/login", "/register", "/register/success"];

export async function middleware(request: NextRequest) {
  // Atualiza a sessão do Supabase
  const response = await updateSession(request);
  
  // Obtém o caminho da URL
  const pathname = request.nextUrl.pathname;
  
  // Verifica se é uma rota de API ou é uma rota pública
  if (pathname.startsWith("/api") || publicRoutes.some(route => pathname.startsWith(route))) {
    return response;
  }

  // Obtém o cookie de sessão
  const hasSession = request.cookies.has("sb-session");
  
  // Se não tiver sessão e estiver tentando acessar uma rota protegida, redireciona para o login
  if (!hasSession) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  return response;
}

// Define as rotas que o middleware deve processar
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (SEO files)
     * - public directory (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$).*)",
  ],
};
