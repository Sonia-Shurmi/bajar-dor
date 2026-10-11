
export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-[#F3FBF4] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Back link placeholder */}
        <div className="skeleton mb-6 h-5 w-28" />

        <div className="grid grid-cols-1 gap-8 rounded-2xl border border-[#05893E]/10 bg-white p-5 sm:p-8 lg:grid-cols-2 lg:gap-12">
          {/* Image placeholder */}
          <div className="skeleton h-64 w-full rounded-2xl sm:h-80 lg:h-[420px]" />

          {/* Product information placeholders */}
          <div className="space-y-5 py-2">
            <div className="skeleton h-5 w-32" />
            <div className="skeleton h-10 w-3/4" />
            <div className="skeleton h-5 w-1/2" />

            <div className="rounded-xl bg-[#F3FBF4] p-5">
              <div className="skeleton h-8 w-40" />
              <div className="skeleton mt-4 h-4 w-28" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="skeleton h-20 rounded-xl" />
              <div className="skeleton h-20 rounded-xl" />
            </div>

            <div className="skeleton h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  );
}