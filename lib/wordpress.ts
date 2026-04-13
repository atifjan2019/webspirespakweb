import { WPPost, WPPage, WPMedia } from "@/types/wordpress";

const WP_API = process.env.NEXT_PUBLIC_WP_API_URL || "https://wordpress-1196470-4364598.cloudwaysapps.com/wp-json/wp/v2";

async function fetchWP<T>(endpoint: string, revalidate = 3600): Promise<T> {
  const res = await fetch(`${WP_API}${endpoint}`, {
    next: { revalidate },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} for ${endpoint}`);
  }

  return res.json();
}

// ─── Posts ───────────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<WPPost[]> {
  return fetchWP<WPPost[]>(
    "/posts?_embed&per_page=100&status=publish",
    3600
  );
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchWP<WPPost[]>(
    `/posts?slug=${slug}&_embed&status=publish`,
    3600
  );
  return posts[0] || null;
}

export async function getRecentPosts(count = 3): Promise<WPPost[]> {
  return fetchWP<WPPost[]>(
    `/posts?_embed&per_page=${count}&status=publish&orderby=date&order=desc`,
    3600
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<WPPost[]> {
  return fetchWP<WPPost[]>(
    "/projects?_embed&per_page=100&status=publish",
    3600
  );
}

export async function getProjectBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchWP<WPPost[]>(
    `/projects?slug=${slug}&_embed&status=publish`,
    3600
  );
  return posts[0] || null;
}

// ─── Pages ───────────────────────────────────────────────────────────────────

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await fetchWP<WPPage[]>(`/pages?slug=${slug}&_embed`, 86400);
  return pages[0] || null;
}

// ─── Media ───────────────────────────────────────────────────────────────────

export async function getMediaById(id: number): Promise<WPMedia | null> {
  try {
    return await fetchWP<WPMedia>(`/media/${id}`, 86400);
  } catch {
    return null;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function getFeaturedImage(post: WPPost): string | null {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
}

export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || "Webspires";
}

export function getPostCategories(post: WPPost): string[] {
  const categories: string[] = [];

  // 1. Try to fetch from embedded terms (Wait, WP REST API might return 401 rest_forbidden_context)
  if (post._embedded && post._embedded["wp:term"]) {
    const validTerms = post._embedded["wp:term"].flat().filter(term => term && !term.code);
    const validCats = validTerms.filter(term => term.taxonomy === "categories" || term.taxonomy === "project_category");
    categories.push(...validCats.map(cat => cat.name));
  }

  // 2. Fallback to extracting from class_list (e.g., "categories-web-development")
  if (categories.length === 0 && post.class_list) {
    const classCats = post.class_list
      .filter((c) => c.startsWith("categories-") || c.startsWith("project_category-"))
      .map((c) => {
        let name = c.replace(/^(categories-|project_category-)/, "");
        // Capitalize and replace dashes
        return name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
      });
    categories.push(...classCats);
  }

  if (categories.length === 0) return ["Uncategorized"];
  
  // Return unique categories
  return Array.from(new Set(categories));
}
