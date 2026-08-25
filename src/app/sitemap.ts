import type { MetadataRoute } from 'next';
import { serverFetch } from '@/lib/serverApi';

const BASE_URL = 'https://www.expatcarbuyers.com';

export const revalidate = 86400; // 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const entries: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
        { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
        { url: `${BASE_URL}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/car-valuation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/sell-car-abu-dhabi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/sell-car-sharjah`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ];

    // Make/model pages (/sell-my-{make}[-{model}]) and the database-driven
    // branch pages (/sell-my-car-in-{branch-slug}) were both removed at the
    // client's explicit request — the dynamic, database-driven page system
    // was flagged as hurting SEO (thin/duplicate content). Only the two
    // hand-built city pages remain: /sell-car-sharjah, /sell-car-abu-dhabi
    // (listed above), which are static and unrelated to the branches table.

    // Blog posts → /blog/{slug}
    try {
        const res = await serverFetch('/blogs?per_page=200');
        const posts: any[] = res.data.data ?? [];
        posts.forEach((post: any) => {
            entries.push({
                url: `${BASE_URL}/blog/${post.slug}`,
                lastModified: new Date(post.updated_at || post.created_at),
                changeFrequency: 'weekly',
                priority: 0.6,
            });
        });
    } catch { /* skip */ }

    return entries;
}
