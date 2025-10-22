import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    // cria resposta padrão
    const res = NextResponse.json({ success: true });

    // define cookie de auth
    res.cookies.set({
      name: "auth",
      value: "mock-auth-token",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia
      httpOnly: false,
      sameSite: "none", // necessário em rede local (nome de máquina, IP, etc.)
      secure: false, // para ambiente local sem HTTPS
    });

    return res;
  } catch (err) {
    return NextResponse.json({ error: "Erro ao fazer login (mock)." }, { status: 500 });
  }
}
