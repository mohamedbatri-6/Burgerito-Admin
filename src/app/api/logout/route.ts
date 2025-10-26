import { cookies } from "next/headers";

const ADMIN_COOKIE = "burgerito_admin_auth";

export async function POST() {
  const jar = await cookies();

  // pour "déconnecter", on écrase le cookie avec une valeur vide et une expiration passée
  jar.set({
    name: ADMIN_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "strict",
    secure: false, // en prod -> true (https)
    path: "/",
    expires: new Date(0), // expire dans le passé
  });

  return new Response(
    JSON.stringify({ ok: true }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
