import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
  'fbclid',
  'msclkid',
  'ttclid',
  'ref',
]);

// Parameters allowed exclusively on /blog
const ALLOWED_BLOG_PARAMS = new Set(['page', 'q']);

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname.toLowerCase();
  const searchParams = url.searchParams;
  const rawQuery = url.search.toLowerCase();

  // If there are no query parameters, continue immediately
  if (!url.search || searchParams.size === 0) {
    return NextResponse.next();
  }

  // 1. Immediately drop any legacy template placeholders or bracketed queries
  // e.g. ?q={search_term_string}, ?s={search_term_string}, %7Bsearch_term_string%7D
  if (
    rawQuery.includes('search_term_string') ||
    rawQuery.includes('{') ||
    rawQuery.includes('}') ||
    rawQuery.includes('%7b') ||
    rawQuery.includes('%7d')
  ) {
    return new NextResponse('410 Gone - Invalid search parameter', {
      status: 410,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Content-Type': 'text/plain',
      },
    });
  }

  // 2. Validate all query parameters against strict whitelist
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
    // Return 410 Gone so Googlebot immediately discards and de-indexes the URL
    return new NextResponse('410 Gone - This URL does not exist.', {
      status: 410,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
        'Content-Type': 'text/plain',
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
