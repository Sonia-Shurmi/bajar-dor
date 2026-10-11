import CategorySection from "@/components/CategorySection";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <ProductSections></ProductSections>
    </div>
  );
}
