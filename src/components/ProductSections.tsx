import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

const toBanglaNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const formatUnit = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    gm: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  };

  return units[unit.toLowerCase()] ?? unit;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-2xl border border-green-100 bg-white p-4 transition hover:-translate-y-1 hover:border-primary hover:shadow-lg"
    >
      <div className="mb-4 flex h-24 items-center justify-center rounded-xl bg-[#F3FBF4] text-5xl">
        {product.image || product.categoryIcon || "🛒"}
      </div>

      <h3 className="text-lg font-semibold text-base-content">
        {product.nameBn}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        প্রতি {formatUnit(product.unit)}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-green-100 pt-3">
        <p className="text-xl font-bold text-primary">
          {toBanglaNumber(product.today)} টাকা
        </p>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            product.change.dir === "up"
              ? "bg-green-100 text-green-800"
              : product.change.dir === "down"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {product.change.dir === "up" ? (
            <ArrowUpRight size={14} />
          ) : product.change.dir === "down" ? (
            <ArrowDownRight size={14} />
          ) : null}

          {product.change.dir === "up"
            ? "+"
            : product.change.dir === "down"
              ? "-"
              : ""}
          {toBanglaNumber(product.change.pct)}%
        </span>
      </div>
    </Link>
  );
};

const ProductSections = async () => {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const result = await response.json();

  const products: Product[] = Array.isArray(result)
    ? result
    : result.data ?? result.products ?? [];

  const risingProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <main className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
      {/* Products with Rising Prices */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            আজ দাম বেড়েছে{" "}
            <span className="text-green-700">▲</span>
          </h2>

          <p className="mt-2 text-gray-500">
            যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
          </p>
        </div>

        {risingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {risingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-6 text-gray-500">
            দাম বৃদ্ধির তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* Products with Falling Prices */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            আজ দাম কমেছে{" "}
            <span className="text-red-600">▼</span>
          </h2>

          <p className="mt-2 text-gray-500">
            যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে
          </p>
        </div>

        {fallingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fallingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-6 text-gray-500">
            দাম হ্রাসের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      {/* All Products */}
      <section
        id="সব-পণ্য"
        className="scroll-mt-24"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            সব পণ্য
          </h2>

          <p className="mt-2 text-gray-500">
            নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে দেখুন
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-6 text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </main>
  );
};

export default ProductSections;
