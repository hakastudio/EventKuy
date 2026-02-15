import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventKuy - Tiket Event & Konser Pilihan", // <--- Nama Baru
  description: "Platform tiket event termurah dan terpercaya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-bg-main text-text-main antialiased`}>
        {children}
      </body>
    </html>
  );
}