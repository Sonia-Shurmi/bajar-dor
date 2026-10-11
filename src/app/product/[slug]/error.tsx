
"use client";

import { useEffect } from "react";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#F3FBF4] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#05893E]/15 bg-white p-6 text-center shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-[#1D271F]">
          পণ্যের তথ্য লোড করা যায়নি
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#1D271F]/70">
          দুঃখিত! সাময়িক সমস্যা হয়েছে। আবার চেষ্টা করুন।
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#05893E] px-5 py-3 font-semibold text-white transition hover:bg-[#046F32] sm:w-auto"
        >
          আবার চেষ্টা করুন
        </button>

        <a
          href="/"
          className="mt-4 block text-sm font-semibold text-[#05893E] hover:underline"
        >
          হোমপেজে ফিরে যান
        </a>
      </div>
    </main>
  );
}