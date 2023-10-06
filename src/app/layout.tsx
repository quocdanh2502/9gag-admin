import { Providers } from "@/redux/redux-provider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import { NextAuthProvider } from "./next-auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "9GAG Back End",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NextAuthProvider>{children}</NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
