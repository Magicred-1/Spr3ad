import DynamicWagmiProvider from "@/lib/utils/DynamicWagmiProvider";
import "./globals.css";
import { lexend } from "@/components/utils/const";
import Footer from "@/components/layout-components/Footer";
import { Metadata } from "next";
import Header from "../components/layout-components/Header";

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
        <body className={` h-full flex flex-col ${lexend.className}`}>
          <Header />
          <div className="flex-1 container h-full items-center justify-center ">
            {children}
          </div>
          <Footer />
        </body>
      </DynamicWagmiProvider>
    </html>
  );
}
