import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // Simplification maximale pour débogage Vercel (Next.js 16)
  return NextResponse.next();
};

