import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// All legitimate top-level routes declared in sitemap.xml
const VALID_SITEMAP_ROUTES = new Set([
  '/',
  '/sell-car-abu-dhabi',
  '/sell-car-sharjah',
  '/car-valuation',
  '/we-buy-any-car',
  '/we-cash-any-car',
  '/blog',
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/terms-conditions',
  '/robots.txt',
  '/sitemap.xml',
]);

// Globally allowed advertising and analytics tracking parameters (safe on any page)
const ALLOWED_GLOBAL_PARAMS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'gclsrc',
  'dclid',
  'wbraid',
  'gbraid',
  'fbclid',
  'msclkid',
  'ttclid',
  'ref',
]);

// Parameters allowed exclusively on /blog
const ALLOWED_BLOG_PARAMS = new Set(['page', 'q']);

const GONE_BLOG_PATHS = new Set([
  // Legacy / discontinued blog posts flagged by client
  '/blog/fast-car-buyers-at-your-disposal',
  '/blog/sell-used-cars-in-dubai-online-safely-with-free-valuation',
  '/blog/best-online-car-buying-site',
  '/blog/best-places-to-sell-your-car-in-dubai',
  '/blog/8-common-mistakes-that-people-make-while-selling-their-used-car',
  '/blog/sell-your-car-with-quick-and-fair-cash-compensation',
  '/blog/we-can-buy-any-car-with-fair-price-',
  '/blog/we-can-buy-any-car-with-fair-price',
  '/blog/page/1',
  '/blog/page/2',
  '/blog/page/3',
  '/blog/how-to-sell-your-car-fast-in-dubai',
  '/blog/get-best-price-used-car-dubai',
  '/blog/dubai-car-market-trends-2026',
]);

const API_BASE = (
  process.env.INTERNAL_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:8000/api/v1'
).replace(/\/$/, '');

// Pages permanently retired at the client's request (contact page moved to /contact-us)
const GONE_PAGE_PATHS = new Set([
  '/contact',
]);

// In-memory cache for blog slug validation to maintain ultra-fast middleware response times.
// Entries expire: a slug that 404s before its publish time (or while a post is being
// edited) must not stay "gone" until the next server restart.
const VALID_SLUG_TTL_MS = 5 * 60 * 1000;
const GONE_SLUG_TTL_MS = 60 * 1000;
const knownValidBlogSlugs = new Map<string, number>(); // slug -> expiry timestamp
const knownGoneBlogSlugs = new Map<string, number>();  // slug -> expiry timestamp

function isCached(cache: Map<string, number>, slug: string): boolean {
  const expiresAt = cache.get(slug);
  if (expiresAt === undefined) return false;
  if (expiresAt <= Date.now()) {
    cache.delete(slug);
    return false;
  }
  return true;
}

function remember(cache: Map<string, number>, slug: string, ttlMs: number): void {
  // Simple bound so crawlers hitting random slugs can't grow memory without limit
  if (cache.size >= 5000) cache.clear();
  cache.set(slug, Date.now() + ttlMs);
}

// 410 for a blog slug that does not exist *right now*. Must not be cached by browsers
// or Cloudflare: the same slug can become a live post moments later.
function blogSlugGoneResponse(): NextResponse {
  return new NextResponse(renderBranded410Page(), {
    status: 410,
    headers: {
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

function renderBranded410Page(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <title>Link Expired | ExpatCarBuyers</title>
  <link rel="icon" href="/favicon.png">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FCF5F2;
      color: #1a1a1a;
      padding: 24px;
    }
    .card {
      background: #ffffff;
      max-width: 520px;
      width: 100%;
      padding: 48px 36px;
      border-radius: 28px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
      border: 1px solid #FFE6E2;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: #FFE6E2;
      color: #f24026;
      font-weight: 800;
      font-size: 12px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      border-radius: 999px;
      margin-bottom: 24px;
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      background: #f24026;
      border-radius: 50%;
    }
    h1 {
      font-size: 26px;
      font-weight: 800;
      color: #111827;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
    }
    p {
      color: #6b7280;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 32px;
    }
    .btn-primary {
      display: block;
      width: 100%;
      background: #f24026;
      color: #ffffff;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      padding: 16px 24px;
      border-radius: 16px;
      transition: background 0.2s, transform 0.1s;
      box-shadow: 0 10px 25px -5px rgba(242, 64, 38, 0.35);
    }
    .btn-primary:hover {
      background: #d63520;
    }
    .btn-secondary {
      display: inline-block;
      margin-top: 18px;
      color: #6b7280;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s;
    }
    .btn-secondary:hover {
      color: #f24026;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <span class="badge-dot"></span>
      410 • Link Not Found
    </div>
    <h1>This Link Is No Longer Available</h1>
    <p>The link or query parameter you followed does not exist or has been permanently removed.</p>
    <a href="/car-valuation" class="btn-primary">Get Free Online Valuation</a>
    <a href="/" class="btn-secondary">Return to ExpatCarBuyers Home →</a>
  </div>
</body>
</html>`;
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const rawPathname = url.pathname.toLowerCase();
  const pathname = rawPathname.length > 1 ? rawPathname.replace(/\/+$/, '') : rawPathname;
  const searchParams = url.searchParams;
  const rawQuery = url.search.toLowerCase();

  // 0. Instantly reject external gambling / slot spam requests (slothoki, garudax, jepex, mdg188, gacor, etc.)
  const isGamblingSpam =
    rawPathname.includes('slothoki') ||
    rawQuery.includes('slothoki') ||
    rawPathname.includes('garudax') ||
    rawQuery.includes('garudax') ||
    rawPathname.includes('jepex') ||
    rawQuery.includes('jepex') ||
    rawPathname.includes('mdg188') ||
    rawQuery.includes('mdg188') ||
    rawQuery.includes('gacor') ||
    rawQuery.includes('judi') ||
    rawQuery.includes('slot777') ||
    rawQuery.includes('slot88');

  if (isGamblingSpam) {
    return new NextResponse(renderBranded410Page(), {
      status: 410,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  }

  // Handle legacy uploadedimages paths (dead WordPress image uploads)
  if (pathname.startsWith('/uploadedimages/') || pathname === '/uploadedimages') {
    return new NextResponse(renderBranded410Page(), {
      status: 410,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  }

  // Handle explicitly gone pages, gone blog paths or legacy pagination URLs (/blog/page/*)
  if (
    GONE_PAGE_PATHS.has(pathname) ||
    GONE_BLOG_PATHS.has(pathname) ||
    pathname === '/blog/page' ||
    pathname.startsWith('/blog/page/')
  ) {
    return new NextResponse(renderBranded410Page(), {
      status: 410,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  }

  // Handle single blog article requests: only allow those created in the backend, return 410 for all others
  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    const slug = pathname.replace(/^\/blog\//, '').trim();

    if (!slug || slug.startsWith('page')) {
      return new NextResponse(renderBranded410Page(), {
        status: 410,
        headers: {
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
      });
    }

    if (isCached(knownGoneBlogSlugs, slug)) {
      return blogSlugGoneResponse();
    }

    if (!isCached(knownValidBlogSlugs, slug)) {
      try {
        const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(slug)}`, {
          headers: { Accept: 'application/json' },
          signal: AbortSignal.timeout(3000),
          cache: 'no-store',
        });

        if (res.status === 404) {
          remember(knownGoneBlogSlugs, slug, GONE_SLUG_TTL_MS);
          return blogSlugGoneResponse();
        }

        if (res.ok) {
          const data = await res.json();
          if (data && data.success && data.data) {
            remember(knownValidBlogSlugs, slug, VALID_SLUG_TTL_MS);
          } else {
            remember(knownGoneBlogSlugs, slug, GONE_SLUG_TTL_MS);
            return blogSlugGoneResponse();
          }
        }
      } catch {
        // In case of transient connection issue, let request proceed to page component
      }
    }
  }

  // 1. Enforce strict sitemap routes: if a path is NOT in the sitemap (and not a blog post/API), return 410 Gone
  const isAllowedRoute =
    VALID_SITEMAP_ROUTES.has(pathname) ||
    pathname.startsWith('/blog/') ||
    pathname.startsWith('/api/');

  if (!isAllowedRoute) {
    return new NextResponse(renderBranded410Page(), {
      status: 410,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  }

  // If there are no query parameters, continue immediately
  if (!url.search || searchParams.size === 0) {
    return NextResponse.next();
  }

  // 2. Immediately drop any legacy template placeholders or bracketed queries
  // e.g. ?q={search_term_string}, ?s={search_term_string}, %7Bsearch_term_string%7D
  if (
    rawQuery.includes('search_term_string') ||
    rawQuery.includes('{') ||
    rawQuery.includes('}') ||
    rawQuery.includes('%7b') ||
    rawQuery.includes('%7d')
  ) {
    return new NextResponse(renderBranded410Page(), {
      status: 410,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  }

  // 3. Validate all query parameters against strict whitelist
  const isBlog = pathname === '/blog' || pathname.startsWith('/blog/');
  let hasInvalidParam = false;

  for (const key of searchParams.keys()) {
    const lowerKey = key.toLowerCase();

    // Check if allowed globally
    if (ALLOWED_GLOBAL_PARAMS.has(lowerKey)) {
      continue;
    }

    // Check if allowed on blog
    if (isBlog && ALLOWED_BLOG_PARAMS.has(lowerKey)) {
      continue;
    }

    // Any other parameter is not recognized/allowed
    hasInvalidParam = true;
    break;
  }

  if (hasInvalidParam) {
    // Return branded 410 Gone so Googlebot de-indexes and humans get a premium error experience
    return new NextResponse(renderBranded410Page(), {
      status: 410,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all requests except static assets and Next.js internals,
     * but explicitly route /uploadedimages/* to middleware so legacy media receives 410 Gone.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/uploadedimages/:path*',
    '/uploadedimages',
  ],
};
