# Webspires — Next.js Frontend

Headless WordPress + Next.js 14 setup.

- **Frontend**: webspires.com.pk (Next.js on Vercel)
- **Backend/CMS**: admin.webspires.com.pk (WordPress on Cloudways)

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- WordPress REST API (headless)
- Vercel (hosting)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in your values in .env.local

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/                    # Next.js App Router pages
  layout.tsx            # Root layout (Navbar + Footer)
  page.tsx              # Home
  /about/               # About page
  /services/            # Services page
  /portfolio/           # Portfolio page
  /team/                # Team page
  /blogs/               # Blog index + [slug] dynamic posts
  /contact-us/          # Contact page
  /terms-and-conditions/
  /privacy-policy/
  /api/contact/         # Contact form API route
  sitemap.ts            # Auto-generated sitemap
  robots.ts             # Robots.txt

components/
  /ui/                  # Shared: Navbar, Footer, ContactForm, WhatsAppWidget
  /home/                # Homepage sections
  /blog/                # Blog components

lib/
  wordpress.ts          # All WordPress API fetch functions

types/
  wordpress.ts          # TypeScript types for WP API
```

## WordPress Setup (admin.webspires.com.pk)

Make sure these are enabled on your WordPress install:

1. **REST API** — enabled by default in WordPress
2. **CORS headers** — add to `functions.php` or use a plugin:

```php
add_action('init', function() {
  header("Access-Control-Allow-Origin: https://webspires.com.pk");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
});
```

3. **Yoast SEO or Rank Math** — for SEO meta in API responses
4. **Featured images** on blog posts — used for blog thumbnails

## Blog Revalidation (ISR)

Blog posts revalidate every 3600 seconds (1 hour). To trigger instant revalidation when you publish a post in WordPress:

1. Install **WP Webhooks** plugin
2. Point it to: `https://webspires.com.pk/api/revalidate`
3. Create `/app/api/revalidate/route.ts`:

```ts
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }
  revalidatePath("/blogs");
  revalidatePath("/blogs/[slug]", "page");
  return NextResponse.json({ revalidated: true });
}
```

## Contact Form

The contact form hits `/api/contact`. Currently it logs to console. To activate:

**Option 1 — Resend (recommended):**
```bash
npm install resend
```
Uncomment the Resend block in `/app/api/contact/route.ts` and add `RESEND_API_KEY` to Vercel env vars.

**Option 2 — Formspree:**
Point the form fetch directly to your Formspree endpoint.

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# NEXT_PUBLIC_WP_API_URL=https://admin.webspires.com.pk/wp-json/wp/v2
# RESEND_API_KEY=your_key
```

## Customisation Checklist

- [ ] Replace placeholder team data in `/app/team/page.tsx`
- [ ] Replace placeholder portfolio data in `/app/portfolio/page.tsx` with real projects
- [ ] Update client logos in `/components/home/ClientLogos.tsx`
- [ ] Add actual logo image to `/public/` and update Navbar
- [ ] Add hero background image to `/public/hero-bg.jpg`
- [x] Update WhatsApp number in `/components/ui/WhatsAppWidget.tsx`
- [ ] Update contact email/phone in `/app/contact-us/page.tsx`
- [ ] Set up contact form (Resend or Formspree)
- [ ] Add `og-image.jpg` to `/public/` for social sharing
- [ ] Update CORS headers on WordPress
- [ ] Configure custom domain on Vercel (webspires.com.pk)
