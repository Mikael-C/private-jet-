import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/ui/Chatbot";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SKYVANTAGE | Private Jet Charter — A Higher Perspective on Travel",
  description:
    "Private jet charter, shaped around you. Travel on your terms, with every detail considered. SKYVANTAGE — a higher perspective on private travel.",
  keywords: [
    "private jet charter",
    "private aviation",
    "jet charter",
    "business jet",
    "luxury aviation",
    "private flight booking",
    "SKYVANTAGE",
  ],
  openGraph: {
    title: "SKYVANTAGE | Private Jet Charter",
    description: "Your time. Your destination. Your private sky.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-body antialiased bg-white text-gray-900`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
