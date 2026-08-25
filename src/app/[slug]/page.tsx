import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { serverFetch } from '@/lib/serverApi';

// This route used to dynamically render make/model pages (/sell-my-{make}[-{model}])
// and database-driven branch pages (/sell-my-car-in-{branch}). Both were removed at
// the client's explicit request: generating landing pages straight from the database
// created a large volume of thin/duplicate content that was hurting SEO. The two
// real city pages that remain (/sell-car-sharjah, /sell-car-abu-dhabi) are hand-built,
// static routes elsewhere and are entirely unrelated to this file.
//
// All that's left here is legacy-URL support: if an old URL has an entry in the
// redirects table, send it on; otherwise it's a genuine 404.

export const metadata: Metadata = {
    title: 'Page Not Found | ExpatCarBuyers',
};

export default async function LegacyRedirectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug: rawSlug } = await params;

    try {
        const res = await serverFetch(`/redirects/${rawSlug}`);
        if (res.data?.target) redirect(res.data.target);
    } catch {
        // No redirect found
    }

    notFound();
}
