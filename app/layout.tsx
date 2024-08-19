import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IdeAI",
  description: "Ignite your imagination, automate your creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#C8ACD6", fontSize: "16px" },
        layout: {
          logoImageUrl: "/logo.svg",
          socialButtonsVariant: "iconButton",
        },
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        </head>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
