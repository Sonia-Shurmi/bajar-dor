
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign out failed:", error.message);
      return;
    }

    router.refresh();
  };

  if (isPending) {
    return <div className="h-8 w-32" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <span className="max-w-32 truncate text-sm font-medium">
          {session.user.name || session.user.email}
        </span>

        <button
          type="button"
          onClick={handleSignOut}
          className="btn btn-sm rounded-full btn-outline"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  return (
    <>
      <Link
        href="/signin"
        className="btn btn-sm btn-outline rounded-full"
      >
        সাইন ইন
      </Link>

      <Link href="/signup" className="btn rounded-full">
        সাইন আপ
      </Link>
    </>
  );
}
