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
  title: "BrightHome - Buy & Rent Properties in Pakistan",
  description:
    "Explore top real estate listings in Peshawar and Islamabad with Brighthome. Find houses, apartments, and commercial properties for sale and rent.",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  applicationName: "Brighthome",
  openGraph: {
    siteName: "Brighthome",
    locale: "en-US",
    countryName: "Pakistan",
    phoneNumbers: "03339393045",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
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
