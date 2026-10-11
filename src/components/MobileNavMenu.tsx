
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AuthButtons from "@/components/AuthButtons";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface Props {
  categories: Category[];
}

export default function MobileNavMenu({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        className="btn btn-ghost btn-square"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute right-0 top-full z-50 mt-2 w-[min(90vw,360px)] rounded-2xl border border-base-300 bg-base-100 p-4 shadow-xl"
        >
          <nav aria-label="মোবাইল নেভিগেশন">
            <Link
              href="/"
              onClick={closeMenu}
              className="block rounded-lg px-3 py-3 font-semibold text-primary hover:bg-base-200"
            >
              🛒 সব পণ্য
            </Link>

            <div className="my-2 border-t border-base-200" />

            <p className="px-3 py-2 text-xs font-semibold text-base-content/60">
              পণ্যের ক্যাটাগরি
            </p>

            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  onClick={closeMenu}
                  className="flex min-w-0 items-center gap-2 rounded-lg bg-base-200/60 px-3 py-3 text-sm transition hover:bg-primary/10 hover:text-primary"
                >
                  <span>{category.icon}</span>
                  <span className="break-words">
                    {category.nameBn}
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          <div className="my-4 border-t border-base-200" />

          <div className="flex flex-wrap items-center gap-2 [&_a]:!no-underline">
            <AuthButtons />
          </div>
        </div>
      )}
    </div>
  );
}
