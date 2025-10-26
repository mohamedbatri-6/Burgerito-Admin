import { cookies } from "next/headers";

const ADMIN_EMAIL = "admin@burgerito.io";
const ADMIN_PWD = "admin123";
const ADMIN_COOKIE = "burgerito_admin_auth";

interface LoginBody {
  email: string;
  pwd: string;
}

async function readBody(req: Request): Promise<LoginBody> {
  let email = "";
  let pwd = "";

  try {
    const raw = await req.json();
    if (
      typeof raw === "object" &&
      raw !== null &&
      "email" in raw &&
      "pwd" in raw
    ) {
      const e = (raw as { email: unknown }).email;
      const p = (raw as { pwd: unknown }).pwd;

      if (typeof e === "string") email = e.trim();
      if (typeof p === "string") pwd = p.trim();
    }
  } catch {
    // ignore parse errors -> email/pwd restent vides
  }

  return { email, pwd };
}

export async function POST(req: Request) {
  const { email, pwd } = await readBody(req);

  const valid = email === ADMIN_EMAIL && pwd === ADMIN_PWD;

  if (valid) {
    // crée le cookie de "session admin"
    const jar = await cookies();
    jar.set({
      name: ADMIN_COOKIE,
      value: "ok",
      httpOnly: true,
      sameSite: "strict",
      secure: false, // false = autorisé en http://localhost
      path: "/",
    });

    // réponse JSON succès
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // mauvais identifiants
  return new Response(JSON.stringify({ ok: false }), {
    status: 401,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
