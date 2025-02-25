"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/general/Logo";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open-padding");
    } else {
      document.body.classList.remove("menu-open-padding");
    }
  }, [menuOpen]);

  return (
    <div className="bg-blue-950 flex justify-between items-center w-full py-2 px-8 rounded-b-lg mb-4">
      <Logo />
      <div className="hidden md:flex items-center">
        {[
          { name: "Discover", link: "/app" },
          { name: "Create Cards", link: "/post" },
          { name: "Profile", link: "/profile" },
        ].map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="text-white p-2 hover:bg-blue-900 text-xl"
          >
            {item.name || ""}
          </a>
        ))}
      </div>
      <div className="hidden md:flex items-center">
        <DynamicWidget />
      </div>
      <div className="md:hidden flex items-center">
        <Sheet
          open={menuOpen}
          onOpenChange={(opened: any) => {
            setMenuOpen(opened);
          }}
        >
          <SheetTrigger asChild>
            <button
              onClick={toggleMenu}
              className="text-white text-2xl focus:outline-none"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </SheetTrigger>
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          <SheetContent className="bg-blue-950">
            <div className="absolute top-16 left-0 w-full bg-blue-950 flex flex-col items-center md:hidden">
              {[
                { name: "Feed", link: "/app" },
                { name: "Post", link: "/post" },
                { name: "Profile", link: "/profile" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="text-white p-2 hover:bg-blue-900 text-xl w-full text-center"
                >
                  {item.name}
                </Link>
              ))}
              <DynamicWidget />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-blue-950 flex flex-col items-center md:hidden">
                    {[
                        { name: "Feed", link: "/" },
                        { name: "Post", link: "/post" },
                        { name: "Profile", link: "/profile" },
                    ].map((item, index) => (
                        <a key={index} href={item.link} className="text-white p-2 hover:bg-blue-900 text-xl w-full text-center">
                            {item.name}
                        </a>
                    ))}
                </div>
            )} */}
    </div>
  );
}

export default Header;
