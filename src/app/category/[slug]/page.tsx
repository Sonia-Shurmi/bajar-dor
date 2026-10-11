
import CategoryProducts from "@/components/CategoryProducts";
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

const CategoryPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const response = await fetch(
    `${API_URL}/products?category=${encodeURIComponent(slug)}`
  );

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
        <Link
          href="/"
          className="text-sm text-green-700 hover:underline"
        >
          ← হোমপেজ
        </Link>

        <h1 className="mt-4 text-3xl font-bold">
          {categoryName} পণ্য
        </h1>

        <p className="mt-2 text-gray-500">
          এই ক্যাটাগরির সব পণ্যের বর্তমান বাজারদর।
        </p>
      </div>

      {/* One product list with sorting */}
      <CategoryProducts products={products} />
    </main>
  );
};

export default CategoryPage;
