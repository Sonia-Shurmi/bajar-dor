
import Link from "next/link";

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
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

const toBanglaNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD").format(value);

const CategoryPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const response = await fetch(`${API_URL}/products?category=${slug}`);

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const result = await response.json();

  const products: Product[] = Array.isArray(result)
    ? result
    : result.data ?? result.products ?? [];

  const categoryName = products[0]?.categoryNameBn ?? slug;

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/" className="text-sm text-green-700 hover:underline">
          ← হোমপেজ
        </Link>

        <h1 className="mt-4 text-3xl font-bold">
          {categoryName} পণ্য
        </h1>

        <p className="mt-2 text-gray-500">
          এই ক্যাটাগরির সব পণ্যের বর্তমান বাজারদর।
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="rounded-2xl border border-green-100 bg-white p-4 transition hover:border-green-600 hover:shadow-lg"
            >
              <div className="mb-4 flex h-28 items-center justify-center rounded-xl bg-[#F3FBF4] text-5xl">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <h2 className="text-lg font-semibold">
                {product.nameBn}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {product.unit}
              </p>

              <div className="mt-4 flex items-center justify-between gap-2">
                <p className="text-xl font-bold text-green-700">
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

          <p className="mt-2 text-sm text-gray-500">
            API থেকে পণ্যের তথ্য আসছে কি না, তা পরীক্ষা করতে হবে।
          </p>
        </div>
      )}
    </main>
  );
};

export default CategoryPage;
