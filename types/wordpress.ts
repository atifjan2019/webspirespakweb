export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  class_list?: string[];
  meta?: {
    year?: string;
    country?: string;
    logo?: string;
    link?: string;
    services?: Record<string, string>;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
      media_details: { width: number; height: number };
    }>;
    author?: Array<{ name: string; avatar_urls: { "96": string } }>;
    "wp:term"?: Array<any>;
  };
  yoast_head_json?: {
    title: string;
    description: string;
    og_image?: Array<{ url: string }>;
  };
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  modified: string;
  yoast_head_json?: {
    title: string;
    description: string;
  };
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: { width: number; height: number };
}
