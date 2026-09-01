import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Known spam/hacked query parameters targeting the site (Japanese/Indonesian slot & gambling spam)
const SPAM_QUERY_KEYS = [
  'game',
  'slot',
  'slots',
  'casino',
  'judi',
  'gacor',
  'mahjong',
  'poker',
  'bet',
  'pragmatic',
  'sbobet',
  'togel',
  'rtp',
  'maxwin',
  'zeus',
  'olympus',
  'hoki',
];

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const searchParams = url.searchParams;

  // Check if any spam parameter exists in the URL query string
  let isSpam = false;
  for (const key of searchParams.keys()) {
    const lowerKey = key.toLowerCase();
    if (SPAM_QUERY_KEYS.includes(lowerKey)) {
      isSpam = true;
      break;
    }
    // Check if parameter value contains gambling spam keywords
    const val = (searchParams.get(key) || '').toLowerCase();
    if (
      val.includes('mahjong') ||
      val.includes('bonanza') ||
      val.includes('slot') ||
      val.includes('gacor') ||
      val.includes('casino') ||
      val.includes('pragmatic')
    ) {
      isSpam = true;
      break;
    }
  }

  if (isSpam) {
    // Return HTTP 410 Gone with noindex header
    // This explicitly tells Googlebot and other crawlers that this spam URL is permanently gone
    return new NextResponse('410 Gone - This URL does not exist.', {
      status: 410,
      statusText: 'Gone',
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
     * Match all requests except static assets and Next internals
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
