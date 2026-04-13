import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Projects delivered by Webspires — websites, digital marketing campaigns, and brand identities.",
};

// Replace with actual portfolio items or fetch from WP ACF/CPT
const projects = [
  {
    id: 1,
    title: "HyperWear",
    category: "Web Development",
    description: "E-commerce website for a performance apparel brand.",
    tags: ["Next.js", "E-commerce", "SEO"],
    image: null,
  },
  {
    id: 2,
    title: "Shahriyar",
    category: "Brand Identity + Web",
    description: "Full brand identity and website for a premium client.",
    tags: ["Branding", "WordPress", "SEO"],
    image: null,
  },
  {
    id: 3,
    title: "Project Three",
    category: "Digital Marketing",
    description: "Multi-channel digital marketing campaign with measurable ROI.",
    tags: ["PPC", "SEO", "GEO"],
    image: null,
  },
  {
    id: 4,
    title: "Project Four",
    category: "Web Development",
    description: "High-performance website with conversion rate optimisation.",
    tags: ["Next.js", "CRO", "Analytics"],
    image: null,
  },
];

const categories = ["All", "Web Development", "Digital Marketing", "Brand Identity"];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-brand-red font-heading font-semibold text-sm uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h1 className="font-heading font-extrabold text-5xl sm:text-6xl text-white leading-tight mb-6">
            Work That
            <br />
            Speaks for Itself
          </h1>
          <p className="text-brand-gray text-lg">
            A selection of projects we&apos;ve delivered. Real work, real
            results.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`font-heading font-semibold text-sm px-5 py-2 rounded-full border transition-all duration-200 ${
                cat === "All"
                  ? "bg-brand-red border-brand-red text-white"
                  : "border-white/20 text-brand-gray hover:border-white hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-brand-dark-2 border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className="relative h-56 bg-brand-dark-3 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-transparent" />
                <span className="font-heading font-bold text-white/10 text-5xl">
                  {project.title[0]}
                </span>
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-red/20 text-brand-red text-xs font-heading font-semibold px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-white text-xl mb-2 group-hover:text-brand-red transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-brand-gray text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-heading font-medium text-brand-gray-light bg-brand-dark-3 px-3 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-brand-gray text-lg mb-6">
            Want to be our next success story?
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-heading font-semibold px-10 py-4 rounded transition-colors duration-200"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </div>
  );
}
