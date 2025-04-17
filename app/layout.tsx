import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autenticação - Leo.ai",
  description: "Plataforma de gestão de produtos digitais com inteligência artificial",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Leo.ai</h1>
          <p className="text-sm text-gray-600 mt-2">
            Plataforma de gestão de produtos com IA
          </p>
        </div>
        {children}
      </div>
    </div>
  );
} 