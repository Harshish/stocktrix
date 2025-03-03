import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import { AppContextProvider } from "@/store/AppContext";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Market analysis made simple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppContextProvider>
            <div className="flex flex-col items-center min-h-screen space-y-2 bg-gradient-to-r from-[#fffd00] via-[#ace80b] to-[#4fcf2c] dark:bg-gradient-to-r  dark:from-[#051937] dark:via-[#004d7a] dark:to-[#00393d]">
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </div>
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
