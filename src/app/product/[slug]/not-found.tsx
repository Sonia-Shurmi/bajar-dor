
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F3FBF4] px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-[#05893E]/15 bg-white p-6 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3FBF4]">
          <ShoppingCart size={34} className="text-[#05893E]" />
        </div>

        <p className="mt-5 text-6xl font-extrabold text-[#05893E]">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-[#1D271F]">
          পণ্যটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-3 text-sm leading-7 text-[#1D271F]/70">
          দুঃখিত! এই পণ্যটি পাওয়া যায়নি অথবা ঠিকানাটি ভুল।
          অন্য পণ্য দেখতে হোমপেজে ফিরে যান।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#05893E] px-6 py-3 font-semibold text-white transition hover:bg-[#046F32] sm:w-auto"
        >
          হোমপেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}