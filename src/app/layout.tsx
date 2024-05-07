import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Transition } from "@/components/transition";
import { Toaster } from "@/components/ui/sonner";
import { Wrapper } from "@/components/wrapper";

import { Providers } from "./providers";
import "@/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Kyaria",
    absolute: "Kyaria",
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
        className={cn(
          "flex min-h-screen flex-col font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <div className="fixed left-0 top-0 -z-10 h-full w-full">
            <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#2563eb_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#2563eb_100%)]" />
          </div>

          <Wrapper>
            <Header />

            <Transition>{children}</Transition>
          </Wrapper>

          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
