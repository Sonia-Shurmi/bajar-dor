export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3FBF4] px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#05893E]">
          404
        </h1>
        <p className="mt-4 text-xl font-semibold text-[#1D271F]">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </p>
        <a href="/" className="mt-6 inline-block text-[#05893E] underline">
          হোমপেজে ফিরে যান
        </a>
      </div>
    </main>
  );
}