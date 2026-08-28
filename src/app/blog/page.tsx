import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Search, ChevronRight, Calendar, Clock } from 'lucide-react';
import { serverFetch } from '@/lib/serverApi';
import BlogSearchInput from '@/components/blog/BlogSearchInput';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Car Buying Guide & News | ExpatCarBuyers Blog',
    description: 'Stay updated with the latest car trends, selling tips, and market news in UAE. Your ultimate guide to selling cars in Dubai.',
    alternates: {
        canonical: 'https://www.expatcarbuyers.com/blog',
    },
};

interface SearchParams {
    q?: string;
    page?: string;
}

export default async function BlogListingPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { q = '', page = '1' } = await searchParams;

    let posts: any[] = [];
    let meta: { last_page?: number; current_page?: number } = {};

    try {
        const params = new URLSearchParams({ page });
        if (q) params.set('search', q);
        const res = await serverFetch(`/blogs?${params.toString()}`);
        posts = res.data.data ?? [];
        meta = res.data.meta ?? {};
    } catch {
        posts = [];
    }

    const currentPage = Number(page);
    const lastPage = meta.last_page ?? 1;

    return (
        <main className="min-h-screen bg-white">
            {/* Blog Hero */}
            <section className="bg-gray-900 py-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[#f24026]/10 mix-blend-overlay" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
                            The UAE <span className="text-[#f24026]">Auto Hub.</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed mb-10">
                            Essential guides, market insights, and expert tips for buying and selling cars in the United Arab Emirates.
                        </p>
                        <Suspense>
                            <BlogSearchInput />
                        </Suspense>
                    </div>
                </div>
            </section>

            {/* Blog Feed */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {posts.map((post: any) => (
                                <a
                                    href={`/blog/${post.slug}`}
                                    key={post.id}
                                    className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all"
                                >
                                    <div className="relative h-64 overflow-hidden bg-gray-100">
                                        {post.cover_image ? (
                                            <img
                                                src={post.cover_image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                No Image
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-[#f24026] text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                                                {post.category?.name || 'Car Tips'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(post.published_at || post.created_at).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" /> 5 min read
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#f24026] transition-colors mb-4 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 mb-8 line-clamp-3 leading-relaxed">
                                            {post.excerpt || 'Read our latest insights on the UAE car market and how to get the most value for your vehicle.'}
                                        </p>
                                        <div className="mt-auto flex items-center text-[#f24026] font-bold gap-2 group-hover:gap-3 transition-all">
                                            Read More <ChevronRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                                <Search className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
                            <p className="text-gray-500">We are currently gathering the latest news for you. Check back later!</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {lastPage > 1 && (
                        <div className="mt-20 flex justify-center gap-2 flex-wrap">
                            {Array.from({ length: lastPage }, (_, i) => i + 1).map(p => {
                                const params = new URLSearchParams();
                                params.set('page', String(p));
                                if (q) params.set('q', q);
                                return (
                                    <a
                                        key={p}
                                        href={`/blog?${params.toString()}`}
                                        className={`w-12 h-12 rounded-xl font-bold flex items-center justify-center transition-all ${
                                            p === currentPage
                                                ? 'bg-[#f24026] text-white shadow-lg shadow-[#f24026]/30'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {p}
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter */}
            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="bg-[#f24026] rounded-[3rem] p-12 lg:p-20 text-white text-center relative overflow-hidden shadow-2xl shadow-[#f24026]/20">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
                        <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Stay in the fast lane.</h2>
                        <p className="text-[#FFD0C9] text-xl max-w-2xl mx-auto mb-10">Get the latest UAE car market trends and pricing updates delivered straight to your inbox.</p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 bg-white/20 border border-white/30 rounded-2xl py-4 px-6 text-white placeholder:text-[#FFD0C9] outline-none focus:bg-white/30 transition-all"
                            />
                            <button className="bg-white text-[#f24026] px-8 py-4 rounded-2xl font-black hover:bg-gray-100 transition-all shadow-xl">
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
