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
