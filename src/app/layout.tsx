import type { Metadata } from "next";
// @ts-expect-error - Next autorise l'import CSS global par effet de bord
import "./globals.css";

export const metadata: Metadata = {
  title: "Burgerito Admin",
  description: "Admin panel Burgerito",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">{children}</body>
    </html>
  );
}
