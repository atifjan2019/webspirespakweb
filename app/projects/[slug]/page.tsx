import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProjects,
  getProjectBySlug,
  getFeaturedImage,
  getPostCategories,
} from "@/lib/wordpress";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};

  const seo = project.yoast_head_json;
  const image = getFeaturedImage(project);

  return {
    title: seo?.title || project.title.rendered,
    description: seo?.description,
    openGraph: {
      title: seo?.title || project.title.rendered,
      description: seo?.description,
      images: image ? [{ url: image }] : [],
    },
  };
}

export const revalidate = 3600;

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const image = getFeaturedImage(project);
  const categories = getPostCategories(project);

  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      {/* Hero image for project */}
      {image && (
        <div className="relative h-64 sm:h-[500px] w-full overflow-hidden">
          <Image
            src={image}
            alt={project.title.rendered}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-brand-gray mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-white transition-colors">
            Portfolio
          </Link>
          <span>/</span>
          <span 
            className="text-brand-red font-semibold tracking-wide truncate"
            dangerouslySetInnerHTML={{ __html: project.title.rendered }}
          />
        </div>

        {/* Header content */}
        <div className="mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <span key={cat} className="bg-brand-red/10 text-brand-red border border-brand-red/20 px-4 py-1.5 rounded-full text-xs font-heading font-semibold tracking-widest uppercase">
                {cat}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h1
            className="font-heading font-extrabold text-4xl sm:text-6xl text-white leading-tight"
            dangerouslySetInnerHTML={{ __html: project.title.rendered }}
          />

          {/* Meta Information (Custom Fields) */}
          {(project.meta?.year || project.meta?.country || project.meta?.services) && (
            <div className="mt-8 flex flex-wrap gap-6 items-center bg-brand-dark-2/50 border border-white/5 p-6 rounded-2xl backdrop-blur-md">
              {project.meta.year && (
                <div className="flex flex-col">
                  <span className="text-brand-gray text-[10px] uppercase tracking-wider mb-1">Year</span>
                  <span className="text-white font-heading font-bold text-lg">{project.meta.year}</span>
                </div>
              )}
              {project.meta.country && (
                <>
                  <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
                  <div className="flex flex-col">
                    <span className="text-brand-gray text-[10px] uppercase tracking-wider mb-1">Country</span>
                    <span className="text-white font-heading font-bold text-lg">{project.meta.country}</span>
                  </div>
                </>
              )}
              {project.meta.services && Object.entries(project.meta.services).some(([_, val]) => val === 'true') && (
                <>
                  <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
                  <div className="flex flex-col">
                    <span className="text-brand-gray text-[10px] uppercase tracking-wider mb-2">Services Provided</span>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(project.meta.services)
                        .filter(([_, val]) => val === 'true')
                        .map(([serviceName]) => (
                          <span key={serviceName} className="text-brand-gray-light bg-black/30 border border-white/5 text-xs px-3 py-1 rounded-md">
                            {serviceName}
                          </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* WordPress Project Content Wrapper */}
        <div className="wp-content bg-brand-dark-2 p-8 sm:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Decorator Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 blur-[100px] pointer-events-none rounded-full" />
          
          <div
            className="relative z-10"
            dangerouslySetInnerHTML={{ __html: project.content.rendered }}
          />
        </div>

        {/* Back link */}
        <div className="mt-20 pt-8 border-t border-white/10 flex justify-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 text-brand-gray hover:text-white font-heading font-semibold text-lg transition-colors duration-300"
          >
            <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-brand-red flex items-center justify-center group-hover:bg-brand-red/10 transition-all duration-300">
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
