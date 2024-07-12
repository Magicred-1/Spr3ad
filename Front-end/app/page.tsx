"use client";

import HeaderSimple from "@/components/layout-components/HeaderSimple";
import Footer from "@/components/layout-components/Footer";
import {
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
export default function Home() {
  return (
    <div>
      <HeaderSimple/>
      <Footer />
    </div>
  );
}
