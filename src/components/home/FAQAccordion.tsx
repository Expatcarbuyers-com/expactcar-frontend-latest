"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface FAQItem {
    question: string;
    answer: React.ReactNode;
}

const homeFaqs: FAQItem[] = [
    {
        question: "How do I sell my car in UAE?",
        answer: (
            <div className="space-y-3">
                <p>With our fast car selling steps you can easily sell your car in UAE and walk away with cash payment in 30 minutes! </p>
                <p>All you need to do is drop by our office located in the UAE to schedule an appointment.</p>
                <p>Choose the date and time that suits you best for selling your car in Dubai. On that day, bring your car for valuation to be conducted by our highly skilled experts. </p>
                <p>Once your car’s inspection is completed, we will then evaluate your car within minutes and offer best price in market with no obligations.</p>
                <p>You can complete the transaction then and there. If you accept our offer and decide to sell your car to us, we will handle all paperwork and Instant cash will be paid to you.</p>
                <p>Selling your car in UAE has never been easier!</p>
            </div>
        )
    },
    {
        question: "What are your payment options?",
        answer: <p>Cash, direct bank transfer, or a cheque — whichever you prefer. Most customers are paid within 30 minutes of accepting the offer.</p>
    },
    {
        question: "What documents do I need to bring?",
        answer: (
            <div className="space-y-2">
                <p>Your Emirates ID, the vehicle&apos;s registration card (Mulkiya), and — if applicable — your finance settlement letter or Power of Attorney if you&apos;re selling on someone else&apos;s behalf.</p>
            </div>
        )
    },
    {
        question: "I have a bank loan or unpaid car fines. Can I still sell?",
        answer: (
            <div className="space-y-3">
                <p>Yes. We settle any outstanding finance directly with your lender and deduct unpaid Salik/RTA fines from the sale price, so you walk away with a clean, final number.</p>
            </div>
        )
    }
];

const weBuyAnyCarFaqs: FAQItem[] = [
    {
        question: "Do you buy cars that still have a bank loan on them?",
        answer: <p>Yes. Tell us your outstanding finance amount when you book your appointment. We settle the loan directly with your bank as part of the sale and pay you any remaining difference in cash.</p>
    },
    {
        question: "Will you buy my car if it isn't registered in my name?",
        answer: <p>If the car isn&apos;t registered to you, you&apos;ll need a letter of authorization (Power of Attorney) from the registered owner, and the payment must be made in that owner&apos;s name.</p>
    },
    {
        question: "How is the price you offer calculated?",
        answer: <p>We inspect the car&apos;s mileage, mechanical condition, accident history and current market demand for that make and model, then price it against live UAE resale data — the same process whether you&apos;re selling a daily runabout or a luxury SUV.</p>
    },
    {
        question: "Is there a fee for the inspection or valuation?",
        answer: <p>No. The inspection, valuation and paperwork are free whether or not you go on to sell to us.</p>
    },
];

const FAQAccordion = () => {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const isWeBuyAnyCar = pathname === '/we-buy-any-car';
    const faqs = isWeBuyAnyCar ? weBuyAnyCarFaqs : homeFaqs;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-4 w-full">
            {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                    <div 
                        key={index} 
                        className={`group border rounded-2xl transition-all duration-300 overflow-hidden ${
                            isOpen 
                            ? 'bg-white border-[#f24026] shadow-lg shadow-red-500/5' 
                            : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                        }`}
                    >
                        <button 
                            className="w-full p-5 md:p-6 text-left flex justify-between items-center gap-4 transition-colors"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                        >
                            <span className={`text-base md:text-lg font-bold transition-colors ${
                                isOpen ? 'text-[#f24026]' : 'text-gray-900'
                            }`}>
                                {faq.question}
                            </span>
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isOpen ? 'bg-[#f24026] text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'
                            }`}>
                                <ChevronDown size={20} />
                            </div>
                        </button>
                        
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={isHome ? { height: 0, opacity: 0 } : { height: 'auto', opacity: 1 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={isHome ? { height: 0, opacity: 0 } : { height: 'auto', opacity: 1 }}
                                    transition={isHome ? { duration: 0.3, ease: "easeInOut" } : { duration: 0 }}
                                >
                                    <div className="px-6 pb-6 pt-0">
                                        <div className="h-px bg-gray-50 mb-6" />
                                        <div className="text-gray-600 leading-relaxed text-[0.95rem]">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};

export default FAQAccordion;
