import Link from "next/link";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

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
  markets: Market[];
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

const toBanglaNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const ProductPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const result = await response.json();

  const products: Product[] = Array.isArray(result)
    ? result
    : result.data ?? result.products ?? [];

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">
          পণ্যটি খুঁজে পাওয়া যায়নি।
        </h1>

        <Link
          href="/"
          className="mt-5 inline-block font-semibold text-green-700 hover:underline"
        >
          হোমপেজে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        {" / "}
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        {" / "}
        {product.nameBn}
      </div>

      <section className="grid gap-8 rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-8 md:grid-cols-2">
        <div className="flex min-h-64 items-center justify-center rounded-2xl bg-[#F3FBF4] text-8xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div>
          <p className="text-sm font-medium text-green-700">
            {product.categoryNameBn}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-base-content">
            {product.nameBn}
          </h1>

          <p className="mt-2 text-gray-500">
            প্রতি {product.unit}
          </p>

          <div className="mt-6 rounded-xl bg-[#F3FBF4] p-5">
            <p className="text-sm text-gray-600">
              আজকের বাজারদর
            </p>

            <p className="mt-2 text-3xl font-bold text-green-700">
              {toBanglaNumber(product.today)} টাকা
            </p>

            <p
              className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                product.change?.dir === "up"
                  ? "bg-red-100 text-red-700"
                  : product.change?.dir === "down"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
              }`}
            >
              {product.change?.dir === "up"
                ? "▲ দাম বেড়েছে "
                : product.change?.dir === "down"
                  ? "▼ দাম কমেছে "
                  : "দাম অপরিবর্তিত "}
              {toBanglaNumber(product.change?.pct ?? 0)}%
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-bold">
          দামের ইতিহাস
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "আজকের দাম", price: product.today },
            { label: "গতকালের দাম", price: product.yesterday },
            { label: "গত সপ্তাহের দাম", price: product.lastWeek },
            { label: "গত মাসের দাম", price: product.lastMonth },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-green-100 bg-white p-5"
            >
              <p className="text-sm text-gray-500">
                {item.label}
              </p>

              <p className="mt-2 text-xl font-bold">
                {toBanglaNumber(item.price)} টাকা
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-bold">
          বাজারভিত্তিক দাম
        </h2>

        {product.markets?.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-green-100 bg-white">
            <table className="w-full text-left">
              <thead className="bg-[#F3FBF4]">
                <tr>
                  <th className="p-4">বাজার</th>
                  <th className="p-4">বিভাগ</th>
                  <th className="p-4">সর্বনিম্ন</th>
                  <th className="p-4">সর্বোচ্চ</th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t border-green-100"
                  >
                    <td className="p-4">{market.market}</td>
                    <td className="p-4">{market.division}</td>
                    <td className="p-4 font-semibold text-green-700">
                      {toBanglaNumber(market.min)} টাকা
                    </td>
                    <td className="p-4 font-semibold text-green-700">
                      {toBanglaNumber(market.max)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-xl bg-white p-5 text-gray-500">
            বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>

      <Link
        href={`/category/${product.category}`}
        className="mt-8 inline-block rounded-lg bg-[#05893E] px-5 py-3 font-semibold text-white transition hover:bg-green-800"
      >
        ← {product.categoryNameBn} ক্যাটাগরিতে ফিরে যান
      </Link>
    </main>
  );
};

export default ProductPage;