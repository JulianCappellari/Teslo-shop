import type { Metadata } from "next";

import "./globals.css";
import { inter } from "@/config/fonts";
import { Providers } from "@/components";




export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: 'Inicio - Teslo | Shop'
  },
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>

      <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
