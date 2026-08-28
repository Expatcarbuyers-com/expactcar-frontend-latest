import React from 'react';
import type { Metadata } from 'next';
import ValuationFormServer from '@/components/valuation-form/ValuationFormServer';

export const metadata: Metadata = {
    title: 'Cash For Any Car Dubai | Instant Cash for Cars UAE',
    description: 'Cash Your Car in Dubai, Sharjah and Abu-Dhabi with The Highest No-obligation Price. We Cash Any Car in 30 Minutes regardless of condition.',
    alternates: {
        canonical: 'https://www.expatcarbuyers.com/we-cash-any-car',
    },
};

export default function WeCashAnyCarPage() {
    return (
        <main className="overflow-x-hidden">
            {/* ══════════════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════════════ */}
            <section className="landing-hero">
                <div className="landing-hero-blob" style={{ background: '#F2F2F2' }} />
                
                <div className="landing-hero-container">
                    <div className="landing-hero-content relative">
                        <div>
                            <span className="text-[#f24026] font-bold text-sm uppercase tracking-widest mb-4 block">
                                Get Cash Instantly
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                                We Cash Any <br />
                                <span className="text-[#f24026]">Car UAE</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
                                Cash Your Car in Dubai, Sharjah and Abu-Dhabi with The Highest No-obligation Price. We Cash Any Car in 30 Minutes!
                            </p>
                        </div>
                        
                        <div className="hidden lg:block relative mt-12 max-w-lg">
                            {/* Static Premium Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-[#f24026]/5 rounded-full blur-3xl -z-10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-[#FFD0C9]/30 rounded-[50%_50%_40%_60%] -z-5" />
                            
                            <img
                                src="/front/images/Jaguar.webp" 
                                alt="We Cash Any Car Dubai"
                                className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative z-10"
                            />
                        </div>
                    </div>

                    <div className="landing-hero-form">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Cash Your Car Now</h3>
                            <p className="text-sm text-gray-500">Takes less than 1 minute</p>
                        </div>
                        <ValuationFormServer />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                WHY CHOOSE US
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16 uppercase tracking-wider">Why Should I Choose Us to Cash my car?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { title: 'Book an Appointment', desc: 'Online or offline to sell your car for cash.' },
                            { title: 'Bring Your Vehicle', desc: 'On the appointed date and we\'ll inspect it.' },
                            { title: 'Get a Custom Quote', desc: 'According to your car\'s condition & market price.' },
                            { title: 'Price Sounds Good?', desc: 'Accept the offer and cash your car. That\'s it!' }
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

            {/* ══════════════════════════════════════════════
                MAIN CONTENT - CASH ANY CAR
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-[#FCF5F2]">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase">We Cash Any Car in <span className="text-[#f24026]">30 Minutes</span></h2>
                                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                                    With us, you can sell car for cash at a price that will benefit you. We have an incredible team of automotive experts who are dedicated to delivering the best service to customers.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    We cash any car, regardless of its condition. You are more than welcome to bring your damaged cars or the non-functioning ones to us and we&apos;ll sell them at a satisfactory price.
                                </p>
                            </div>
                            
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase">Our Guarantees</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        '100% safe & secure',
                                        'Market-competitive rates',
                                        'Super-fast procedure',
                                        'Sold in no time'
                                    ].map(g => (
                                        <div key={g} className="flex items-center gap-3 font-bold text-gray-800 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#f24026]" /> {g}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-[#FFD0C9]">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">Selling Process</h3>
                                <div className="space-y-6">
                                    {[
                                        { title: 'Free Valuation', desc: 'We valuate your car according to standard parameters at our showrooms.' },
                                        { title: 'Ownership Transfer', desc: 'We cash your car and transfer the ownership to expatcarbuyer.' },
                                        { title: 'Support in Debt', desc: 'We clear debts on your vehicle and accommodate you with a handsome margin.' },
                                        { title: 'Super-fast payment', desc: 'The payment will be transferred within just 30 minutes.' }
                                    ].map(p => (
                                        <div key={p.title}>
                                            <h5 className="font-bold text-[#f24026] text-sm mb-1 uppercase">{p.title}</h5>
                                            <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                COMMON ISSUES
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 uppercase tracking-wider">Common Issues When Selling For Cash</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="bg-[#FCF5F2] p-8 rounded-3xl">
                            <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-widest">Lack of Repair Work</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">Buyers often turn away from vehicles that clearly have not been properly maintained or repaired.</p>
                        </div>
                        <div className="bg-[#FCF5F2] p-8 rounded-3xl">
                            <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-widest">Unnecessary Modifications</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">Car modifications can often increase your vehicle&apos;s vulnerability to depreciation.</p>
                        </div>
                        <div className="bg-[#FCF5F2] p-8 rounded-3xl">
                            <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-widest">Incomplete Paperwork</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">Without relevant paperwork, it can be hard to authenticate the legal ownership of the car.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
