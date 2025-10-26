import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import React from "react";

export default async function Protected({
  children,
}: {
  children: React.ReactNode;
}) {
  const ok = await isAuthenticated();

  if (!ok) {
    redirect("/login");
  }

  return <>{children}</>;
}
