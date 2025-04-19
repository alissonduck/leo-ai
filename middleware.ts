import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

/**
 * Middleware para verificar a autenticação do usuário
 * Redireciona para a página de login se o usuário não estiver autenticado
 * em rotas protegidas.
 * A lógica para redirecionar usuários JÁ autenticados para fora das páginas
 * de autenticação é feita nas próprias páginas (ex: /auth/login/page.tsx).
 */
export async function middleware(req: NextRequest) {
  // Tenta atualizar a sessão do usuário e obter a resposta base
  const response = await updateSession(req);

  // Buscar o cookie de sessão do Supabase APÓS a tentativa de atualização
  // para a lógica de decisão abaixo.
  const supabaseCookies = req.cookies.getAll();
  const hasAuthCookie = supabaseCookies.some(cookie => 
    cookie.name.startsWith('sb-') && 
    (cookie.name.includes('-auth-token') || cookie.name.includes('-access-token'))
  );

  // Lista de rotas protegidas que exigem autenticação
  const protectedRoutes = ['/dashboard', '/profile', '/settings', '/projects', '/companies'];

  const isRootPath = req.nextUrl.pathname === '/';
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  // Redirecionar a rota raiz com base no status de autenticação
  if (isRootPath) {
    // Se tem cookie, vai pro dashboard, senão pra login
    const redirectUrl = hasAuthCookie 
      ? new URL('/dashboard', req.url)
      : new URL('/auth/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Se tentar acessar rota protegida SEM cookie (na requisição original),
  // redireciona para login. Isso é crucial para segurança.
  if (isProtectedRoute && !hasAuthCookie) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Para todas as outras rotas (incluindo /auth/login, /auth/register, etc.)
  // simplesmente retorna a resposta do updateSession.
  // Se updateSession limpou um cookie inválido, a resposta conterá essa instrução.
  // Se a sessão é válida, as próprias páginas de auth (/auth/login/page.tsx) farão
  // o redirecionamento server-side para /dashboard se necessário.
  return response;
}

/**
 * Configuração do middleware - definindo em quais rotas ele será executado
 */
export const config = {
  matcher: [
    '/',
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
