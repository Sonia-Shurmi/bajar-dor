
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const user = session.user;

  return (
    <main className="mx-auto min-h-[70vh] max-w-4xl px-4 py-12">
      <div className="card border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center sm:items-start sm:text-left">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-content">
            {(user.name || user.email).charAt(0).toUpperCase()}
          </div>

          <h1 className="mt-4 text-3xl font-bold text-primary">
            আমার প্রোফাইল
          </h1>

          <p className="text-base-content/70">
            Welcome to your Bajar Dor account!
          </p>

          <div className="mt-6 w-full space-y-4">
            <div className="rounded-lg bg-base-200 p-4">
              <p className="text-sm text-base-content/60">Name</p>
              <p className="mt-1 font-semibold">
                {user.name || "Not provided"}
              </p>
            </div>

            <div className="rounded-lg bg-base-200 p-4">
              <p className="text-sm text-base-content/60">Email address</p>
              <p className="mt-1 break-all font-semibold">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
