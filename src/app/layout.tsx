import { ReactNode } from "react";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";

import { Providers } from "@/components/providers";

import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Issue Viewer",
  description: "View issues from any GitHub repository",
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${monaSans.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
