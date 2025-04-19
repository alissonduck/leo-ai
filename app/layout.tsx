import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
} 