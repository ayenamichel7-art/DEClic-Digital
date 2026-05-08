import crypto from 'crypto';
import { NextResponse } from 'next/server';

/**
 * Compare deux chaînes de manière sécurisée (timing-safe)
 * pour prévenir les attaques par timing.
 */
function safeCompare(a: string, b: string): boolean {
  try {
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

/**
 * Vérifie l'authentification Basic Auth pour les routes admin.
 * Retourne `null` si l'authentification est valide,
 * ou une `NextResponse` 401/500 à renvoyer immédiatement.
 */
export function requireAdminAuth(req: Request): NextResponse | null {
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;

  if (!adminUser || !adminPass) {
    return NextResponse.json(
      { error: 'Admin credentials not configured' },
      { status: 500 }
    );
  }

  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Access denied', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const [user, pass] = Buffer.from(base64Credentials, 'base64')
    .toString('utf-8')
    .split(':');

  if (!safeCompare(user, adminUser) || !safeCompare(pass, adminPass)) {
    return new NextResponse('Access denied', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' },
    });
  }

  // Auth valide
  return null;
}
