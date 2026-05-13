"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* ─── Navigation Data ────────────────────────────────────────── */
const navItems = [
    /* {
        id: 'sell-car',
        label: 'SELL CAR',
        children: [
            { label: 'Sell My Car', href: '/sell-my-car' },
            { label: 'We Buy Any Car', href: '/we-buy-any-car' },
            { label: 'Cash for Cars', href: '/cash-for-cars' },
        ],
    }, */
    {
        id: 'by-city',
        label: 'BY CITY',
        children: [
            { label: 'Sell Car in Sharjah', href: '/sell-car-sharjah' },
            { label: 'Sell Car in Abu Dhabi', href: '/sell-car-abu-dhabi' },
        ],
    },
    { id: 'evaluate', label: 'EVALUATE YOUR CAR', href: '/car-valuation' },
    { id: 'about',    label: 'ABOUT US',          href: '/about-us' },
    { id: 'blog',     label: 'BLOGS',             href: '/blog' },
    { id: 'contact',  label: 'CONTACT',           href: '/contact' },
];

/* ─── Icons ──────────────────────────────────────────────────── */
const ChevronDown = ({ open }: { open: boolean }) => (
    <svg
        fill="currentColor"
        width="9"
        height="9"
        viewBox="0 0 330 330"
        className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
        <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
    </svg>
);

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" className="flex-shrink-0">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02L6.62 10.79z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg viewBox="0 0 32 32" fill="currentColor" width="17" height="17" className="flex-shrink-0">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.823.736 5.476 2.023 7.782L0 32l8.418-2.007A15.938 15.938 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.258 22.337c-.343.962-2.01 1.837-2.753 1.95-.743.113-1.668.16-2.69-.168-.62-.2-1.415-.468-2.434-.916-4.278-1.845-7.075-6.105-7.29-6.388-.213-.283-1.745-2.315-1.745-4.418 0-2.103 1.103-3.136 1.494-3.563.391-.427.85-.534 1.133-.534.284 0 .567.002.815.015.262.014.613-.099.96.733.355.85 1.207 2.95 1.314 3.164.107.213.178.463.035.74-.143.278-.213.45-.425.693-.213.242-.447.541-.638.726-.213.2-.434.417-.187.817.248.4 1.1 1.812 2.362 2.937 1.624 1.447 2.995 1.893 3.405 2.107.41.213.65.178.89-.107.24-.284 1.026-1.194 1.3-1.604.272-.41.543-.342.915-.213.37.13 2.36 1.113 2.763 1.315.4.2.666.3.764.467.1.167.1.962-.243 1.922z"/>
    </svg>
);

/* ─── Header Component ───────────────────────────────────────── */
export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    /* close dropdown on outside click */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* shadow on scroll */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const toggle = (id: string) =>
        setActiveMenu(prev => (prev === id ? null : id));

    return (
        <header
            className="site-header"
            style={{ boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,.12)' : '0 2px 8px rgba(0,0,0,.06)' }}
        >
            {/* ══ TOP BAR: Logo + Contact Buttons ══ */}
            <div className="bg-white px-4 md:px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between" style={{ minHeight: '72px' }}>

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0" aria-label="ExpatCarBuyers Home">
                        <img
                            src="/front/images/logo.webp"
                            alt="ExpatCarBuyers"
                            width={220}
                            height={36}
                            className="h-9 w-auto"
                        />
                    </Link>

                    {/* Desktop: WhatsApp + Phone */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="https://wa.me/971561774555"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="whatsapp-header-btn"
                            className="header-contact-btn whatsapp-btn"
                        >
                            <WhatsAppIcon />
                            <span>Click to Chat</span>
                        </a>
                        <a
                            href="tel:+971561774555"
                            id="phone-header-btn"
                            className="header-contact-btn phone-btn"
                        >
                            <PhoneIcon />
                            <span>+971 56 1774555</span>
                        </a>
                    </div>

                    {/* Mobile: WhatsApp icon + Hamburger */}
                    <div className="flex lg:hidden items-center gap-3">
                        <a
                            href="https://wa.me/971561774555"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                            style={{ background: '#25d366' }}
                            aria-label="WhatsApp Chat"
                        >
                            <WhatsAppIcon />
                        </a>
                        <button
                            type="button"
                            className="flex flex-col justify-center gap-[5px] p-2 rounded"
                            onClick={() => setMobileOpen(v => !v)}
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                        >
                            <span className={`block h-0.5 w-6 bg-gray-800 transition-all origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} style={{ transitionDuration: isHome ? '300ms' : '0ms' }} />
                            <span className={`block h-0.5 w-6 bg-gray-800 transition-all ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} style={{ transitionDuration: isHome ? '300ms' : '0ms' }} />
                            <span className={`block h-0.5 w-6 bg-gray-800 transition-all origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} style={{ transitionDuration: isHome ? '300ms' : '0ms' }} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ══ DESKTOP NAV BAR ══ */}
            <nav className="nav-bar hidden lg:block border-t border-white/10" ref={navRef} aria-label="Main Navigation">
                <div className="max-w-7xl mx-auto px-4">
                    <ul className="flex items-center justify-center">
                        {navItems.map(item => {
                            const isExpanded = activeMenu === item.id;
                            return (
                                <li key={item.id} className="relative">
                                    {item.children ? (
                                        <>
                                            <button
                                                type="button"
                                                id={`nav-${item.id}`}
                                                className="nav-link-item"
                                                onClick={() => toggle(item.id)}
                                                aria-haspopup="true"
                                                aria-expanded={isExpanded}
                                            >
                                                {item.label}
                                                <ChevronDown open={isExpanded} />
                                            </button>
                                            {isExpanded && (
                                                <div className={`sub-menu ${item.id === 'by-model' ? 'sub-menu--tall' : ''}`}>
                                                    {item.children.map(child => (
                                                        <Link
                                                            key={child.label}
                                                            href={child.href}
                                                            className="sub-menu-link"
                                                            onClick={() => setActiveMenu(null)}
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link href={item.href!} className="nav-link-item">
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            {/* ══ MOBILE MENU ══ */}
            <div
                className={`lg:hidden overflow-hidden transition-all ease-in-out ${mobileOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ background: '#f24026', transitionDuration: isHome ? '300ms' : '0ms' }}
            >
                <div className="px-4 py-3 border-t border-[#f84429]">
                    {navItems.map(item => {
                        const isExpanded = activeMenu === item.id;
                        return (
                            <div key={item.id}>
                                {item.children ? (
                                    <>
                                        <button
                                            type="button"
                                            className="w-full flex items-center justify-between text-white font-bold py-3.5 text-sm tracking-widest border-b border-white/10"
                                            onClick={() => toggle(item.id)}
                                            aria-expanded={isExpanded}
                                        >
                                            {item.label}
                                            <ChevronDown open={isExpanded} />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-200 ${isExpanded ? 'max-h-72' : 'max-h-0'}`}>
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl my-1.5 overflow-y-auto max-h-56">
                                                {item.children.map(child => (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href}
                                                        className="block px-5 py-3 text-white text-sm border-b border-white/10 last:border-0 hover:bg-white/10 transition-colors"
                                                        onClick={() => { setMobileOpen(false); setActiveMenu(null); }}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href!}
                                        className="block text-white font-bold py-3.5 text-sm tracking-widest border-b border-white/10 hover:text-white/80 transition-colors"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        );
                    })}

                    {/* Mobile contact buttons */}
                    <div className="flex gap-3 mt-4 pb-2">
                        <a
                            href="https://wa.me/971561774555"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-3 rounded-xl text-sm"
                            style={{ background: '#25d366' }}
                        >
                            <WhatsAppIcon /> WhatsApp
                        </a>
                        <a
                            href="tel:+971561774555"
                            className="flex-1 flex items-center justify-center gap-2 bg-white text-[#f24026] font-bold py-3 rounded-xl text-sm"
                        >
                            <span style={{ color: '#f24026' }}><PhoneIcon /></span>
                            Call Now
                        </a>
                    </div>
                </div>
            </div>

            {/* ══ Mobile sticky floating phone button ══ */}
            <a
                href="tel:+971561774555"
                className="lg:hidden fixed bottom-6 right-5 z-[999] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl"
                style={{ background: '#f24026', boxShadow: '0 4px 20px rgba(242,64,38,.5)' }}
                aria-label="Call us"
            >
                <PhoneIcon />
            </a>
        </header>
    );
}
