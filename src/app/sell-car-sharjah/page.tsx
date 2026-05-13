import React from 'react';
import type { Metadata } from 'next';
import ValuationFormServer from '@/components/valuation-form/ValuationFormServer';
import { ChevronDown } from 'lucide-react';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import PriceIncludedSection from '@/components/PriceIncludedSection';

export const metadata: Metadata = {
    title: 'Sell Any Car in Sharjah | Sell Your Car Across Sharjah in 30 Minutes',
    description: 'Do you want to sell your car fast in Sharjah? We can help you with it. Get a no-obligation quote and instant cash within 30 minutes.',
};

export default function SharjahPage() {
    return (
        <main className="overflow-x-hidden">
            {/* ══════════════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════════════ */}
            <section className="landing-hero">
                <div className="landing-hero-blob" style={{ background: '#E6F0FF' }} />
                
                <div className="landing-hero-container">
                    <div className="landing-hero-content relative">
                        <div>
                            <span className="text-[#f24026] font-bold text-sm uppercase tracking-widest mb-4 block">
                                Sell Fast in Sharjah
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                                Sell My Car in <br />
                                <span className="text-[#f24026]">Sharjah</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
                                Do you want to sell your car fast in Sharjah? We can help you with it. Get market competitive cash deal for your used car.
                            </p>
                        </div>
                        
                        <div className="hidden lg:block relative mt-12 max-w-lg">
                            {/* Static Premium Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-[#f24026]/5 rounded-full blur-3xl -z-10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-[#FFD0C9]/30 rounded-[50%_50%_40%_60%] -z-5" />
                            
                            <img
                                src="/front/images/sharjah-sports-car.png" 
                                alt="Sell My Car Sharjah"
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
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16 uppercase tracking-wider">How does it works?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { title: 'Schedule appointment', desc: 'You can fill the online form and schedule a date and time for your appointment.' },
                            { title: 'Bring your car', desc: 'You can bring your car to the Expat Car Buyers showroom on the date and time of the appointment.' },
                            { title: 'Get your no-obligation quote', desc: 'We will inspect your car and provide you with a no-obligation quote.' },
                            { title: 'Sell your car', desc: 'If you are happy with the amount we are planning to offer, you can sell your car to us!' }
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
                            <h2 className="text-3xl font-bold mb-8 uppercase tracking-wider">How to Sell Car in Sharjah</h2>
                            <div className="prose prose-lg text-gray-700 max-w-none space-y-6 mb-12">
                                <p>
                                    Are you looking to sell your car in Sharjah? Expat Car Buyers can help make the process quick and hassle-free. As one of the leading car buyers in Sharjah, we offer a seamless and transparent process to help you sell your car.
                                </p>
                                <p>
                                    To sell your car in Sharjah, you can simply search for &ldquo;sell my car Sharjah&rdquo; or &ldquo;sell car Sharjah&rdquo; online and you will find numerous options available. However, it&apos;s important to choose a reputable and trustworthy car buyer that can offer you the best price for your car. That&rsquo;s where we can help.
                                </p>
                                <p>
                                    At Expat Car Buyers, we make the process of selling your car in Sharjah easy and convenient. We offer a free car valuation service, where our experts will evaluate your car&apos;s condition and provide you with a fair and competitive price. You can then choose to sell your car to us for cash, with no hidden fees or charges.
                                </p>
                            </div>

                            <h2 className="text-3xl font-bold mb-8 uppercase tracking-wider">Sell Car in Sharjah at the right price</h2>
                            <div className="prose prose-lg text-gray-700 max-w-none space-y-6">
                                <p>
                                    Selling your car in Sharjah can be a daunting task, especially if you&apos;re not sure how to get the best price. At Expat Car Buyers, we understand that getting the right price for your car is important, which is why we offer a hassle-free and transparent process to help you sell your car in Sharjah.
                                </p>
                                <p>
                                    We offer a convenient online service where you can easily sell car online Sharjah. Simply visit our website and fill out our online form to get a free car valuation. If you&apos;re happy with the price we offer, we&apos;ll buy your car for cash. We are the best &ldquo;Cash Car Sharjah&rdquo; team to consider.
                                </p>
                                <p>
                                    Our team of experienced car experts will evaluate your car&apos;s condition, mileage, and other factors to determine the best price for your car. We provide a &ldquo;cash my car Sharjah&rdquo; service, where we can pay you cash on the spot for your car.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <div className="bg-[#FCF5F2] p-10 rounded-[3rem] border border-[#FFD0C9]">
                                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Expert Local Support</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Our Sharjah team is specialized in the local market, ensuring you get the most accurate valuation and fastest service in the city. From Muwailih to Al Majaz, we cover all areas.
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
                                        { title: 'Comprehensive Car Valuation', desc: 'Once you bring your car to one of our showrooms, we will do a comprehensive valuation. Then we price it according to the current market value.', icon: '01' },
                                        { title: 'Ownership Transfer', desc: 'We will take care of all the ownership transfer documents. You just need to sign our agreement.', icon: '02' },
                                        { title: 'Finance Settlement', desc: 'If your car is under finance, we will be able to settle it in the best possible way. You don’t have to worry about settling it on your own.', icon: '03' },
                                        { title: 'Get paid in 30 minutes', desc: 'We ensure that you will be paid in cash for the value of your car within just 30 minutes!', icon: '04' }
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
                            &ldquo;What people are saying in <span className="text-[#f24026]">Sharjah?</span>&rdquo;
                        </h2>
                        <div className="w-24 h-1 bg-[#f24026] mx-auto rounded-full" />
                    </div>
                    <TestimonialCarousel />
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
                                q: 'How do I transfer ownership of a car in Sharjah?',
                                a: 'To transfer ownership, provide the original number plate and Emirates ID (original for the seller, photocopy for the buyer). The old owner clears any outstanding fines and provides documents to an official who cancels the plate and issues a "Transfer Certificate" or "Hayaza" (costs approximately AED 450). The new document lists both parties\' names, then the buyer registers the vehicle in their name.',
                            },
                            {
                                q: 'What is the easiest way to sell a car in Sharjah?',
                                a: 'The easiest and most efficient way to sell your car in Sharjah is to get in touch with Expat Car Buyers. We schedule convenient appointments, offer a professional service, and provide cash for your car irrespective of your location in Sharjah.',
                            },
                            {
                                q: 'Can I authorize someone to sell my car in Sharjah?',
                                a: 'Yes, by obtaining a letter of authorization (Power of Attorney) from the registered owner. Payment and transaction details must match the owner\'s name on the car\'s title.',
                            },
                            {
                                q: 'Why should I choose Expat Car Buyers to sell my car in Sharjah?',
                                a: 'Expat Car Buyers provides a hassle-free, safe, and secure platform with expert knowledge of local markets. We handle all paperwork, offer free valuations, ensure competitive pricing, and manage the ownership transfer smoothly from start to finish.',
                            },
                            {
                                q: 'What are the common issues you face while selling a car in Sharjah?',
                                a: 'Common challenges include finding trustworthy dealers, time-consuming processes such as advertising, viewings and negotiations, and private sale risks like fraud and scams. Expat Car Buyers eliminates all of these by handling all paperwork and providing fully secure transactions.',
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
