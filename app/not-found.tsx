import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-heading font-extrabold text-[8rem] sm:text-[12rem] text-brand-dark-3 leading-none select-none">
          404
        </p>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white -mt-8 mb-4">
          Page Not Found
        </h1>
        <p className="text-brand-gray text-lg mb-10 max-w-sm mx-auto">
          That page doesn&apos;t exist. You might have the wrong URL.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-heading font-semibold px-8 py-3.5 rounded transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
