import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("auth");

  // 🚫 Bloqueia completamente a rota "/"
  if (pathname === "/") {
    // se tiver cookie de auth, vai pra /produtos
    if (authCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/produtos";
      return NextResponse.redirect(url);
    }

    // se não tiver cookie, vai pra /sign-in
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  // 🔒 Protege rotas privadas
  if (pathname.startsWith("/private")) {
    if (!authCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }

  // ✅ Deixa o resto passar normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/private/:path*"],
};
