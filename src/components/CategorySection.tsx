import Link from "next/link";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
};

const CategorySection = async () => {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("ক্যাটাগরির তথ্য লোড করা যায়নি।");
  }

  const result = await response.json();

  const products: Product[] = Array.isArray(result)
    ? result
    : result.data ?? result.products ?? [];

  // Get each category only once
  const categories = products.filter(
    (product, index) =>
      products.findIndex(
        (item) => item.category === product.category
      ) === index
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-base-content sm:text-3xl">
          পণ্যের ক্যাটাগরি
        </h2>

        <p className="mt-2 text-gray-500">
          আপনার প্রয়োজনীয় পণ্যটি সহজেই খুঁজে নিন
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.category}
              href={`/category/${category.category}`}
              className="group flex flex-col items-center justify-center rounded-2xl border border-green-100 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-green-600 hover:shadow-md"
            >
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F3FBF4] text-3xl transition group-hover:scale-110">
                {category.categoryIcon || "🛒"}
              </div>

              <h3 className="font-semibold text-base-content group-hover:text-green-700">
                {category.categoryNameBn}
              </h3>
            </Link>
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-white p-6 text-gray-500">
          কোনো ক্যাটাগরি পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
};

export default CategorySection;
