"use client";

import React from 'react';
import Link from 'next/link';

const contactItems = [
    {
        icon: (
            <svg width="20" height="25" viewBox="0 0 29 35" fill="none" className="flex-shrink-0 mt-0.5">
                <path d="M24.2428 4.22264C21.6291 1.60433 18.0815 0.133301 14.3821 0.133301C10.6824 0.133301 7.13505 1.60433 4.52117 4.22264C2.00104 6.75657 0.483395 10.1174 0.248729 13.6835C0.127619 15.6369 0.414115 17.5937 1.08973 19.4301C1.75622 21.2543 2.83891 22.9782 4.31281 24.5441L13.7742 34.6214C13.9315 34.7899 14.1513 34.8863 14.3821 34.8879C14.6134 34.8902 14.835 34.7933 14.9903 34.6214L24.4511 24.5441C25.925 22.9782 27.0077 21.2543 27.6742 19.4301C28.3582 17.596 28.6449 15.6372 28.5155 13.6835C28.279 10.1179 26.7616 6.75761 24.2428 4.22264ZM26.1 18.8556C25.5088 20.4711 24.5428 22.0039 23.2268 23.4028L14.3821 32.8308L5.52885 23.4028C4.21305 22.0039 3.24704 20.4711 2.65556 18.8556C2.0547 17.2387 1.80232 15.5132 1.91457 13.7919C2.12059 10.6274 3.4666 7.64471 5.70387 5.39675C8.00444 3.09359 11.1265 1.79888 14.3821 1.79888C17.6377 1.79888 20.7595 3.09359 23.0603 5.39675C25.2973 7.64471 26.6439 10.6274 26.8496 13.7919C26.9554 15.5134 26.7001 17.2384 26.1 18.8556Z" fill="#F24026" />
                <path d="M14.3819 6.9292C10.8007 6.9292 7.88574 9.91032 7.88574 13.5749C7.88574 17.2394 10.8007 20.2211 14.3819 20.2211C17.9631 20.2211 20.8781 17.2394 20.8781 13.5749C20.8781 9.91032 17.9631 6.9292 14.3819 6.9292ZM14.3819 18.5555C11.7167 18.5555 9.55133 16.3234 9.55133 13.5749C9.55133 10.8266 11.7167 8.59478 14.3819 8.59478C17.0471 8.59478 19.2125 10.8266 19.2125 13.5749C19.2125 16.3234 17.0471 18.5555 14.3819 18.5555Z" fill="#F24026" />
            </svg>
        ),
        label: 'Our Location',
        value: 'Near FAB Metrostation, Al Asmawi Building, Sheikh Zayed Road, Office No. G17 — Dubai, UAE',
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02L6.62 10.79z" fill="#F24026" />
            </svg>
        ),
        label: 'Service Helpline',
        value: '+971 56 1774555',
        href: 'tel:+971561774555',
    },
    {
        icon: (
            <svg width="18" height="14" viewBox="0 0 24 18" fill="none" className="flex-shrink-0 mt-0.5">
                <path d="M22 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H22C23.1 18 24 17.1 24 16V2C24 0.9 23.1 0 22 0ZM22 4L12 11L2 4V2L12 9L22 2V4Z" fill="#F24026" />
            </svg>
        ),
        label: 'Support Email',
        value: 'contact@expatcarbuyers.com',
        href: 'mailto:contact@expatcarbuyers.com',
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <>
            {/* ── Contact Strip ── */}
            <section className="border-t border-gray-100 bg-white py-12">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-0">
                        {/* Contact info */}
                        <div className="md:w-1/2 md:pr-10">
                            <h4 className="text-lg font-bold text-gray-900 mb-6">Keep in Touch</h4>
                            <ul className="space-y-5">
                                {contactItems.map(item => (
                                    <li key={item.label} className="flex gap-3 items-start">
                                        {item.icon}
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-0.5">{item.label}</p>
                                            {item.href ? (
                                                <a href={item.href} className="text-[#626161] hover:text-[#f24026] transition-colors text-sm">
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <span className="text-[#626161] text-sm">{item.value}</span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Map */}
                        <div className="md:w-1/2">
                            <img
                                src="/front/images/map.webp"
                                alt="Our location on map"
                                className="w-full rounded-2xl object-cover"
                                style={{ maxHeight: '240px' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Dark Footer ── */}
            <footer className="footer-dark text-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                        {/* About */}
                        <div>
                            <Link href="/">
                                <img
                                    src="/front/images/logo.webp"
                                    alt="ExpatCarBuyers"
                                    width={160}
                                    className="mb-5 brightness-0 invert"
                                />
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                                Many people would just call us a car buying company, but that&apos;s just half of the story. Expat Car Buyers was formed to make it easier for car sellers to sell used cars — without the traditional setbacks.
                            </p>
                            {/* Social */}
                            <div className="flex gap-3">
                                {['facebook', 'twitter', 'instagram'].map(platform => (
                                    <a
                                        key={platform}
                                        href={`https://www.${platform}.com/expatcarbuyers/`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-social-btn"
                                        aria-label={platform}
                                    >
                                        <img src={`/images/${platform}.webp`} alt={platform} width={16} height={16} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick links + contact repeat */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <h6 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Quick Links</h6>
                                <ul className="space-y-2">
                                    {[
                                        { label: 'Home', href: '/' },
                                        { label: 'Sell Car in Sharjah', href: '/sell-car-sharjah' },
                                        { label: 'Sell Car in Abu Dhabi', href: '/sell-car-abu-dhabi' },
                                        { label: 'Evaluate My Car', href: '/car-valuation' },
                                        { label: 'Cash for Cars', href: '/cash-for-cars' },
                                        { label: 'We Buy Any Car', href: '/we-buy-any-car' },
                                        { label: 'About Us', href: '/about-us' },
                                        { label: 'Blog', href: '/blog' },
                                        { label: 'Privacy Policy', href: '/privacy-policy' },
                                        { label: 'Terms & Conditions', href: '/terms-conditions' },
                                    ].map(link => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-400 hover:text-[#f24026] text-sm transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h6 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Contact</h6>
                                <ul className="space-y-3 text-sm text-gray-400">
                                    <li>
                                        Near FAB Metrostation,<br />
                                        Al Asmawi Building,<br />
                                        Sheikh Zayed Road,<br />
                                        Dubai — UAE
                                    </li>
                                    <li>
                                        <a href="tel:+971561774555" className="hover:text-[#f24026] transition-colors">
                                            +971 56 1774555
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:contact@expatcarbuyers.com" className="hover:text-[#f24026] transition-colors">
                                            contact@expatcarbuyers.com
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
                        <span suppressHydrationWarning>© {year} ExpatCarBuyers. All rights reserved.</span>
                        <div className="flex items-center gap-1">
                            <Link href="/privacy-policy" className="hover:text-[#f24026] transition-colors px-2">Privacy Policy</Link>
                            <span>·</span>
                            <Link href="/terms-conditions" className="hover:text-[#f24026] transition-colors px-2">Terms & Conditions</Link>
                            <span>·</span>
                            <Link href="/contact" className="hover:text-[#f24026] transition-colors px-2">Contact</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
