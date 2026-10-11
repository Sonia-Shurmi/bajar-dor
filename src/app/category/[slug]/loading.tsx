
export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-9 w-56" />
        <div className="skeleton h-4 w-72 max-w-full" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-base-200 p-4"
          >
            <div className="skeleton mb-4 h-28 w-full rounded-xl" />
            <div className="skeleton mb-3 h-5 w-3/4" />
            <div className="skeleton mb-5 h-4 w-1/2" />
            <div className="skeleton h-6 w-2/3" />
          </div>
        ))}
      </div>
    </main>
  );
}
