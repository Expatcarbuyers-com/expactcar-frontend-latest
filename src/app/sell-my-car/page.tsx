import React from 'react';
import type { Metadata } from 'next';
import ValuationFormServer from '@/components/valuation-form/ValuationFormServer';
import FAQAccordion from '@/components/home/FAQAccordion';

export const metadata: Metadata = {
    title: 'Sell My Car in Dubai | Get Cash in 30 Minutes | ExpatCarBuyers',
    description: 'Sell any car in Dubai safely, easily, and quickly at the best possible price. Free vehicle valuation and instant cash payment in under 30 minutes.',
    alternates: {
        canonical: 'https://www.expatcarbuyers.com/sell-my-car',
    },
};

export default function SellMyCarDubaiPage() {
    return (
        <main className="overflow-x-hidden">
            {/* ══════════════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════════════ */}
            <section className="landing-hero">
                <div className="landing-hero-blob" />
                
                <div className="landing-hero-container">
                    <div className="landing-hero-content relative">
                        <div>
                            <span className="text-[#f24026] font-bold text-sm uppercase tracking-widest mb-4 block">
                                Premium Car Buying Service
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                                Sell My Car <br />
                                <span className="text-[#f24026]">in Dubai</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
                                Sell your car without any hassle with Expat Car Buyers, and get cash from the sale in under 30 minutes! 20+ years of experience in Dubai.
                            </p>
                        </div>
                        
                        <div className="hidden lg:block relative mt-12 max-w-lg">
                            {/* Static Premium Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-[#f24026]/5 rounded-full blur-3xl -z-10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-[#FFD0C9]/30 rounded-[50%_50%_40%_60%] -z-5" />
                            
                            <img
                                src="/front/images/X6.webp" 
                                alt="Sell My Car Dubai"
                                className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative z-10"
                            />
                        </div>
                    </div>

                    <div className="landing-hero-form">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Get Instant Cash Offer</h3>
                            <p className="text-sm text-gray-500">Takes less than 1 minute</p>
                        </div>
                        <ValuationFormServer />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                INTRO SECTION
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        Through this platform, you can sell any car in Dubai safely, easily, and quickly at the best possible price. Whether it&apos;s heavily used or you just bought it new last week, no matter what the make, model, or condition of the vehicle is, we can sell your car fast in Dubai.
                    </p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Wondering How to Sell My Car in Dubai?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        In most cases, people opt for private selling or take the assistance of a dealer. The former option includes more hassles, as it involves many hours of posting ads online, meeting with potential buyers, and haggling for a price. In contrast, selling through dealers is by far the better choice. We have teams of experts who will conduct a free vehicle valuation and make the process simple.
                    </p>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                HOW IT WORKS
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-[#FCF5F2]">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16 uppercase tracking-wider">
                        How Can I Sell My Car in <span className="text-[#f24026]">Dubai</span> to Us?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { title: 'Schedule appointment', desc: 'Start by scheduling an appointment with our experienced team. Select a day and time that works best for you.' },
                            { title: 'Bring your vehicle', desc: 'Bring your vehicle for a free inspection. Our certified car inspector will thoroughly check your vehicle.' },
                            { title: 'Get your quote', desc: 'After the free inspection, our team will give you a fair quotation. It is a completely free, no-obligation quote.' },
                            { title: 'Accept the offer', desc: 'If you&apos;re satisfied with the deal, accept the offer. We prepare all documents. This concludes the easy process.' }
                        ].map((step, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="text-[#f24026] font-black text-4xl mb-6 opacity-20">0{idx + 1}</div>
                                <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-widest">{step.title}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                COMMON ISSUES SECTION
            ══════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase tracking-widest">Common Issues While Selling In Dubai</h2>
                        <div className="w-24 h-1 bg-[#f24026] mx-auto" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {[
                            { t: 'Proper Pricing', d: 'Setting the right price is crucial. Overpricing can deter buyers, while underpricing leads to losses. We research the market for you.' },
                            { t: 'Finding Serious Buyers', d: 'Sorting through inquiries is time-consuming. Many inquiries don&apos;t lead to a sale, resulting in wasted effort.' },
                            { t: 'Advertising & Negotiating', d: 'Creating effective ads is challenging. Negotiating requires skills to reach a mutually agreeable price.' },
                            { t: 'RTA Paperwork', d: 'Formalities involve bureaucratic challenges. We ensure all documents are correctly filled out and submitted.' },
                            { t: 'Outstanding Finance', d: 'Existing loans add complexity. We coordinate with finance providers for a smooth transaction.' },
                            { t: 'Vehicle Inspection', d: 'Professional inspection impacts the sale. We provide transparent and thorough checks.' }
                        ].map(item => (
                            <div key={item.t} className="group">
                                <h4 className="text-sm font-black text-gray-900 mb-3 uppercase tracking-[0.2em] group-hover:text-[#f24026] transition-colors">
                                    {item.t}
                                </h4>
                                <p className="text-gray-600 text-[0.9rem] leading-relaxed">
                                    {item.d}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                WHY TRUST US SECTION
            ══════════════════════════════════════════════ */}
            <section className="py-24 bg-[#1a1a1a] text-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <img src="/front/images/X3.webp" alt="Car in Dubai" className="rounded-[3rem] shadow-2xl relative z-10 border border-white/10" />
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#f24026]/20 blur-3xl rounded-full" />
                        </div>
                        
                        <div>
                            <h2 className="text-3xl font-black mb-12 uppercase leading-tight tracking-tight">
                                Why Trust Us to Sell <br />
                                <span className="text-[#f24026]">Used Car in Dubai?</span>
                            </h2>
                            
                            <div className="space-y-10">
                                {[
                                    { t: 'Quick and Easy Process', d: 'We pull all stops to ensure the entire process is done as quickly as possible. From evaluation to cash in hand.' },
                                    { t: 'Instant Cash for Your Car', d: 'Receive your money in under 30 minutes through our instant payment service once the sale is complete.' },
                                    { t: 'Guaranteed Purchase', d: 'We buy all used cars in Dubai, guaranteed. Regardless of make, model, or condition.' },
                                    { t: '20 Years of Experience', d: 'Extensive market knowledge ensures you get the best possible price for your vehicle in today&apos;s market.' }
                                ].map(f => (
                                    <div key={f.t} className="flex gap-6">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#f24026] mt-2 shrink-0 shadow-[0_0_10px_rgba(242,64,38,0.6)]" />
                                        <div>
                                            <h4 className="font-bold text-lg mb-2 uppercase tracking-wide">{f.t}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{f.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                FAQ SECTION
            ══════════════════════════════════════════════ */}
            <section className="py-24 bg-[#FCF5F2]">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16 uppercase tracking-wider">Frequently Asked Questions</h2>
                    <FAQAccordion />
                </div>
            </section>
        </main>
    );
}
