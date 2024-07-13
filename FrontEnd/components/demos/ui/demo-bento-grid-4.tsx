import { clx } from "@/lib/utils/clx/clx-merge";
import { cn } from "@/lib/utils/core/cn";
import {
  BentoGrid,
  CELLS_4,
  Cell,
  GRID_STYLES,
} from "@/components/ui/bento-grid-many";

export default function DemoBentoGrid4() {
  const DemoTitle = clx.p("text-xl font-bold");

  return (
    <div className="py-4 flex flex-col gap-6 w-full max-w-[800px]">
      <DemoTitle>Variant 1</DemoTitle>
      <Bento_4_v1 />
      <DemoTitle>Variant 2</DemoTitle>
      <Bento_4_v2 />
      <DemoTitle>Variant 3</DemoTitle>
      <Bento_4_v3 />
      <DemoTitle>Variant 4</DemoTitle>
      <Bento_4_v4 />
    </div>
  );
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     ✨ FUNCTIONS ✨                        */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

// VARIANT 1
function Bento_4_v1() {
  return (
    <BentoGrid>
      {CELLS_4.map((n, i) => (
        <div
          key={n}
          className={cn(
            GRID_STYLES,
            i === 0 && "md:col-span-3",
            i === 2 && "md:col-start-1",
            i === 3 && "md:col-start-2 md:col-span-4",
          )}
        >
          <Cell i={i + 1} />
        </div>
      ))}
    </BentoGrid>
  );
}

// VARIANT 2
function Bento_4_v2() {
  return (
    <div>
      <BentoGrid>
        {CELLS_4.map((n, i) => (
          <div
            key={n}
            className={cn(
              GRID_STYLES,
              i === 0 && "md:col-span-3",
              i > 1 && "md:col-span-2",
            )}
          >
            <Cell i={i + 1} />
          </div>
        ))}
      </BentoGrid>
    </div>
  );
}

// VARIANT 3
function Bento_4_v3() {
  return (
    <div>
      <BentoGrid>
        {CELLS_4.map((n, i) => (
          <div
            key={n}
            className={cn(
              GRID_STYLES,
              i === 0 && "md:col-start-1 ",
              i === 1 && "md:col-span-2",
              i === 2 && "md:col-start-4",
              i === 3 && "md:col-span-4",
            )}
          >
            <Cell i={i + 1} />
          </div>
        ))}
      </BentoGrid>
    </div>
  );
}

// VARIANT 4
function Bento_4_v4() {
  return (
    <div>
      <BentoGrid>
        {CELLS_4.map((n, i) => (
          <div
            key={n}
            className={cn(
              GRID_STYLES,
              i === 0 && "md:col-span-3 md:row-span-4 md:h-full",
              i === 1 && "md:col-start-4",
              i === 2 && "md:col-start-4",
              i === 3 && "md:col-start-4",
            )}
          >
            <Cell i={i + 1} />
          </div>
        ))}
      </BentoGrid>
    </div>
  );
}
