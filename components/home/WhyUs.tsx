const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5+", label: "Years Experience" },
  { value: "24/7", label: "Support" },
];

const reasons = [
  {
    title: "Results First",
    description:
      "Every decision we make is tied to your business outcomes. We don't build things for the sake of it.",
  },
  {
    title: "AI-Ready Marketing",
    description:
      "We're ahead of the curve on GEO. While others are still doing old SEO, we're getting you into AI search results.",
  },
  {
    title: "No Lock-In",
    description:
      "You own everything we build. Your website, your content, your assets. We work for you, not to trap you.",
  },
  {
    title: "Transparent Reporting",
    description:
      "You always know what's happening with your campaigns. Clear reports, no jargon, no hiding behind vanity metrics.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-brand-dark-2 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading font-extrabold text-5xl text-brand-red mb-2">
                {stat.value}
              </div>
              <div className="text-brand-gray text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Header + reasons */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-brand-red font-heading font-semibold text-sm uppercase tracking-widest mb-3">
              Why Webspires
            </p>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight">
              We Don&apos;t Just
              <br />
              Build, We Grow
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="border-l-2 border-brand-red pl-4">
                <h4 className="font-heading font-bold text-white mb-2">
                  {r.title}
                </h4>
                <p className="text-brand-gray text-sm leading-relaxed">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
