"use client";

import Spline from '@splinetool/react-spline';
import Header from "@/components/layout-components/Header";
import Footer from "@/components/layout-components/Footer";
import {
  BentoGrid,
  Cell,
  CELLS_4,
  GRID_STYLES,
} from "@/components/ui/bento-grid-many";
import { cn } from "@/lib/utils";
import Illustration1 from "@/public/illustration1.png";
import Illustration2 from "@/public/illustration2.png";
import Illustration3 from "@/public/illustration3.png";
import Illustration4 from "@/public/illustration4.png";
import { Heart, Earth, HandCoins, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// Define the illustrations array
const illustrations = [Illustration1, Illustration2, Illustration3, Illustration4];

const buttonTexts = [
  { icon: <ArrowRight className="inline-block mr-2" />, text: "Join the community" },
  { icon: <Heart className="inline-block mr-2" />, text: "Post what you love" },
  { icon: <Earth className="inline-block mr-2" />, text: "Browse interesting content" },
  { icon: <HandCoins className="inline-block mr-2" />, text: "Start spreading" },
];

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 tracking-wider">
          <h1 className="text-6xl font-bold">
            Make your content spread
          </h1>
          <p className="text-2xl mt-4">The new way to make your content viral in a decentralized flavour</p>
          <Button
            className="mt-8"
            variant={"outline"}
            onClick={() => {
              router.push("/app");
            }}
          >Get Started</Button>
        </div>
        <Spline
          scene="https://prod.spline.design/GzQFnTdbQCeOpknA/scene.splinecode"
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div className="text-center text-4xl font-bold mx-20 mb-10">
        <BentoGrid>
          {CELLS_4.map((n, i) => (
            <div
              key={n}
              className={cn(
                GRID_STYLES,
                i === 2 && "md:col-span-4",
                i === 2 && "md:col-start-1 md:col-span-3",
                i === 1 && "md:col-start-2 md:col-span-4"
              )}
            >
              <Cell
                title={`Title ${n}`}
                description={`Description for cell ${n}`}
                illustration={illustrations[i % illustrations.length]}
                buttonText={buttonTexts[i % buttonTexts.length]}
              />
            </div>
          ))}
        </BentoGrid>
      </div>
    </>
  );
}
