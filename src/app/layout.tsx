import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "JetElite | Luxury Private Jet Charter & Booking",
  description:
    "Experience unparalleled luxury in private aviation. Book your private jet charter with JetElite — seamless booking, world-class fleet, and bespoke travel experiences.",
  keywords: [
    "private jet",
    "charter flights",
    "luxury aviation",
    "jet booking",
    "private aviation",
    "jet charter",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-body antialiased bg-slate-50 dark:bg-jet-950 text-jet-950 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
