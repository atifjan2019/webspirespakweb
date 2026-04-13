import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 bg-brand-dark-2 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-brand-red font-heading font-semibold text-sm uppercase tracking-widest mb-4">
          Ready to Grow?
        </p>
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
          Let&apos;s Build Something
          <br />
          That Works
        </h2>
        <p className="text-brand-gray text-lg max-w-xl mx-auto mb-10">
          Stop leaving money on the table. Talk to us about your project and
          we&apos;ll tell you exactly how we can help.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact-us"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-dark text-white font-heading font-semibold px-10 py-4 rounded text-base transition-colors duration-200"
          >
            Get Started Today
          </Link>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center border border-white/20 hover:border-white text-white font-heading font-semibold px-10 py-4 rounded text-base transition-colors duration-200"
          >
            See Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
