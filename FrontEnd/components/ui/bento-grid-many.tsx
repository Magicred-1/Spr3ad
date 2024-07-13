import Image from "next/image";
import { clx } from "@/lib/utils/clx/clx-merge";
import Illustration1 from "@/public/illustration1.png";
import Illustration2 from "@/public/illustration2.png";
import Illustration3 from "@/public/illustration3.png";
import Illustration4 from "@/public/illustration4.png";

// Define constants for different cell configurations
export const CELLS_4 = [1, 2, 3, 4] as const;
export const CELLS_5 = [1, 2, 3, 4, 5] as const;
export const CELLS_6 = [1, 2, 3, 4, 5, 6] as const;

// Define the props type for the Cell component
interface CellProps {
  title: string;
  description: string;
  illustration: keyof typeof illustrations;
}

// Define illustrations mapping
const illustrations = {
  Illustration1,
  Illustration2,
  Illustration3,
  Illustration4,
};

// Define the Cell component with proper typings
export const Cell = ({ title, description, illustration }: CellProps) => {
  const illustrationSrc = illustrations[illustration];

  return (
    <CellPattern>
      <div className="w-full">
        <Image src={illustrationSrc} alt={title} layout="responsive" objectFit="contain" />
      </div>
      <div className="p-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
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
export const GRID_STYLES = "p-1 rounded-lg h-32";
