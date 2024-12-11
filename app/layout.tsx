import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "auto",
  preload: true,
  variable: "--font-jost",
});
export const metadata: Metadata = {
  title: "Brighthome real estate",
  description: "build with nextjs ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${jost.className}`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
