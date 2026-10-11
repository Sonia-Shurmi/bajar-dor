
const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-[#FAFCFA]">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-[#1D271F] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-medium">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-gray-500 sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
