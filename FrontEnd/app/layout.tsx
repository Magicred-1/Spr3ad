import DynamicWagmiProvider from "@/lib/utils/DynamicWagmiProvider";
import "./globals.css";
import { lexend } from "@/components/utils/const";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spr3ad",
  description:
    "Spr3ad is a decentralized social media platform powered by the AI.",
  icons: {
    icon: "/defaultProfile.jpg",
    apple: "/defaultProfile.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DynamicWagmiProvider>
        <body className={`overflow-hidden w-full h-screen ${lexend.className}`}>
          {children}
        </body>
      </DynamicWagmiProvider>
    </html>
  );
}
