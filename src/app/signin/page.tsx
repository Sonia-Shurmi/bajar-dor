
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Sign in failed");
        return;
      }

      toast.success("Signed in successfully!");

    const params = new URLSearchParams(window.location.search);
const callbackUrl = params.get("callbackUrl");

const destination =
  callbackUrl &&
  callbackUrl.startsWith("/") &&
  !callbackUrl.startsWith("//")
    ? callbackUrl
    : "/";

window.location.replace(destination);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-center text-3xl font-bold text-[#05893E]">
            Sign In
          </h1>

          <p className="text-center text-base-content/70">
            Welcome back to Bajar Dor!
          </p>

          <form onSubmit={handleSignIn} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Email address</span>
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-full border-none bg-[#05893E] text-white hover:bg-[#046f32]"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#05893E] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
