import React from 'react';
import type { Metadata } from 'next';
import ValuationFormServer from '@/components/valuation-form/ValuationFormServer';
import { ChevronDown } from 'lucide-react';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import PriceIncludedSection from '@/components/PriceIncludedSection';

export const metadata: Metadata = {
    title: 'Sell My Car Abu Dhabi | Get Best Price for Your Used Car',
    description: 'We Guarantee to Offer You the Highest Price in Abu Dhabi. Sell any car fast with 100% transparency and secure procedure.',
};

export default function AbuDhabiPage() {
    return (
        <main className="overflow-x-hidden">
            {/* ══════════════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════════════ */}
            <section className="landing-hero">
                <div className="landing-hero-blob" style={{ background: '#FFD0C9' }} />
                
                <div className="landing-hero-container">
                    <div className="landing-hero-content relative">
                        <div>
                            <span className="text-[#f24026] font-bold text-sm uppercase tracking-widest mb-4 block">
                                Highest Price Guarantee
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                                Sell My Car in <br />
                                <span className="text-[#f24026]">Abu Dhabi</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
                                We Guarantee to Offer You the Highest Price in Abu Dhabi. Sell your car in any condition for fast cash.
                            </p>
                        </div>
                        
                        <div className="hidden lg:block relative mt-12 max-w-lg">
                            {/* Static Premium Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-[#f24026]/5 rounded-full blur-3xl -z-10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-[#FFD0C9]/30 rounded-[50%_50%_40%_60%] -z-5" />
                            
                            <img
                                src="/front/images/X5.webp" 
                                alt="Sell My Car Abu Dhabi"
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
                THE ENTIRE SELLING PROCEDURE IS EASY, QUICK, AND BENEFICIAL!
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                            THE ENTIRE SELLING PROCEDURE IS<br/>
                            <span className="text-[#f24026]">EASY, QUICK, AND BENEFICIAL!</span>
                        </h2>
                        <div className="w-24 h-1 bg-[#f24026] mx-auto mt-6 rounded-full" />
                    </div>
                    
                    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 bg-[#FCF5F2] p-8 md:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-gray-900 leading-snug">
                                    Selling your car shouldn't be a chore. We've optimized every step to save you time and maximize your value.
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    From the moment you request an online valuation to the final payment, our process is designed for transparency. No hidden fees, no complicated paperwork, and no waiting weeks for your money.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <span className="px-6 py-3 bg-white rounded-full text-sm font-bold text-gray-700 shadow-sm border border-gray-50">✓ 30-Minute Process</span>
                                    <span className="px-6 py-3 bg-white rounded-full text-sm font-bold text-gray-700 shadow-sm border border-gray-50">✓ Instant Cash Payment</span>
                                    <span className="px-6 py-3 bg-white rounded-full text-sm font-bold text-gray-700 shadow-sm border border-gray-50">✓ Free RTA Handling</span>
                                </div>
                            </div>
                            <div className="relative">
                                <img 
                                    src="/front/images/selling-procedure.png" 
                                    alt="Selling Procedure Graphic" 
                                    className="w-full h-auto rounded-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                HOW DOES IT WORK
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16 uppercase tracking-wider">HOW DOES IT WORK?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { title: 'Have an appointment', desc: 'Virtually or visiting our office.' },
                            { title: 'Bring your vehicle', desc: 'At the scheduled time and we\'ll inspect it.' },
                            { title: 'Get the desired quote', desc: 'As per the car\'s condition and market price.' },
                            { title: 'Price delights you?', desc: 'Now, say okay & ignite the selling phase.' }
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
                SEO CONTENT SECTION
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="orangebg mb-20">
                        <div className="inrwekeepcontentwrap">
                            <h2 className="text-3xl font-bold mb-8 uppercase tracking-wider">How to Sell a Car in Abu Dhabi</h2>
                            <div className="prose prose-lg text-gray-700 max-w-none space-y-6 mb-12">
                                <p>
                                    With so many options, you need to stand out from the crowd of other sellers in Abu Dhabi who also sell similar cars. At the end of the day, you have to decide whether to sell privately or take the easiest route and accept a dealer&apos;s price. You can sell a car in Abu Dhabi privately in various ways. You might find several websites if you search &lsquo;sell car Abu Dhabi&rsquo; or &lsquo;sell my car Abu Dhabi&rsquo; online. You might post an advertisement on the noticeboard of the sports club or grocery store nearby. However, the most preferred way to car selling Abu Dhabi is by reaching out to a trusted platform that buys used cars. In this way, you might be able to sell your car in Abu Dhabi for a little bit more money than you would if you sold it to a dealer.
                                </p>
                            </div>

                            <h2 className="text-3xl font-bold mb-8 uppercase tracking-wider">Cash Your Car in Abu Dhabi at the Right Price</h2>
                            <div className="prose prose-lg text-gray-700 max-w-none space-y-6 mb-12">
                                <p>
                                    You can look for &lsquo;cash car Abu Dhabi&rsquo; online to avail of the services of the most reputable used automobile dealership in the United Arab Emirates, Expat Car Buyers. If you want to cash your car Abu Dhabi, just schedule an appointment, and a representative will call you to help you sell your vehicle for the best price offer without leaving Abu Dhabi. Expat Car Buyers aims to provide you with the quickest, simplest, and most straightforward approach to finish the deal reasonably and on time. In the local and internet markets, It is the right place and your best bet if you&apos;re trying to sell any used cars, vehicles, or motors in Dubai. We are the only company in the market that will buy any car in any condition so that you can sell any car to us for a fast cash offer and a hassle-free process.
                                </p>
                            </div>

                            <h2 className="text-3xl font-bold mb-8 uppercase tracking-wider">Why should I choose Expat Car Buyers to Sell my Car in Abu Dhabi?</h2>
                            <div className="prose prose-lg text-gray-700 max-w-none space-y-6 mb-12">
                                <p>
                                    Thanks to the straightforward selling process at Expat Car Buyers, you can always sell any car Abu Dhabi. We know that most auto sellers and purchasers give such cheap prices that you would rather keep the car than oversell it. We often offer the highest price on the market because we respect the seller&apos;s time and want to buy their car. Most people are rushing to sell their cars to a used car dealer in Abu Dhabi, so we provide quick money and a simple transfer process. Additionally, we can settle your mortgage with your bank or another lender.
                                </p>
                                <p>
                                    Our hassle-free online valuation process is straightforward. After giving basic information about your car and your contact information, you will get a confirmation email for your appointment. We even call you on the day of the appointment to confirm your meeting with us. As you sell your automobile to a car buyer Abu Dhabi, our knowledgeable team will support you at every turn.
                                </p>
                            </div>

                            <h2 className="text-3xl font-bold mb-8 uppercase tracking-wider">What Common Issues do you Face while Selling a Car in Abu Dhabi?</h2>
                            <div className="prose prose-lg text-gray-700 max-w-none space-y-6">
                                <p>
                                    Although it&apos;s not an easy option, you can sell any car Abu Dhabi in a simpler way than you might have imagined. The good news is that you can sell your vehicle quickly and easily thanks to the available car buyer in Abu Dhabi. But that doesn&apos;t mean you should just pick one and start selling immediately without doing any research.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <div className="bg-[#FCF5F2] p-10 rounded-[3rem] border border-[#FFD0C9]">
                                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Reliable Capital Service</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Our Abu Dhabi presence ensures that sellers in the capital receive premium treatment and the best possible offers. We handle all the complexities of capital-specific registrations and finance settlements.
                                </p>
                            </div>
                        </div>

                        <div className="lg:sticky lg:top-32">
                            <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-[#FFD0C9] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#f24026]/5 rounded-bl-full" />
                                <h3 className="text-2xl font-black text-gray-900 mb-10 uppercase tracking-widest border-b border-gray-100 pb-4">
                                    The <span className="text-[#f24026]">Method</span>
                                </h3>
                                <div className="space-y-10">
                                    {[
                                        { title: 'Entirely free valuation and Quote', desc: 'We assign you a custom quote according to the current market price and the vehicle’s actual condition.', icon: '01' },
                                        { title: 'Transfer ownership', desc: 'If you proceed with the offer, we’ll take the ownership from you.', icon: '02' },
                                        { title: 'Payment clearance', desc: 'Most importantly, we also clear vehicle debt and set it with a reasonable margin.', icon: '03' },
                                        { title: 'Super-fast payment', desc: 'We will go with any of your choice, a bank transfer, cheque, etc. in a maximum of 30minutes.', icon: '04' }
                                    ].map(p => (
                                        <div key={p.title} className="flex gap-6">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                                                {p.icon}
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-[#f24026] text-lg mb-2">{p.title}</h5>
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
                TESTIMONIALS SECTION (Full Width)
            ══════════════════════════════════════════════ */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight italic uppercase">
                            &ldquo;Why should I choose Expat Car Buyers in <span className="text-[#f24026]">Abu Dhabi?</span>&rdquo;
                        </h2>
                        <div className="w-24 h-1 bg-[#f24026] mx-auto rounded-full" />
                    </div>
                    <TestimonialCarousel />
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                ISSUES SECTION
            ══════════════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 uppercase">What Common Issues do you Face?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                        <div className="bg-[#FCF5F2] p-8 rounded-3xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Unfair Price</h3>
                            <p className="text-gray-600">
                                Remember that it differs from one showroom to another. Here at Expat Car Buyers, you can rest assured that your car will get a fair and ideal price compared to any other used car dealer in Abu Dhabi.
                            </p>
                        </div>
                        <div className="bg-[#FCF5F2] p-8 rounded-3xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">They Don&apos;t Buy Your Particular Car</h3>
                            <p className="text-gray-600">
                                Finding a buyer for your car brand can be challenging. However, at Expat Car Buyers, we buy all makes and models of vehicles, considering condition, model year, and mileage.
                            </p>
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
                    <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden bg-white">
                        {[
                            {
                                q: 'How to sell a Dubai car in Abu Dhabi?',
                                a: 'You can sell a Dubai car in Abu Dhabi privately or take the easy way out and accept the dealer\'s pricing, but either way you\'ll have to make a decision. In Abu Dhabi, there are many options for private sellers — consider putting up a flyer at a local gym or supermarket. However, the most popular option for selling a car in Abu Dhabi is to contact a reliable website that buys pre-owned vehicles. Selling your automobile privately in Abu Dhabi could get you a higher price than selling to a dealership would.',
                            },
                            {
                                q: 'How to scrap a car in Abu Dhabi?',
                                a: 'In Abu Dhabi and the surrounding area, Expat Car Buyers pay competitive prices for scrap automobiles. We are the go-to company for reliable services, which is why scrap auto sellers turn to us. The value of scrap metal is highly volatile, and we can help you scrap your car in Abu Dhabi at the optimal timing and price. If your vehicle breaks down or is totalled, you may trust us to negotiate the best possible settlement on your behalf.',
                            },
                        ].map(({ q, a }) => (
                            <details key={q} className="group p-6">
                                <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                                    <span className="font-bold text-gray-900">{q}</span>
                                    <ChevronDown className="w-5 h-5 text-[#f24026] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-gray-600 leading-relaxed">{a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
