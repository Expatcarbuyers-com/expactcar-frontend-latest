"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Car, Hash, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MeiliSearch } from 'meilisearch';

const meiliClient = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILI_HOST || 'http://localhost:7700',
    apiKey: process.env.NEXT_PUBLIC_MEILI_SEARCH_KEY || 'masterKey',
});

const variantsIndex = meiliClient.index('variants');

interface SearchResult {
    id: number;
    name: string;
    year: number;
    make: string;
    model: string;
    body_type: string;
    engine: string;
    transmission: string;
}

export default function QuickSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchCars = async (q: string) => {
        if (q.length < 2) {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            const result = await variantsIndex.search<SearchResult>(q, {
                limit: 10,
                attributesToRetrieve: ['id', 'name', 'year', 'make', 'model', 'body_type', 'engine', 'transmission'],
            });
            // Format each hit to have a readable full name
            const formatted = result.hits.map(hit => ({
                ...hit,
                name: `${hit.year} ${hit.make} ${hit.model} ${hit.name}`,
            }));
            setResults(formatted);
            setIsOpen(true);
        } catch (e) {
            console.error("Meilisearch error, falling back to API", e);
            // Fallback to Laravel API search if Meilisearch is unavailable
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1'}/search?q=${q}`
                );
                const data = await res.json();
                setResults(data.data || []);
                setIsOpen(true);
            } catch (apiFallbackError) {
                console.error("API fallback also failed", apiFallbackError);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query) searchCars(query);
            else setResults([]);
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div ref={containerRef} className="relative w-full max-w-2xl mx-auto z-50">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#f24026] transition-colors" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                    placeholder="Search by Make, Model, or Year (e.g. 2024 BMW X5)"
                    className="block w-full pl-12 pr-12 py-5 bg-white border-2 border-transparent shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-3xl text-lg outline-none focus:border-[#f24026]/30 focus:shadow-[0_10px_40px_-10px_rgba(242,64,38,0.15)] transition-all placeholder:text-gray-500 text-gray-900"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    {loading ? (
                        <Loader2 className="h-5 w-5 text-[#f24026] animate-spin" />
                    ) : query && (
                        <button
                            onClick={() => { setQuery(''); setResults([]); }}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Clear search"
                            title="Clear search"
                        >
                            <X className="h-5 w-5 text-gray-400" />
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute w-full mt-3 bg-white border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden"
                    >
                        <div className="max-h-[400px] overflow-y-auto overflow-x-hidden scrollbar-hide">
                            <div className="p-2">
                                {results.map((car) => (
                                    <button
                                        key={car.id}
                                        className="w-full flex items-center gap-4 p-4 hover:bg-[#FCF5F2] rounded-2xl text-left transition-colors group"
                                        onClick={() => {
                                            // Per-make/model landing pages (/sell-my-{make}-{model}) were
                                            // removed — send the user to the valuation form instead.
                                            window.location.href = `/car-valuation`;
                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-[#f24026] transition-colors border border-transparent group-hover:border-[#FFD0C9]">
                                            <Car className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-900 leading-none mb-1 group-hover:text-[#d6351f] transition-colors">
                                                {car.name}
                                            </h4>
                                            <div className="flex items-center gap-3">
                                                {car.body_type && (
                                                    <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md uppercase tracking-wider">
                                                        {car.body_type}
                                                    </span>
                                                )}
                                                {car.engine && (
                                                    <span className="text-sm text-gray-600 font-medium">
                                                        {car.engine}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-8 h-8 rounded-full bg-[#f24026] flex items-center justify-center text-white">
                                                <Hash className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                            <p className="text-xs text-gray-600 font-bold">Showing top {results.length} matches from 528k+ variants · Powered by Meilisearch</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
