import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/ui/Chatbot";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans antialiased bg-white text-gray-900"
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
