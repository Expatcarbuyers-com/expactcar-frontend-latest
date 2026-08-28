import React from 'react';
import type { Metadata } from 'next';
import ValuationFormServer from '@/components/valuation-form/ValuationFormServer';
import FAQAccordion from '@/components/home/FAQAccordion';
import PriceIncludedSection from '@/components/PriceIncludedSection';

export const metadata: Metadata = {
    title: 'We Buy Any Car Dubai | Best Car Buyer in UAE',
    description: 'We Buy Any Car in Dubai, UAE, Sharjah and Abu Dhabi. Get the highest price as per market and instant cash payment.',
    alternates: {
        canonical: 'https://www.expatcarbuyers.com/we-buy-any-car',
    },
};

export default function WeBuyAnyCarPage() {
    return (
        <main className="overflow-x-hidden">
            {/* ══════════════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════════════ */}
            <section className="landing-hero">
                <div className="landing-hero-blob" style={{ background: '#FFE6E6' }} />
                
                <div className="landing-hero-container">
                    <div className="landing-hero-content relative">
                        <div>
                            <span className="text-[#f24026] font-bold text-sm uppercase tracking-widest mb-4 block">
                                Trusted Car Buying Service
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                                We Buy Any <br />
                                <span className="text-[#f24026]">Car Dubai</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
                                We Buy Any Car in Dubai, Sharjah and Abu Dhabi. Get the highest price as per market and instant cash payment.
                            </p>
                        </div>
                        
                        <div className="hidden lg:block relative mt-12 max-w-lg">
                            {/* Background Blobs */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#f24026]/5 rounded-full blur-[100px] -z-10" />
                            <div 
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-[#FFD0C9]/30 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] -z-5" 
                            />
                            
                            <img
                                src="/front/images/X1.webp" 
                                alt="We Buy Any Car Dubai"
                                className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative z-10"
                            />
                        </div>
                    </div>

                    <div className="landing-hero-form">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Get a Free Valuation</h3>
                            <p className="text-sm text-gray-500">Takes less than 1 minute</p>
                        </div>
                        <ValuationFormServer />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                HOW DOES IT WORK
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16 uppercase tracking-wider">How does it work?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { title: 'Book an Appointment', desc: 'By filling out the form.' },
                            { title: 'Come with Your Vehicle', desc: 'We\'ll evaluate your car as per technical and market parameters.' },
                            { title: 'Get an Offer', desc: 'Get a no-obligation price according to your car\'s condition.' },
                            { title: 'Satisfied With Price?', desc: 'Accept our offer, Get payment and initiate documentation.' }
                        ].map((step, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="w-16 h-16 bg-[#f24026]/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#f24026] group-hover:text-white transition-colors border border-[#f24026]/10">
                                    <span className="font-black text-xl">{idx + 1}</span>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="orangebg mb-20">
                        <div className="inrwekeepcontentwrap">
                            <h2 className="text-3xl font-bold mb-6 uppercase tracking-wider">We Buy Any Car in <span className="text-[#f24026]">Dubai</span></h2>
                            <div className="prose prose-lg text-gray-700 max-w-none space-y-4 mb-10">
                                <p>
                                    As we provide the best car selling services in Dubai, we make sure to keep the car buying deal professional and negotiable enough for both parties to agree. Most importantly we make sure that your cash is ready as soon as the deal is being made.
                                </p>
                                <p>
                                    Once you contact us and your car is being evaluated, we give you a reasonable price that is valid for one week. In this week, we do not care if the market goes down, our end of the deal is always kept.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tight">Our <span className="text-[#f24026]">Guarantees</span></h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                                    {[
                                        'Simple and Easy Process',
                                        'Highest Price As Per Market',
                                        'No-Obligation Price Offer',
                                        'In House Documentation'
                                    ].map(g => (
                                        <div key={g} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                                            <div className="w-3 h-3 rounded-full bg-[#f24026] shadow-[0_0_10px_rgba(242,64,38,0.4)]" /> 
                                            <span className="font-bold text-gray-800">{g}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:sticky lg:top-32">
                            <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-[#FFD0C9] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#f24026]/5 rounded-bl-full" />
                                <h3 className="text-2xl font-black text-gray-900 mb-10 uppercase tracking-widest border-b border-gray-100 pb-4">
                                    Why <span className="text-[#f24026]">Choose Us?</span>
                                </h3>
                                <div className="space-y-10">
                                    {[
                                        { title: 'Most Trusted Buyers', desc: 'Expat Car Buyer is the oldest and most trusted car buying service in Dubai, UAE.', icon: '01' },
                                        { title: 'RTA Approved', desc: 'We\'re RTA approved and offer in-house name transfer and documentation.', icon: '02' },
                                        { title: 'Finance Support', desc: 'We support and settle your debt and finance problems and offer you the difference.', icon: '03' },
                                        { title: 'Instant Payment', desc: 'We support all payment methods and hold nothing but our client\'s trust.', icon: '04' }
                                    ].map(p => (
                                        <div key={p.title} className="flex gap-6">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                                                {p.icon}
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-[#f24026] text-lg mb-2 uppercase">{p.title}</h5>
                                                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                PRICE INCLUDED (Red Block)
            ══════════════════════════════════════════════ */}
            <PriceIncludedSection />

            {/* ══════════════════════════════════════════════
                OUR GUARANTEES (4-Column Grid)
            ══════════════════════════════════════════════ */}
            <section className="py-24 bg-[#1a1a1a] text-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tight">Our Guarantees</h2>
                        <div className="w-24 h-1 bg-[#f24026] mx-auto rounded-full" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            'A guaranteed quick and hassle-free sale',
                            'Secure finance settlement',
                            'On the spot cash in hand payment',
                            'Safe, secure and trusted process',
                            'All RTA paperwork taken care of for you',
                            '0 hidden or unforeseen costs',
                            'No obligation No pressure quote',
                            'Free professional car inspection'
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="flex-shrink-0 w-8 h-8 bg-[#f24026] rounded-full flex items-center justify-center">
                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <p className="text-sm font-medium leading-relaxed">{item}</p>
                            </div>
                        ))}
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
