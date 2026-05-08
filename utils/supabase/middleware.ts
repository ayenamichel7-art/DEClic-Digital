import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Si Supabase n'est pas configuré ou contient des placeholders, on laisse passer sans rien faire
    if (!supabaseUrl || !supabaseKey || !supabaseUrl.startsWith('https://')) {
      return NextResponse.next();
    }

    let supabaseResponse = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      },
    );

    // Tentative de récupération de l'utilisateur (refresh le token si présent)
    // On ne bloque pas si ça échoue
    await supabase.auth.getUser();

    return supabaseResponse;
  } catch (e) {
    // En cas d'erreur critique dans le middleware, on laisse quand même passer la requête
    console.error("Middleware error:", e);
    return NextResponse.next();
  }
};

