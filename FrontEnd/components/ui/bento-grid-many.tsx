"use client";

import Image, { StaticImageData } from "next/image";
import { clx } from "@/lib/utils/clx/clx-merge";
import { Button } from "./button";
import { useRouter } from "next/navigation";
// Define constants for different cell configurations
export const CELLS_4 = [1, 2, 3, 4] as const;
export const CELLS_5 = [1, 2, 3, 4, 5] as const;
export const CELLS_6 = [1, 2, 3, 4, 5, 6] as const;

// Define the props type for the Cell component
interface CellProps {
  title: string;
  description: string;
  illustration: StaticImageData;
  buttonText: { icon: JSX.Element; text: string };
}

// Define the Cell component with proper typings
export const Cell = ({ title, description, illustration, buttonText }: CellProps) => {
  const router = useRouter();

  return (
    <CellPattern>
      <div className="w-full">
        <Image src={illustration} alt={title} layout="responsive" objectFit="contain" />
      </div>
      {/* <div className="p-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg">{description}</p>
      </div> */}
      <Button variant={"ghost"} className="w-full"
        onClick={
          () => router.push("/app")
        }>
        {buttonText.icon}
        {buttonText.text}
      </Button>
    </CellPattern>
  );
};

// Define the grid components using the clx utility
export const BentoGrid = clx.div("grid md:grid-cols-4 gap-2");
export const Bento6 = clx.div("grid sm:grid-cols-2 md:grid-cols-4 gap-2");

// Define the CellPattern component using the clx utility
export const CellPattern = clx.div(
  "size-full rounded-lg center card-color text-xl text-white"
);

// Define a constant for grid styles
export const GRID_STYLES = "p-1 rounded-lg h-50";
