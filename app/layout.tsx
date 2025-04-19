import type { Metadata } from "next";
import { AppProviders } from "@/app/auth/utils/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leo.ai - Plataforma de Gestão",
  description: "Plataforma de gestão de produtos digitais com inteligência artificial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}