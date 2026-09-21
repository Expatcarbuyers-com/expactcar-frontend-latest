interface OutlineItem {
    title: string;
    anchor: string;
}

function slugify(text: string): string {
    return text
        .replace(/<[^>]+>/g, '')   // strip inner HTML tags
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

/**
 * Injects id attributes into h2–h6 elements whose slugified text content
 * matches an anchor defined in the article outline. Headings that already
 * carry an id are left untouched.
 */
export function injectHeadingIds(html: string, outline: OutlineItem[]): string {
    if (!outline || outline.length === 0) return html;

    const anchorSet = new Set(outline.map((item) => item.anchor));

    return html.replace(
        /<(h[2-6])([^>]*)>([\s\S]*?)<\/\1>/gi,
        (match, tag, attrs, content) => {
            if (/\bid=/.test(attrs)) return match;

            const slug = slugify(content);
            if (anchorSet.has(slug)) {
                return `<${tag} id="${slug}"${attrs}>${content}</${tag}>`;
            }
            return match;
        },
    );
}

export function getStorageUrl(path?: string | null): string {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
    const backendOrigin = (
        process.env.NEXT_PUBLIC_STORAGE_URL ??
        process.env.INTERNAL_API_URL?.replace(/\/api\/v1\/?$/, '') ??
        process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, '') ??
        'https://admin.expatcarbuyers.com'
    ).replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');
    if (cleanPath.startsWith('storage/')) {
        return `${backendOrigin}/${cleanPath}`;
    }
    return `${backendOrigin}/storage/${cleanPath}`;
}
