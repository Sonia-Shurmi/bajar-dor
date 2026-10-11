"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ShoppingCart, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const image = String(formData.get("image") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!name || !email || !password) {
      toast.error("অনুগ্রহ করে প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        ...(image ? { image } : {}),
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    setIsSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || `${provider} দিয়ে সাইন আপ করা যায়নি।`
        );
        setIsSocialLoading(null);
      }
    } catch {
      toast.error("সামাজিক মাধ্যমে সাইন আপ করা যায়নি।");
      setIsSocialLoading(null);
    }
  };

  return (
    <main className="min-h-[calc(100vh-160px)] bg-[#F3FBF4] px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        {/* Brand */}
        <Link
          href="/"
          className="mb-6 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={32} className="text-[#05893E]" />
          <span className="text-2xl font-bold text-[#05893E]">
            বাজার দর
          </span>
        </Link>

        {/* Signup Card */}
        <section className="rounded-2xl border border-[#05893E]/15 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold text-[#1D271F] sm:text-3xl">
              সাইন আপ করুন
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#1D271F]/65">
              বাজারদরের সর্বশেষ তথ্য দেখতে আপনার অ্যাকাউন্ট তৈরি করুন।
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-semibold text-[#1D271F]"
              >
                আপনার নাম <span className="text-red-600">*</span>
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="আপনার পুরো নাম লিখুন"
                required
                maxLength={100}
                className="input h-12 w-full border-gray-300 bg-white text-[#1D271F] outline-none focus:border-[#05893E] focus:outline-1 focus:outline-[#05893E]"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="mb-1.5 block text-sm font-semibold text-[#1D271F]"
              >
                প্রোফাইল ছবির URL{" "}
                <span className="font-normal text-gray-500">
                  (ঐচ্ছিক)
                </span>
              </label>

              <input
                id="image"
                name="image"
                type="url"
                autoComplete="url"
                placeholder="https://example.com/image.jpg"
                className="input h-12 w-full border-gray-300 bg-white text-[#1D271F] outline-none focus:border-[#05893E] focus:outline-1 focus:outline-[#05893E]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-[#1D271F]"
              >
                ইমেইল ঠিকানা <span className="text-red-600">*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="আপনার ইমেইল লিখুন"
                required
                className="input h-12 w-full border-gray-300 bg-white text-[#1D271F] outline-none focus:border-[#05893E] focus:outline-1 focus:outline-[#05893E]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-[#1D271F]"
              >
                পাসওয়ার্ড <span className="text-red-600">*</span>
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                minLength={8}
                required
                className="input h-12 w-full border-gray-300 bg-white text-[#1D271F] outline-none focus:border-[#05893E] focus:outline-1 focus:outline-[#05893E]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isSocialLoading !== null}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#05893E] px-4 font-semibold text-white transition hover:bg-[#046F32] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && (
                <LoaderCircle size={18} className="animate-spin" />
              )}
              {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={isLoading || isSocialLoading !== null}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 font-medium text-[#1D271F] transition hover:bg-gray-50 disabled:opacity-60"
            >
              {isSocialLoading === "google" ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <span className="text-lg font-bold">G</span>
              )}
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={isLoading || isSocialLoading !== null}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 font-medium text-[#1D271F] transition hover:bg-gray-50 disabled:opacity-60"
            >
              {isSocialLoading === "github" ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <span className="text-lg font-bold">G</span>
              )}
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-[#1D271F]/75">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#05893E] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignUpPage;
