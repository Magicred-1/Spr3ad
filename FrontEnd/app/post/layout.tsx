"use client";

import Footer from "@/components/layout-components/Footer";
import Header from "@/components/layout-components/Header";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex flex-col h-full">
            <Header />
            <div className="flex-1 container">
                {children}
            </div>
            <Footer />
        </div>
    );
}
