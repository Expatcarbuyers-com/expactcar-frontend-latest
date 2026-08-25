import React from 'react';
import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import ValuationFormServer from '@/components/valuation-form/ValuationFormServer';
import { ShieldCheck, Zap, Banknote, MapPin, ChevronRight, Star, Info } from 'lucide-react';
import { serverFetch } from '@/lib/serverApi';

// The only URL format this route resolves is /sell-my-car-in-{branch-slug}
// (this is also the only format sitemap.ts generates). Anything else
// starting with "sell-my-" used to be a make/model page — those were
// removed, so they 404. Bare /sell-my-{branch-slug} (no "car-in-") is
// deliberately NOT resolved even though the backend's /cars/{slug} lookup
// would happily match it — allowing that created an unintended duplicate
// URL for every branch, alongside the canonical car-in- format.
const LOCATION_PREFIX = 'sell-my-car-in-';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug: rawSlug } = await params;

    if (!rawSlug.startsWith(LOCATION_PREFIX)) {
        return { title: 'Sell My Car | ExpatCarBuyers' };
    }

    const branchSlug = rawSlug.replace(LOCATION_PREFIX, '');

    // notFound() throws internally to trigger the 404 page, so it must never
    // be called from inside a try/catch that would swallow that throw.
    let data: any;
    try {
        const res = await serverFetch(`/cars/${branchSlug}`);
        data = res.data;
    } catch {
        return { title: 'Sell My Car | ExpatCarBuyers' };
    }

    if (data.type !== 'location') {
        notFound();
    }

    return {
        title: `Sell My Car in ${data.branch.name} | Instant Cash in 30 Minutes`,
        description: `Looking to sell your car in ${data.branch.name}? We buy any car for cash. Free valuation, doorstep inspection, and instant payment today.`,
    };
}

export default async function DynamicCarPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug: rawSlug } = await params;

    if (!rawSlug.startsWith(LOCATION_PREFIX)) {
        // Check for a redirect entry before giving up
        try {
            const res = await serverFetch(`/redirects/${rawSlug}`);
            if (res.data?.target) redirect(res.data.target);
        } catch {
            // No redirect found
        }
        notFound();
    }

    const branchSlug = rawSlug.replace(LOCATION_PREFIX, '');

    let data: any = null;
    try {
        const res = await serverFetch(`/cars/${branchSlug}`);
        data = res.data;
    } catch {
        notFound();
    }

    if (data.type !== 'location') {
        notFound();
    }

    const { type, make, model, models, branch } = data;

    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'ExpatCarBuyers',
        description:
            type === 'location'
                ? `Sell your car in ${branch?.name} — instant cash, free inspection.`
                : type === 'make'
                ? `Sell your ${make?.name} in UAE — best price guaranteed.`
                : `Sell your ${make?.name} ${model?.name} in UAE — instant valuation.`,
        url: `https://www.expatcarbuyers.com/${rawSlug}`,
        areaServed: type === 'location' ? branch?.name : 'UAE',
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />

            <main className="min-h-screen bg-gray-50">
                {/* Hero */}
                <section className="relative pt-20 pb-24 overflow-hidden bg-white border-b border-gray-100">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f24026]/5 -skew-x-12 translate-x-1/2" />

                    <div className="container mx-auto px-6 relative">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-6">
                                    {type !== 'location' && make.logo_url && (
                                        <img src={make.logo_url} alt={make.name} className="w-16 h-16 object-contain" />
                                    )}
                                    {type === 'location' && (
                                        <div className="w-16 h-16 bg-[#f24026] rounded-2xl flex items-center justify-center text-white">
                                            <MapPin className="w-8 h-8" />
                                        </div>
                                    )}
                                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                                        {type === 'location'
                                            ? <>Sell My Car in <span className="text-[#f24026]">{branch.name}</span></>
                                            : <>Sell My {type === 'make'
                                                ? <span className="text-[#f24026]">{make.name}</span>
                                                : <>{make.name} <span className="text-[#f24026]">{model.name}</span></>}
                                            </>
                                        }
                                    </h1>
                                </div>

                                <p className="text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
                                    {type === 'location'
                                        ? `Need to sell your car in ${branch.name}? We offer the fastest car buying service in the city. Best price, zero hassle.`
                                        : type === 'make'
                                        ? `We buy any ${make.name} in the UAE. Get a guaranteed best market price with immediate payment.`
                                        : `Got a ${make.name} ${model.name}? We are currently offering premium prices for this model in Dubai. Get your valuation now.`
                                    }
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                                            <Star className="w-5 h-5 fill-current" />
                                        </div>
                                        <span className="font-bold text-gray-700">Top Market Value</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="w-10 h-10 bg-[#FCF5F2] text-[#f24026] rounded-xl flex items-center justify-center">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-gray-700">Instant Cash</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 w-full max-w-lg">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-[#FFD0C9]/50 rounded-[3rem] blur-2xl -z-10" />
                                    <ValuationFormServer
                                        initialMakeId={type !== 'location' ? make.id.toString() : undefined}
                                        initialModelId={type === 'model' ? model.id.toString() : undefined}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dynamic Content */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        {type === 'make' ? (
                            <>
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
                                    Choose Your <span className="text-[#f24026]">{make.name}</span> Model
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {models.map((m: any) => (
                                        <a
                                            href={`/sell-my-${make.slug}-${m.slug}`}
                                            key={m.id}
                                            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#FFD0C9] transition-all flex items-center justify-between"
                                        >
                                            <span className="font-bold text-gray-700 group-hover:text-[#f24026] transition-colors uppercase tracking-wide">
                                                {m.name}
                                            </span>
                                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#f24026] group-hover:translate-x-1 transition-all" />
                                        </a>
                                    ))}
                                </div>
                            </>
                        ) : type === 'location' ? (
                            <div className="max-w-4xl mx-auto bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-[#f24026]" />
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Our Services in {branch.name}</h2>
                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    <p>
                                        As an expert car buyer in <strong>{branch.name}</strong>, we offer a seamless selling experience for residents and expats alike.
                                        Whether you are in the city center or surrounding areas, our team can come to your doorstep for a free inspection.
                                    </p>
                                    <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-[#f24026]" /> Site Location
                                        </h3>
                                        <p className="text-gray-600">{branch.address || `Serving all of ${branch.name}`}</p>
                                        <p className="mt-2 font-bold text-[#f24026]">{branch.phone}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-[#f24026]" />
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Why Sell Your {make.name} {model.name} to Us?</h2>
                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    <p>
                                        The <strong>{make.name} {model.name}</strong> is a highly sought-after vehicle in the UAE used car market.
                                        At ExpatCarBuyers, we specialize in valuing and purchasing these models quickly and transparently.
                                    </p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mt-8">
                                        <li className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                                            <Info className="w-5 h-5 text-[#f24026] mt-1 shrink-0" />
                                            <span>Accurate market valuation based on live UAE sales data.</span>
                                        </li>
                                        <li className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                                            <Info className="w-5 h-5 text-[#f24026] mt-1 shrink-0" />
                                            <span>Free doorstep inspection anywhere in Dubai, Abu Dhabi, or Sharjah.</span>
                                        </li>
                                        <li className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                                            <Info className="w-5 h-5 text-[#f24026] mt-1 shrink-0" />
                                            <span>Immediate bank transfer or cash payment upon agreement.</span>
                                        </li>
                                        <li className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                                            <Info className="w-5 h-5 text-[#f24026] mt-1 shrink-0" />
                                            <span>Full RTA documentation handling at no extra cost to you.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Social Proof */}
                <section className="bg-gray-900 py-24 text-white overflow-hidden relative">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl font-extrabold mb-6">Join 50,000+ Happy Sellers</h2>
                            <p className="text-gray-400 text-lg">We've spent over 10 years perfecting the car buying experience in the UAE.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                                    <div className="flex gap-1 text-yellow-400 mb-4">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <p className="italic text-gray-300 mb-6">
                                        "Sold my {type !== 'location' ? make.name : 'car'} in less than an hour. The team was professional and the price was fair compared to other dealers in Dubai."
                                    </p>
                                    <div className="font-bold text-white">— Verified Customer</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
