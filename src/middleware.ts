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
  '/contact',
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

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname.toLowerCase();
  const searchParams = url.searchParams;
  const rawQuery = url.search.toLowerCase();

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
     * Match all requests except static assets and Next.js internals
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
