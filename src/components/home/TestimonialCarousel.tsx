"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Star } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Testimonial {
    name: string;
    text: string;
}

const testimonials: Testimonial[] = [
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

const StarRating = () => (
    <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        ))}
    </div>
);

export default function TestimonialCarousel() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [index, setIndex] = useState(0);
    const [perPage, setPerPage] = useState(3);
    const [selectedReview, setSelectedReview] = useState<Testimonial | null>(null);
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

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (selectedReview) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedReview]);

    return (
        <div className="relative">
            {/* Header with Title and CarSwitch-style Navigation Controls */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    Our Happy <span className="text-[#f24026]">Customers</span>
                </h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={prev}
                        disabled={index === 0}
                        className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-700 flex items-center justify-center hover:border-[#f24026] hover:text-[#f24026] hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                        aria-label="Previous testimonials"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={next}
                        disabled={index === maxIndex}
                        className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-700 flex items-center justify-center hover:border-[#f24026] hover:text-[#f24026] hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                        aria-label="Next testimonials"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Carousel Slider */}
            <div className="overflow-hidden">
                <div
                    ref={trackRef}
                    className="flex transition-transform ease-in-out"
                    style={{ 
                        transform: `translateX(-${index * cardWidth}%)`,
                        transitionDuration: isHome ? '500ms' : '0ms'
                    }}
                >
                    {testimonials.map((t, i) => {
                        const isLong = t.text.length > 120;
                        const displayText = isLong ? t.text.slice(0, 115).trim() : t.text;

                        return (
                            <div
                                key={i}
                                className="flex-shrink-0 px-2.5"
                                style={{ width: `${cardWidth}%` }}
                            >
                                {/* Uniform Fixed-Size Review Card */}
                                <div className="h-[250px] p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between text-left group">
                                    <div>
                                        {/* 5 Yellow Stars */}
                                        <div className="mb-3.5">
                                            <StarRating />
                                        </div>

                                        {/* Truncated Review Text with read more */}
                                        <p className="text-gray-600 text-[0.92rem] leading-relaxed">
                                            &ldquo;{displayText}
                                            {isLong && (
                                                <>
                                                    &hellip;&rdquo;
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedReview(t)}
                                                        className="text-[#f24026] font-semibold text-xs ml-1 hover:underline cursor-pointer inline-block"
                                                    >
                                                        read more
                                                    </button>
                                                </>
                                            )}
                                            {!isLong && <>&rdquo;</>}
                                        </p>
                                    </div>

                                    {/* Footer: Avatar + Name on left, Google Icon on right (NO DATE) */}
                                    <div className="flex items-center justify-between pt-3.5 border-t border-gray-50 mt-auto">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 rounded-full bg-[#FCF5F2] border border-[#FFD0C9] text-[#f24026] font-bold flex items-center justify-center text-sm shrink-0">
                                                {t.name.charAt(0)}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-gray-900 text-sm truncate">
                                                    {t.name}
                                                </h4>
                                            </div>
                                        </div>

                                        <div className="shrink-0 pl-2" title="Verified Google Review">
                                            <GoogleIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-7">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${i === index ? 'bg-[#f24026] w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Bottom Google Link */}
            <div className="text-center mt-6">
                <a
                    href="https://share.google/62cwKyDxgxk8IJISS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#f24026] transition-colors"
                >
                    <GoogleIcon />
                    <span>Read all reviews on Google &rarr;</span>
                </a>
            </div>

            {/* Modal for Full Review Expansion */}
            {selectedReview && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
                    onClick={() => setSelectedReview(null)}
                >
                    <div
                        className="bg-white rounded-3xl max-w-lg w-full p-7 md:p-8 shadow-2xl relative border border-gray-100 text-left animate-in fade-in zoom-in-95 duration-150"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedReview(null)}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Close review"
                        >
                            <X size={18} />
                        </button>

                        {/* Stars */}
                        <div className="mb-4">
                            <StarRating />
                        </div>

                        {/* Full Review Text */}
                        <div className="max-h-[50vh] overflow-y-auto pr-2 mb-6">
                            <p className="text-gray-700 text-base leading-relaxed italic">
                                &ldquo;{selectedReview.text}&rdquo;
                            </p>
                        </div>

                        {/* Reviewer Info */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-[#FCF5F2] border border-[#FFD0C9] text-[#f24026] font-bold flex items-center justify-center text-base shrink-0">
                                    {selectedReview.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-base">{selectedReview.name}</h4>
                                    <span className="text-xs text-gray-500 font-medium">Verified Customer</span>
                                </div>
                            </div>

                            <a
                                href="https://share.google/62cwKyDxgxk8IJISS"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full border border-gray-100 shrink-0 transition-colors"
                            >
                                <GoogleIcon />
                                <span className="text-xs font-semibold text-gray-700">Google Review</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
