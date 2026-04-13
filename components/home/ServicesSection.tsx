import Link from "next/link";
import { servicesData } from "@/lib/data/services";

export default function ServicesSection() {
  return (
    <section className="bg-brand-dark py-32 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mb-6">
            Everything You Need to{" "}
            <span className="text-brand-red">Grow</span>
          </h2>
          <p className="text-brand-gray text-lg">
            We don&apos;t just build websites; we build scalable digital growth engines. 
            Whatever your business goals, we have the setup to achieve them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <Link
              href={`/services/${service.slug}`}
              key={service.title}
              className="group bg-brand-dark-2 hover:bg-brand-dark-3 border border-white/5 hover:border-brand-red/30 rounded-xl p-8 transition-all duration-300 flex flex-col items-start block"
            >
              <div 
                className="w-12 h-12 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red mb-6"
                dangerouslySetInnerHTML={{ __html: service.icon }}
              />
              <h3 className="font-heading font-bold text-white text-xl mb-3 group-hover:text-brand-red transition-colors duration-200">
                {service.title}
              </h3>
              <p className="text-brand-gray text-base leading-relaxed mb-6 flex-grow">
                {service.shortDescription}
              </p>
              <div className="text-brand-red text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all mt-auto pt-4 border-t border-white/5 w-full">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-heading font-semibold px-8 py-3.5 rounded transition-colors duration-200"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
