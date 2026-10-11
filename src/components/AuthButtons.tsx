"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, UserRound, LogOut } from "lucide-react";
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

    router.replace("/");
    router.refresh();
  };

  if (isPending) {
    return <div className="h-8 w-32" />;
  }

  if (session?.user) {
    return (
      <div className="dropdown dropdown-end">
        <button
          type="button"
          tabIndex={0}
          className="btn btn-sm rounded-full btn-outline gap-2"
          aria-label="Open account menu"
        >
          <UserRound size={16} />
          <span className="max-w-32 truncate">
            {session.user.name || session.user.email}
          </span>
          <ChevronDown size={15} />
        </button>

        <ul
          tabIndex={0}
          className="menu dropdown-content z-50 mt-3 w-64 rounded-box border border-base-300 bg-base-100 p-3 shadow-xl"
        >
          <li className="pointer-events-none mb-2">
            <div className="flex flex-col items-start gap-1 whitespace-normal">
              <span className="font-semibold text-base-content">
                {session.user.name || "ব্যবহারকারী"}
              </span>
              <span className="break-all text-xs text-base-content/60">
                {session.user.email}
              </span>
            </div>
          </li>

          <div className="divider my-1" />

          <li>
            <Link href="/profile">
              <UserRound size={17} />
              My Profile
            </Link>
          </li>

          <li>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-error"
            >
              <LogOut size={17} />
              সাইন আউট
            </button>
          </li>
        </ul>
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