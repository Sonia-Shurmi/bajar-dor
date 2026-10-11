
"use client";

import { useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type Props = {
  products: Product[];
};

const toBanglaNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

export default function CategoryProducts({ products }: Props) {
  const [sortOrder, setSortOrder] = useState("default");

  // Remove duplicate products by ID
  const uniqueProducts = products.filter(
    (product, index, self) =>
      index === self.findIndex((item) => item.id === product.id)
  );

  // Sort the unique products by price
  const sortedProducts = [...uniqueProducts].sort((a, b) => {
    if (sortOrder === "price-low") {
      return a.today - b.today;
    }

    if (sortOrder === "price-high") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          মোট {toBanglaNumber(sortedProducts.length)}টি পণ্য
        </p>

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          aria-label="পণ্য সাজানোর পদ্ধতি"
          className="select select-bordered w-full max-w-xs bg-white"
        >
          <option value="default">ডিফল্ট ক্রম</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="rounded-2xl border border-green-100 bg-white p-4 transition hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <div className="mb-4 flex h-28 items-center justify-center rounded-xl bg-[#F3FBF4] text-5xl">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <h2 className="text-lg font-semibold text-base-content">
                {product.nameBn}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {product.unit}
              </p>

              <div className="mt-4 flex items-center justify-between gap-2">
                <p className="text-xl font-bold text-primary">
                  {toBanglaNumber(product.today)} টাকা
                </p>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    product.change?.dir === "up"
                      ? "bg-red-100 text-red-700"
                      : product.change?.dir === "down"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {product.change?.dir === "up" ? "+" : ""}
                  {product.change?.dir === "down" ? "-" : ""}
                  {toBanglaNumber(product.change?.pct ?? 0)}%
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-[#F3FBF4] p-8 text-center">
          <p className="text-lg font-semibold">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </section>
  );
}
