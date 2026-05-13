import React from 'react';
import type { Metadata } from 'next';
import ValuationFormServer from '@/components/valuation-form/ValuationFormServer';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';

export const metadata: Metadata = {
    title: 'Free Car Valuation UAE | How to Sell My Car in UAE',
    description: 'Avoid the cons and find out what your car is really worth. Get a free professional car inspection and instant cash payment in UAE.',
};

export default function EvaluatePage() {
    return (
        <main className="overflow-x-hidden">
            {/* ══════════════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════════════ */}
            <section className="landing-hero">
                <div className="landing-hero-blob" style={{ background: '#FFF5E6' }} />
                
                <div className="landing-hero-container">
                    <div className="landing-hero-content relative">
                        <div>
                            <span className="text-[#f24026] font-bold text-sm uppercase tracking-widest mb-4 block">
                                Expert Valuation Service
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                                Evaluate My <br />
                                <span className="text-[#f24026]">Car UAE</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
                                Avoid the cons and find out what your car is really worth. Find Out and Sell Any Car with Confidence!
                            </p>
                        </div>
                        
                        <div className="hidden lg:block relative mt-12 max-w-xl scale-110 origin-left">
                            {/* Static Premium Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-[#f24026]/5 rounded-full blur-3xl -z-10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-[#FFD0C9]/30 rounded-[50%_50%_40%_60%] -z-5" />

                            <img
                                src="/front/images/evaluate-sports-car.png"
                                alt="Evaluate My Car UAE"
                                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative z-10"
                            />
                        </div>
                    </div>

                    <div className="landing-hero-form">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Start Free Valuation</h3>
                            <p className="text-sm text-gray-500">Takes less than 1 minute</p>
                        </div>
                        <ValuationFormServer />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                HOW DO I SELL MY CAR IN UAE?
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Sounds great, but <span className="text-[#f24026]">how do I sell my car in UAE?</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { title: 'Book an Appointment', desc: 'Let us know a time that works best for you and book an appointment for a vehicle inspection at your convenience.' },
                            { title: 'Bring your vehicle', desc: 'Simply, drive your car over to your nearest inspection point and allow us to carry out a free professional inspection.' },
                            { title: 'Get a no-obligation quote', desc: 'Receive a fair non-obligation quote based on findings. The choice to sell is 100% with you.' },
                            { title: 'Happy with the price?', desc: 'Get paid. If you are happy with the offer, simply give us a thumbs up and we will put the cash right in your hand!' }
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
                CONFIDENCE SECTION
            ══════════════════════════════════════════════ */}
            <section className="py-24 bg-[#FCF5F2]">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-tight">Find Out and Sell Any Car with <span className="text-[#f24026]">Confidence!</span></h2>
                                <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">
                                    <p>
                                        Our core principles are transparency and fairness. We don’t hide behind a big corporate office thousands of miles away, we are right with you on the ground helping you to make your sale.
                                    </p>
                                    <p>
                                        Our vision is to build lifelong relationships with our customers and to provide them with the utmost confidence when using our services. Once you use our service once, you will never again think to sell car anywhere else!
                                    </p>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-8 uppercase tracking-tight">Why people <span className="text-[#f24026]">trust us?</span></h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {[
                                        { title: 'Free Car Valuation', desc: 'Get a non-obligation quote for your car based on the physical condition and the market price.' },
                                        { title: 'Ownership Transfer', desc: 'We are authorized by RTA, and our professionals will transfer the car in our office, with no hassles!' },
                                        { title: 'Finance Settlement', desc: 'We clear the outstanding finance on cars and pay the difference to customers.' },
                                        { title: 'Instant Cash', desc: 'You can sell a car in 30 minutes and receive cash, bank transfer or cheque!' }
                                    ].map(g => (
                                        <div key={g.title} className="flex gap-4 group">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#f24026] mt-2 shrink-0 shadow-[0_0_10px_rgba(242,64,38,0.4)] group-hover:scale-125 transition-transform" />
                                            <div>
                                                <h5 className="font-bold text-gray-900 text-[0.9rem] mb-1 uppercase tracking-wider">{g.title}</h5>
                                                <p className="text-gray-600 text-sm leading-relaxed">{g.desc}</p>
                                            </div>
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
                                    Valuation <span className="text-[#f24026]">Factors</span>
                                </h3>
                                <div className="space-y-10">
                                    {[
                                        { title: 'Mileage Assessment', desc: 'We assess how much mileage has the car done on the clock.', icon: '01' },
                                        { title: 'General Condition', desc: 'A visual and mechanical inspection will give an overall view of how well the car has been looked after.', icon: '02' },
                                        { title: 'Accident History', desc: 'We check if the car has been involved in any accidents or required any major repairs.', icon: '03' },
                                        { title: 'Market Demand', desc: 'Simple supply and demand economics for each car model will affect the price.', icon: '04' }
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
                TESTIMONIALS SECTION (Full Width)
            ══════════════════════════════════════════════ */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight italic uppercase">
                            &ldquo;Our Happy Customers&rdquo;
                        </h2>
                        <div className="w-24 h-1 bg-[#f24026] mx-auto rounded-full" />
                    </div>
                    <TestimonialCarousel />
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                EXCELLENCE SECTION
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 uppercase">What makes us the best place to sell used car in UAE?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <ul className="space-y-6 list-disc pl-5 text-gray-700">
                            <li>We strive for excellence in every single aspect of our business.</li>
                            <li>We will never be beaten on price. We pride ourselves on providing maximum value.</li>
                            <li>We do all the heavy lifting for you. No paperwork. No admin.</li>
                        </ul>
                        <ul className="space-y-6 list-disc pl-5 text-gray-700">
                            <li>Our inspection process is totally free of charge.</li>
                            <li>No pushing to make the sale. The choice is completely yours.</li>
                            <li>Headache free sale. We take all the stress out of the process.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
}
