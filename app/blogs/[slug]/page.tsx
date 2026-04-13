import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  formatDate,
  getFeaturedImage,
  getAuthorName,
} from "@/lib/wordpress";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) return {};

  const seo = post.yoast_head_json;
  const image = getFeaturedImage(post);

  return {
    title: seo?.title || post.title.rendered,
    description: seo?.description,
    openGraph: {
      title: seo?.title || post.title.rendered,
      description: seo?.description,
      images: image ? [{ url: image }] : [],
    },
  };
}

export const revalidate = 3600;

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) notFound();

  const image = getFeaturedImage(post);
  const author = getAuthorName(post);

  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      {/* Hero image */}
      {image && (
        <div className="relative h-64 sm:h-96 w-full overflow-hidden">
          <Image
            src={image}
            alt={post.title.rendered}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/40 to-brand-dark" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-brand-gray mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-white transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-white truncate"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>

        {/* Title */}
        <h1
          className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-6"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Meta */}
        <div className="flex items-center gap-4 text-brand-gray text-sm mb-12 pb-8 border-b border-white/10">
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-heading font-bold text-xs">
            {author[0]}
          </div>
          <span>{author}</span>
          <span className="text-white/20">|</span>
          <span>{formatDate(post.date)}</span>
        </div>

        {/* Content */}
        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-brand-red hover:text-white font-heading font-semibold text-sm transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5m7-7l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
