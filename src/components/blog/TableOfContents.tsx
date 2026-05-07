'use client';

import React from 'react';
import { List } from 'lucide-react';

interface OutlineItem {
    title: string;
    anchor: string;
}

interface TableOfContentsProps {
    outline: OutlineItem[];
}

export default function TableOfContents({ outline }: TableOfContentsProps) {
    if (!outline || outline.length === 0) return null;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
        e.preventDefault();
        const el = document.getElementById(anchor);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <nav
            aria-label="Table of Contents"
            className="mb-10 bg-[#FCF5F2] border border-[#f24026]/20 rounded-3xl p-8"
        >
            <div className="flex items-center gap-3 mb-5">
                <List className="w-5 h-5 text-[#f24026] shrink-0" />
                <span className="text-sm font-extrabold text-gray-900 uppercase tracking-widest">
                    Table of Contents
                </span>
            </div>
            <ol className="space-y-2.5">
                {outline.map((item, index) => (
                    <li key={index} className="flex items-baseline gap-3">
                        <span className="text-[#f24026] font-bold text-sm tabular-nums shrink-0 w-5 text-right">
                            {index + 1}.
                        </span>
                        <a
                            href={`#${item.anchor}`}
                            onClick={(e) => handleClick(e, item.anchor)}
                            className="text-gray-700 hover:text-[#f24026] font-medium transition-colors leading-snug"
                        >
                            {item.title}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
