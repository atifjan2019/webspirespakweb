import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Webspires — who we are, what we stand for, and why businesses choose us as their digital partner.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="text-brand-red font-heading font-semibold text-sm uppercase tracking-widest mb-3">
              About Us
            </p>
            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl text-white leading-tight mb-6">
              We&apos;re Builders,
              <br />
              Not Talkers
            </h1>
            <p className="text-brand-gray text-lg leading-relaxed mb-6">
              Webspires is a digital marketing agency focused on one thing:
              growing businesses through high-performance websites and
              forward-thinking marketing. We don&apos;t believe in fluff,
              vanity metrics, or locking clients into contracts that don&apos;t
              deliver.
            </p>
            <p className="text-brand-gray text-lg leading-relaxed">
              We specialise in GEO (Generative Engine Optimisation) — getting
              your business visible in AI search results before your competitors
              even know the game has changed.
            </p>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-brand-dark-2 border border-white/5 overflow-hidden flex items-center justify-center">
              <div className="text-center p-12">
                <div className="w-56 h-20 relative flex items-center justify-center mx-auto mb-4">
                  <Image src="/logo.png" alt="Webspires Logo" fill className="object-contain" />
                </div>
                <p className="text-brand-gray text-sm mt-2">
                  Your Reliable Digital Partner
                </p>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-brand-red/20 rounded-2xl" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-red/10 rounded-xl" />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-8">
            <div className="w-10 h-10 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8192C" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-white text-xl mb-3">
              Our Mission
            </h3>
            <p className="text-brand-gray leading-relaxed">
              To help businesses of all sizes compete and win online by
              delivering websites and marketing strategies that generate real,
              measurable growth — not just impressions and clicks.
            </p>
          </div>

          <div className="bg-brand-dark-2 border border-white/5 rounded-2xl p-8">
            <div className="w-10 h-10 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8192C" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-white text-xl mb-3">
              Our Vision
            </h3>
            <p className="text-brand-gray leading-relaxed">
              To be the agency businesses trust when the digital landscape
              shifts. We stay ahead of every change — from traditional SEO to
              AI search — so our clients never fall behind.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="font-heading font-extrabold text-4xl text-white mb-12">
            What We Stand For
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Transparency",
                desc: "You always know what we're doing and why. No jargon, no hiding, no surprises.",
              },
              {
                title: "Ownership",
                desc: "Everything we build belongs to you. No lock-in. No holding your site hostage.",
              },
              {
                title: "Results",
                desc: "We measure success in revenue, leads, and growth — not vanity metrics.",
              },
              {
                title: "Speed",
                desc: "We move fast without cutting corners. You don't need to wait 6 months to see impact.",
              },
              {
                title: "Innovation",
                desc: "We stay ahead of the curve so our clients benefit before the market catches up.",
              },
              {
                title: "Partnership",
                desc: "We're not a vendor. We're invested in your success like it's our own.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="border-l-2 border-brand-red pl-5 py-1"
              >
                <h4 className="font-heading font-bold text-white mb-1">
                  {v.title}
                </h4>
                <p className="text-brand-gray text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-red rounded-2xl p-12 text-center">
          <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-4">
            Work With Us
          </h3>
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Ready to partner with a team that&apos;s genuinely invested in your
            growth?
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-white text-brand-red font-heading font-bold px-10 py-4 rounded hover:bg-white/90 transition-colors duration-200"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </div>
  );
}
