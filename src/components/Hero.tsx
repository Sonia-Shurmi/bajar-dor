import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <section className="overflow-hidden bg-[#F3FBF4] py-12">
      <div className="rounded-lg bg-white mx-auto grid max-w-7xl items-center gap-5 px-5 py-12 sm:px-8 md:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        {/* Left Content */}
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#05893E]/20 bg-white px-4 py-2 text-sm font-medium text-[#05893E]">
            <span className="w-2 rounded-full bg-[#05893E]" />
            {today}
          </p>

          <h1 className="text-2xl leading-tight font-bold tracking-tight text-[#1D271F] sm:text-5xl lg:text-6xl">
            আজকের বাজারের দাম
            <span className="mt-2 block text-[#05893E]">
              এক নজরে
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="mt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#05893E] px-6 py-3.5 font-semibold text-white shadow-md transition hover:bg-[#046F32]"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <Image
            src="/bazar-hero.png"
            alt="বাজারদরের ব্যানার"
            width={300}
            height={300}
            priority
            className="h-[300px] w-full rounded-3xl object-cover sm:h-[400px] lg:h-[460px]"
        />
      </div>
    </section>
  );
};

export default Hero;