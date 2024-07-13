"use client";

import Header from "@/components/layout-components/HeaderSimple";
import Footer from "@/components/layout-components/Footer";
import {
  BentoGrid,
  Cell,
  CELLS_4,
  GRID_STYLES,
} from "@/components/ui/bento-grid-many";
import { cn } from "@/lib/utils";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
export default function Home() {
  const { data: hash, sendTransaction } = useSendTransaction();

  const testTx = () => {
    sendTransaction({
      to: "0xDc10426c370aE5a3Ab124124A8837C695C3bbC90",
      value: parseEther("0"),
    });
  };
  return (
    <div>
      <Header />
      <div className="text-center text-4xl font-bold mt-20">
        <Button onClick={testTx}>Test Transaction</Button>
        <DynamicWidget />

        <BentoGrid>
          {CELLS_4.map((n, i) => (
            <div
              key={n}
              className={cn(
                GRID_STYLES,
                i === 1 && "md:col-span-3",
                i === 2 && "md:col-start-1",
                i === 1 && "md:col-start-2 md:col-span-4"
              )}
            >
              <Cell i={i + 1} />
            </div>
          ))}
        </BentoGrid>
      </div>
      <Footer />
    </div>
  );
}
