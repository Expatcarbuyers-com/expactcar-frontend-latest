"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const testimonials = [
    {
        name: "Ahmed Ballaa",
        text: "Just want to say how easy the process was and thanks to the amazing Kaiser at Expat Buyers for helping me sell my car",
    },
    {
        name: "Nadeem Asghar",
        text: "Overall, my experience with Expat Car Buyers was outstanding. If you're an expat looking to sell your car, I wholeheartedly recommend their services. Their professionalism, transparency, and commitment to customer satisfaction make them a standout choice in the market. Thank you, Expat Car Buyers, for making what could have been a daunting process incredibly easy and rewarding!",
    },
    {
        name: "Karan Bansal",
        text: "Received excellent assistance and professionalism throughout my car sale process by Kaiser. His attention to detail and transparent approach made the entire transaction a pleasure. Definitely recommend to reach out to Kaiser if you want to sell your car without any hassles or trust issues.",
    },
    {
        name: "M J",
        text: "I started my journey to sell my car with them and then moved to other buyers, I have to admit unlike others these guys were EXTREMELY professional and patient understanding a seller’s mind. KAISER was very kind and friendly who explained and assisted me in the entire process. And yes, their offered price was NO DOUBT THE best of all the others I checked with. I see these guys progressing to a level of big success if they maintain their transparency and professionalism as they did with me. Do not waste your time going to any other places like I did as this is the ONE STOP that you need if you want to sell your car in less than 30mins for instant cash, No bank transfer waiting period and etc, CASH IN HAND! Keep it up Expat Car Buyers and thanks a lot again",
    },
    {
        name: "Fraser Robertson",
        text: "Great team to deal with and fair price given for my vehicle! All necessary paperwork sorted with ease and that Syed was my first contact who was pleasant and helpful with doing the vehicle and analysis. With Qaiser helping out with the transfer of vehicle and payment side of things. Both members were polite and friendly! Well recommended! Payment via bank transfer was fast too!",
    },
    {
        name: "Happie Rao",
        text: "I had amazing experience of selling my car through expatcarbuyers. Wonderful experience and highly recommend",
    },
];

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    </svg>
);

export default function TestimonialCarousel() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [index, setIndex] = useState(0);
    const [perPage, setPerPage] = useState(3);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 640) setPerPage(1);
            else if (window.innerWidth < 1024) setPerPage(2);
            else setPerPage(3);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const maxIndex = Math.max(0, testimonials.length - perPage);
    const next = () => setIndex(i => Math.min(i + 1, maxIndex));
    const prev = () => setIndex(i => Math.max(i - 1, 0));
    const cardWidth = 100 / perPage;

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div
                    ref={trackRef}
                    className="flex transition-transform ease-in-out"
                    style={{ 
                        transform: `translateX(-${index * cardWidth}%)`,
                        transitionDuration: isHome ? '500ms' : '0ms'
                    }}
                >
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 px-3"
                            style={{ width: `${cardWidth}%` }}
                        >
                            <div className="review-card flex flex-col items-center text-center p-8 bg-white rounded-[2rem] shadow-xl border border-[#FFD0C9]/50" style={{ minHeight: '380px' }}>
                                <div className="mb-6">
                                    <img src="/front/images/5stars.png" alt="5 stars" width={120} className="mx-auto" />
                                </div>
                                
                                <p className="text-[#626161] text-[0.95rem] leading-relaxed mb-8 italic flex-grow">
                                    &ldquo;{t.text}&rdquo;
                                </p>

                                <div className="mt-auto pt-6 border-t border-gray-100 w-full flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full border-4 border-[#FFD0C9] mb-4 shadow-md bg-[#FCF5F2] flex items-center justify-center text-[#f24026] font-bold text-xl">
                                        {t.name.charAt(0)}
                                    </div>
                                    <h4 className="font-bold text-gray-900 text-base mb-1">{t.name}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2.5 rounded-full transition-all duration-200 ${i === index ? 'bg-[#f24026] w-6' : 'bg-gray-300 w-2.5'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Arrow Controls */}
            <div className="flex justify-center gap-3 mt-4">
                <button
                    onClick={prev}
                    disabled={index === 0}
                    className="w-10 h-10 rounded-full border-2 border-[#f24026] text-[#f24026] flex items-center justify-center hover:bg-[#f24026] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={next}
                    disabled={index === maxIndex}
                    className="w-10 h-10 rounded-full border-2 border-[#f24026] text-[#f24026] flex items-center justify-center hover:bg-[#f24026] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
