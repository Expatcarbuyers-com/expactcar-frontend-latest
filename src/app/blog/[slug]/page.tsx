import React from 'react';
import { Metadata } from 'next';
import { Calendar, ChevronLeft, Star } from 'lucide-react';
import { serverFetch } from '@/lib/serverApi';
import TableOfContents from '@/components/blog/TableOfContents';
import { injectHeadingIds } from '@/lib/blogUtils';

export const revalidate = 3600;

export async function generateStaticParams() {
    try {
        const res = await serverFetch('/blogs?per_page=100');
        const posts: any[] = res.data.data ?? [];
        return posts.map((p: any) => ({ slug: p.slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    try {
        const { slug } = await params;
        const res = await serverFetch(`/blogs/${slug}`);
        const post = res.data;
        return {
            title: `${post.title} | ExpatCarBuyers Blog`,
            description: post.excerpt || post.title,
            openGraph: {
                title: post.title,
                description: post.excerpt || post.title,
                images: post.cover_image ? [{ url: post.cover_image }] : [],
                type: 'article',
                publishedTime: post.published_at || post.created_at,
            },
        };
    } catch {
        return { title: 'Blog | ExpatCarBuyers' };
    }
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let post: any = null;
    let related: any[] = [];
    let processedContent = '';

    try {
        const [postRes, relatedRes] = await Promise.all([
            serverFetch(`/blogs/${slug}`),
            serverFetch('/blogs?per_page=2'),
        ]);
        post = postRes.data;
        related = (relatedRes.data.data ?? []).filter((p: any) => p.slug !== slug);
        processedContent = injectHeadingIds(post.content ?? '', post.outline ?? []);
    } catch {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Article not found.
            </div>
        );
    }

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt || post.title,
        image: post.cover_image || undefined,
        datePublished: post.published_at || post.created_at,
        dateModified: post.updated_at,
        author: { '@type': 'Organization', name: 'ExpatCarBuyers' },
        publisher: {
            '@type': 'Organization',
            name: 'ExpatCarBuyers',
            logo: { '@type': 'ImageObject', url: 'https://www.expatcarbuyers.com/front/images/logo.png' },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            <main className="min-h-screen bg-gray-50 pb-24">
                <article>
                    <header className="bg-white border-b border-gray-100 pt-32 pb-20">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <a href="/blog" className="inline-flex items-center gap-2 text-[#f24026] font-bold mb-8 hover:gap-3 transition-all">
                                <ChevronLeft className="w-5 h-5" /> Back to Blog
                            </a>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-[#f24026] text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                    {post.category?.name || 'Guides'}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-500 text-sm flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(post.published_at || post.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-8">
                                {post.title}
                            </h1>
                            <div className="flex items-center py-8 border-y border-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#FCF5F2] rounded-full flex items-center justify-center text-[#f24026] font-bold">
                                        ECB
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">ExpatCarBuyers Editorial</div>
                                        <div className="text-sm text-gray-500">Expert Auto Analyst</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="container mx-auto px-6 max-w-4xl mt-16">
                        <div className="bg-white p-8 lg:p-16 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                            {post.cover_image && (
                                <div className="rounded-[2rem] overflow-hidden mb-12 shadow-lg">
                                    <img src={post.cover_image} alt={post.title} className="w-full h-auto" />
                                </div>
                            )}
                            <TableOfContents outline={post.outline ?? []} />
                            <div
                                className="blog-prose prose prose-lg lg:prose-xl max-w-none
                                    prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-gray-900
                                    prose-p:leading-relaxed prose-p:text-gray-600
                                    prose-img:rounded-3xl prose-img:mx-auto prose-img:shadow-lg
                                    prose-a:text-[#f24026] prose-a:no-underline hover:prose-a:underline
                                    prose-strong:text-gray-900
                                    prose-blockquote:border-[#f24026] prose-blockquote:text-gray-600
                                    prose-code:text-[#f24026] prose-code:bg-[#FCF5F2] prose-code:px-1 prose-code:rounded
                                    prose-pre:bg-gray-900 prose-pre:text-gray-100
                                    prose-li:text-gray-600"
                                dangerouslySetInnerHTML={{ __html: processedContent }}
                            />
                        </div>

                        <div className="mt-16 bg-[#f24026] rounded-[3rem] p-12 text-white overflow-hidden relative shadow-2xl shadow-[#f24026]/20">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                <div className="flex-1">
                                    <h2 className="text-3xl font-extrabold mb-4">Ready to sell your car?</h2>
                                    <p className="text-[#FFD0C9] text-lg">Don&apos;t wait months for a private buyer. Get your free valuation and immediate cash today.</p>
                                </div>
                                <a href="/" className="bg-white text-[#f24026] px-10 py-5 rounded-2xl font-black hover:bg-gray-100 hover:scale-105 transition-all shadow-xl whitespace-nowrap">
                                    Evaluate My Car Now
                                </a>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Articles */}
                {related.length > 0 && (
                    <section className="container mx-auto px-6 max-w-5xl mt-24">
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
                            <Star className="w-6 h-6 text-[#f24026] fill-current" /> Related Articles
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {related.map((p: any) => (
                                <a
                                    key={p.id}
                                    href={`/blog/${p.slug}`}
                                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col"
                                >
                                    {p.cover_image && (
                                        <div className="h-48 overflow-hidden">
                                            <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    )}
                                    <div className="p-6 flex-1">
                                        <h4 className="font-bold text-gray-900 group-hover:text-[#f24026] transition-colors line-clamp-2">
                                            {p.title}
                                        </h4>
                                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{p.excerpt}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
