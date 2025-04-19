import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware para verificar a autenticação do usuário
 * Redireciona para a página de login se o usuário não estiver autenticado
 * em rotas protegidas e evita visitar páginas de autenticação quando já está logado
 */
export async function middleware(req: NextRequest) {
  // Lista de rotas protegidas que exigem autenticação
  const protectedRoutes = ['/dashboard', '/profile', '/settings', '/projects', '/companies'];
  // Lista de rotas de autenticação
  const authRoutes = ['/auth/login', '/auth/register', '/auth/password-reset'];

  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  // Buscar o cookie de sessão do Supabase (formato: sb-<id>-auth-token)
  const supabaseCookies = req.cookies.getAll();
  const hasAuthCookie = supabaseCookies.some(cookie => 
    cookie.name.startsWith('sb-') && 
    (cookie.name.includes('-auth-token') || cookie.name.includes('-access-token'))
  );

  // Verifica autenticação de forma simples com base na presença do cookie
  // Verificações mais robustas serão realizadas no Server Component
  if (isProtectedRoute && !hasAuthCookie) {
    // Redirecionar para login se não estiver autenticado
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (isAuthRoute && hasAuthCookie) {
    // Redirecionar para dashboard se já estiver autenticado
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

/**
 * Configuração do middleware - definindo em quais rotas ele será executado
 */
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/projects/:path*',
    '/companies/:path*',
    '/auth/:path*',
  ],
};
