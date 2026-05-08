import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware minimal — laisse passer toutes les requêtes.
  // La logique Supabase SSR est gérée côté serveur dans les API routes.
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
