import { cookies } from "next/headers";

const ADMIN_COOKIE = "burgerito_admin_auth";

interface MinimalCookieStore {
  get(name: string): { value: string } | undefined;
}

async function getCookieStore(): Promise<MinimalCookieStore> {
  const raw = cookies() as unknown;

  if (
    typeof raw === "object" &&
    raw !== null &&
    "get" in raw &&
    typeof (raw as Record<string, unknown>).get === "function"
  ) {
    return raw as MinimalCookieStore;
  }

  const awaited = (await raw) as unknown;

  if (
    typeof awaited === "object" &&
    awaited !== null &&
    "get" in awaited &&
    typeof (awaited as Record<string, unknown>).get === "function"
  ) {
    return awaited as MinimalCookieStore;
  }

  return {
    get() {
      return undefined;
    },
  };
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await getCookieStore();
  const session = store.get(ADMIN_COOKIE);
  return session?.value === "ok";
}
