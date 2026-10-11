
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import AuthButtons from "@/components/AuthButtons";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface Product {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export default async function Navbar() {
  let categories: Category[] = [];
  let products: Product[] = [];

  try {
    const [categoryRes, productRes] = await Promise.all([
      fetch(`${API_URL}/categories`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${API_URL}/products`, {
        next: { revalidate: 300 },
      }),
    ]);

    if (!categoryRes.ok || !productRes.ok) {
      throw new Error("Failed to fetch market data");
    }

    categories = await categoryRes.json();
    products = await productRes.json();
  } catch (error) {
    console.error("Navbar fetch error:", error);
  }

  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <header className="border-b border-base-300 bg-base-100 shadow-sm">
      {/* Brand and authentication */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <ShoppingCart size={34} className="text-primary" />

          <div>
            <h1 className="text-xl font-bold text-primary sm:text-2xl">
              বাজার দর
            </h1>
            <p className="text-xs text-base-content/65">{today}</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          <AuthButtons />
        </div>
      </div>

      {/* Category menu from Categories API */}
      <nav className="border-t border-base-200">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-1 overflow-x-auto px-4">
          <Link
            href="/"
            className="shrink-0 whitespace-nowrap px-4 py-3 text-sm font-semibold text-primary"
          >
            সব পণ্য
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-3 text-sm font-semibold text-base-content/70 transition hover:text-primary"
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Market price marquee */}
      <div className="bg-primary py-2 text-primary-content">
        <MarqueeText direction="left" duration={40} pauseOnHover={true}>
          {products.map((product) => (
            <span
              key={product.id}
              className="inline-flex items-center gap-2 whitespace-nowrap px-6"
            >
              <span>{product.image}</span>
              <span>{product.nameBn}</span>

              <span className="font-semibold">
                {new Intl.NumberFormat("bn-BD").format(product.today)}
                {" টাকা"}
              </span>

              <span>
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "●"}
              </span>

              <span>
                {new Intl.NumberFormat("bn-BD").format(
                  product.change.pct
                )}
                %
              </span>

              <span className="opacity-50">|</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </header>
  );
}
