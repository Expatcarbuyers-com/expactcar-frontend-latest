"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Car,
    ChevronRight,
    ChevronLeft,
    Check,
    Loader2,
    Hash,
    User,
    Phone,
    Mail,
    Search,
    Copy,
    ClipboardCheck,
    Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import api from '@/lib/api';
import { usePathname } from 'next/navigation';

const formSchema = z.object({
    year: z.string().min(1, "Year is required"),
    make_id: z.string().min(1, "Make is required"),
    model_id: z.string().min(1, "Model is required"),
    variant_id: z.string().min(1, "Variant is required"),
    mileage: z.string().min(1, "Mileage is required"),
    specs: z.string().min(1, "Regional spec is required"),

    name: z.string().min(2, "Name is required"),
    phone: z.string().min(8, "Phone is required"),
    email: z.string().email("Valid email is required"),
});

type FormData = z.infer<typeof formSchema>;

interface ValuationFormProps {
    initialMakeId?: string;
    initialModelId?: string;
    initialYears?: number[];
    initialMakes?: any[];
    initialLatestYear?: string;
    initialTopModels?: Record<string, any[]>;
}

// Module-level cache: persists across remounts and page navigations within the session.
const memCache = new Map<string, any[]>();
const pendingRequests = new Map<string, Promise<any>>();
let globalCatalog: { c: any, mk: any, md: any } | null = null;

// PERSISTENCE: Synchronously restore catalog from storage if available for instant refresh performance
if (typeof window !== 'undefined') {
    try {
        const saved = localStorage.getItem('gv_catalog_v1');
        if (saved) globalCatalog = JSON.parse(saved);
    } catch (e) {
        console.warn("Failed to restore catalog from storage", e);
    }
}

function getCached(key: string): any[] | undefined {
    if (memCache.has(key)) return memCache.get(key);
    try {
        const raw = sessionStorage.getItem('ecb_dc_' + key);
        if (raw) { 
            const d = JSON.parse(raw); 
            memCache.set(key, d); 
            return d; 
        }
    } catch { /* sessionStorage unavailable */ }
    return undefined;
}

function setCache(key: string, data: any[]) {
    memCache.set(key, data);
    try { 
        sessionStorage.setItem('ecb_dc_' + key, JSON.stringify(data)); 
    } catch { /* quota exceeded */ }
}

// Fire-and-forget background prefetch with request deduplication
function bgFetch(url: string, cacheKey: string, onData?: (data: any[]) => void) {
    if (getCached(cacheKey) || pendingRequests.has(cacheKey)) return;
    
    const promise = api.get(url)
        .then(r => {
            const data = r.data.data;
            setCache(cacheKey, data);
            pendingRequests.delete(cacheKey);
            if (onData) onData(data);
            return data;
        })
        .catch(() => {
            pendingRequests.delete(cacheKey);
        });
        
    pendingRequests.set(cacheKey, promise);
}

export default function ValuationForm({
    initialMakeId,
    initialModelId,
    initialYears,
    initialMakes,
    initialLatestYear,
    initialTopModels,
}: ValuationFormProps) {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [step, setStep] = useState(1);
    const [years, setYears] = useState<number[]>(initialYears ?? []);
    const [makes, setMakes] = useState<any[]>([]);
    const [models, setModels] = useState<any[]>([]);
    const [variants, setVariants] = useState<any[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refNum, setRefNum] = useState("");
    const [copied, setCopied] = useState(false);
    const [utmData, setUtmData] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState({ makes: false, models: false, variants: false });

    // Seed module-level cache with server-preloaded makes and top models.
    useEffect(() => {
        if (initialMakes?.length && initialLatestYear) {
            setCache(`makes_${initialLatestYear}`, initialMakes);
        }
        if (initialTopModels && initialLatestYear) {
            Object.entries(initialTopModels).forEach(([makeId, data]) => {
                setCache(`models_${makeId}_${initialLatestYear}`, data);
            });
        }
    }, [initialMakes, initialLatestYear, initialTopModels]);

    const isFirstRender = React.useRef(true);

    // Track if we've already prefetched current options to avoid redundant work on focus
    const prefetchedOnFocus = React.useRef<Record<string, boolean>>({});

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            year: "",
            make_id: initialMakeId || "",
            model_id: initialModelId || "",
            variant_id: "",
            mileage: "",
            specs: "GCC",
            name: "",
            phone: "",
            email: "",
        }
    });

    const { watch, setValue, handleSubmit, formState: { errors } } = form;

    const selectedYear = watch('year');
    const selectedMake = watch('make_id');
    const selectedModel = watch('model_id');

    useEffect(() => {
        if (!initialYears?.length) {
            fetchYears();
        } else {
            // Background prefetch top years makes/models
            initialYears.slice(0, 3).forEach(y => {
                const yearStr = y.toString();
                if (yearStr !== initialLatestYear) {
                    const cacheKey = `makes_${yearStr}`;
                    if (!getCached(cacheKey) && !pendingRequests.has(cacheKey)) {
                        const p = api.get(`/makes?year=${yearStr}`).then(res => {
                            const data = res.data.data;
                            setCache(cacheKey, data);
                            data.slice(0, 5).forEach((m: any) =>
                                bgFetch(`/models?make_id=${m.id}&year=${yearStr}`, `models_${m.id}_${yearStr}`)
                            );
                            return data;
                        });
                        pendingRequests.set(cacheKey, p);
                    }
                }
            });
        }

        // FULL CATALOG SYNC: persists the entire catalog locally for 0ms refreshes.
        // Skip localStorage when the payload exceeds 4MB (production with large data sets
        // would silently fail the write and the form would fall back to API on every reload).
        if (!globalCatalog) {
            api.get('/catalog-sync').then(res => {
                globalCatalog = res.data.data;
                try {
                    const serialized = JSON.stringify(globalCatalog);
                    if (serialized.length < 4 * 1024 * 1024) {
                        localStorage.setItem('gv_catalog_v1', serialized);
                    }
                } catch {
                    // quota exceeded — keep in memory only, form still works via memCache
                }
            }).catch(() => {});
        }

        // Prefetch models for the top 10 makes of the latest year
        if (initialMakes?.length && initialLatestYear) {
            initialMakes.slice(0, 10).forEach(m =>
                bgFetch(`/models?make_id=${m.id}&year=${initialLatestYear}`, `models_${m.id}_${initialLatestYear}`)
            );
        }

        const params = new URLSearchParams(window.location.search);
        const utm: Record<string, string> = {};
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
            const val = params.get(key);
            if (val) utm[key] = val;
        });
        if (Object.keys(utm).length) setUtmData(utm);
        
        isFirstRender.current = false;
    }, []);

    useEffect(() => {
        if (selectedYear) {
            fetchMakes(selectedYear);
            if (!isFirstRender.current) {
                setValue('make_id', '');
                setValue('model_id', '');
                setValue('variant_id', '');
            }
        }
    }, [selectedYear]);

    useEffect(() => {
        if (selectedMake && selectedYear) {
            fetchModels(selectedMake, selectedYear);
            
            // ULTIMATE SPEED: Prefetch variants for ALL models of this make in one shot
            const bundleKey = `variants_bundle_${selectedMake}_${selectedYear}`;
            bgFetch(`/variants-by-make?make_id=${selectedMake}&year=${selectedYear}`, bundleKey, (data) => {
                // Split the bundle and seed the cache for each model individually
                const modelsMap: Record<string, any[]> = {};
                data.forEach((v: any) => {
                    const key = `variants_${v.model_id}_${selectedYear}`;
                    if (!modelsMap[key]) modelsMap[key] = [];
                    modelsMap[key].push(v);
                });
                Object.entries(modelsMap).forEach(([key, variants]) => setCache(key, variants));
            });

            if (!isFirstRender.current) {
                setValue('model_id', '');
                setValue('variant_id', '');
            }
        }
    }, [selectedMake, selectedYear]);

    useEffect(() => {
        if (selectedModel && selectedYear) {
            fetchVariants(selectedModel, selectedYear);
            if (!isFirstRender.current) {
                setValue('variant_id', '');
            }
        }
    }, [selectedModel, selectedYear]);

    const fetchYears = async () => {
        try {
            const res = await api.get('/years');
            setYears(res.data.data);
        } catch (e) {
            console.error("Error fetching years", e);
        }
    };

    const fetchMakes = async (year: string) => {
        const cacheKey = `makes_${year}`;
        
        // 0ms path: Global Catalog
        if (globalCatalog?.c[year]) {
            const makeIds = Object.keys(globalCatalog.c[year]);
            const data = makeIds.map(id => globalCatalog!.mk[id]).filter(Boolean);
            setMakes(data);
            return;
        }

        const cached = getCached(cacheKey);
        if (cached) {
            setMakes(cached);
            cached.slice(0, 10).forEach(m =>
                bgFetch(`/models?make_id=${m.id}&year=${year}`, `models_${m.id}_${year}`)
            );
            return;
        }

        if (pendingRequests.has(cacheKey)) {
            // Perception Buffer: Only show loading if it takes > 200ms
            const timer = setTimeout(() => setLoading(prev => ({ ...prev, makes: true })), 200);
            const data = await pendingRequests.get(cacheKey);
            clearTimeout(timer);
            setMakes(data);
            setLoading(prev => ({ ...prev, makes: false }));
            return;
        }

        const timer = setTimeout(() => setLoading(prev => ({ ...prev, makes: true })), 200);
        try {
            const res = await api.get(`/makes?year=${year}`);
            const data = res.data.data;
            setMakes(data);
            setCache(cacheKey, data);
            data.slice(0, 10).forEach((m: any) =>
                bgFetch(`/models?make_id=${m.id}&year=${year}`, `models_${m.id}_${year}`)
            );
        } catch (e) {
            console.error("Error fetching makes", e);
        } finally {
            clearTimeout(timer);
            setLoading(prev => ({ ...prev, makes: false }));
        }
    };

    const fetchModels = async (makeId: string, year: string) => {
        const cacheKey = `models_${makeId}_${year}`;

        // 0ms path: Global Catalog
        if (globalCatalog?.c[year]?.[makeId]) {
            const modelIds = Object.keys(globalCatalog.c[year][makeId]);
            const data = modelIds.map(id => globalCatalog!.md[id]).filter(Boolean);
            setModels(data);
            return;
        }

        const cached = getCached(cacheKey);
        if (cached) {
            setModels(cached);
            return;
        }

        if (pendingRequests.has(cacheKey)) {
            // Perception Buffer: Only show loading if it takes > 200ms
            const timer = setTimeout(() => setLoading(prev => ({ ...prev, models: true })), 200);
            const data = await pendingRequests.get(cacheKey);
            clearTimeout(timer);
            setModels(data);
            setLoading(prev => ({ ...prev, models: false }));
            return;
        }

        const timer = setTimeout(() => setLoading(prev => ({ ...prev, models: true })), 200);
        try {
            const res = await api.get(`/models?make_id=${makeId}&year=${year}`);
            const data = res.data.data;
            setModels(data);
            setCache(cacheKey, data);
        } catch (e) {
            console.error("Error fetching models", e);
        } finally {
            clearTimeout(timer);
            setLoading(prev => ({ ...prev, models: false }));
        }
    };

    const fetchVariants = async (modelId: string, year: string) => {
        const cacheKey = `variants_${modelId}_${year}`;

        // 0ms path: Global Catalog
        if (globalCatalog?.c[year]) {
            // Need to find which make this model belongs to in the sync structure
            // or just use the flat model mapping if we had it. 
            // In catalogSync we have globalCatalog.md which has make_id.
            const makeId = globalCatalog.md[modelId]?.make_id;
            const rawVariants = globalCatalog.c[year]?.[makeId]?.[modelId];
            if (rawVariants) {
                const data = rawVariants.map((v: any) => ({
                    id: v.i,
                    name: v.n,
                    engine: v.e,
                    transmission: v.t,
                    model_id: modelId
                }));
                setVariants(data);
                return;
            }
        }

        const cached = getCached(cacheKey);
        if (cached) {
            setVariants(cached);
            return;
        }

        if (pendingRequests.has(cacheKey)) {
            const timer = setTimeout(() => setLoading(prev => ({ ...prev, variants: true })), 200);
            const data = await pendingRequests.get(cacheKey);
            clearTimeout(timer);
            setVariants(data);
            setLoading(prev => ({ ...prev, variants: false }));
            return;
        }

        const timer = setTimeout(() => setLoading(prev => ({ ...prev, variants: true })), 200);
        try {
            const res = await api.get(`/variants?model_id=${modelId}&year=${year}`);
            const data = res.data.data;
            setVariants(data);
            setCache(cacheKey, data);
        } catch (e) {
            console.error("Error fetching variants", e);
        } finally {
            clearTimeout(timer);
            setLoading(prev => ({ ...prev, variants: false }));
        }
    };

    const onSubmit = async (data: FormData) => {
        setSubmitting(true);
        setError(null);
        try {
            const res = await api.post('/bookings', {
                ...data,
                ...(Object.keys(utmData).length ? { utm_data: utmData } : {}),
            });
            setSuccess(true);
            setRefNum(res.data.data.reference_number);
        } catch (e: any) {
            console.error("Error submitting booking", e);
            setError(e.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const nextStep = () => {
        if (step === 1 && (!selectedYear || !selectedMake || !selectedModel || !watch('variant_id'))) {
            return;
        }
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(refNum);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (success) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md mx-auto border border-green-50">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Valuation Submitted!</h2>
                <p className="text-gray-600 mb-6">Our experts will call you within 15 minutes.</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 mb-8 relative group">
                    <span className="text-xs uppercase tracking-widest text-gray-600 font-bold block mb-1">Reference Number</span>
                    <div className="flex items-center justify-center gap-3">
                        <span className="text-xl font-mono font-bold text-[#f24026] transition-all">{refNum}</span>
                        <button
                            onClick={copyToClipboard}
                            className={cn(
                                "p-2 rounded-lg transition-all duration-200 flex items-center justify-center",
                                copied
                                    ? "bg-green-100 text-green-600 scale-110"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 active:scale-95"
                            )}
                            title="Copy to clipboard"
                        >
                            {copied ? <ClipboardCheck className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-[#f24026] text-white font-bold py-4 rounded-xl hover:bg-[#d6351f] transition"
                >
                    Valuate Another Car
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden max-w-xl mx-auto">
            {/* Progress Bar */}
            <div className="h-2 w-full bg-gray-100 flex">
                <motion.div
                    className="h-full bg-[#f24026]"
                    initial={isHome ? { width: "33.33%" } : { width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
                    animate={{ width: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%" }}
                    transition={isHome ? { duration: 0.3 } : { duration: 0 }}
                />
            </div>

            <div className="p-8">
                <header className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        {step === 1 ? "Select Your Car" : step === 2 ? "Usage Details" : "Your Contact Info"}
                    </h2>
                    <p className="text-gray-600 font-medium">
                        {step === 1 ? "Start your instant valuation" : step === 2 ? "Tell us about your car's condition" : "Where should we send the valuation?"}
                    </p>
                </header>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={isHome ? { opacity: 0, x: 20 } : {}}
                                animate={isHome ? { opacity: 1, x: 0 } : {}}
                                exit={isHome ? { opacity: 0, x: -20 } : {}}
                                transition={isHome ? { duration: 0.3 } : { duration: 0 }}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-800 font-bold flex items-center gap-1.5">
                                            <Hash className="w-4 h-4 text-[#f24026]" /> Year
                                        </label>
                                        <select
                                            {...form.register('year')}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#f24026]/20 focus:border-[#f24026] transition text-gray-900"
                                        >
                                            <option value="">Select Year</option>
                                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-800 font-bold flex items-center justify-between min-h-[20px]">
                                            <span className="flex items-center gap-1.5"><Search className="w-4 h-4 text-[#f24026]" /> Make</span>
                                            {loading.makes && <Loader2 className="w-3.5 h-3.5 text-[#f24026] animate-spin" />}
                                        </label>
                                        <div className={cn("relative", loading.makes && "animate-pulse")}>
                                            <select
                                                {...form.register('make_id')}
                                                disabled={loading.makes || !selectedYear}
                                                onFocus={() => {
                                                    if (selectedYear && !prefetchedOnFocus.current[`makes_${selectedYear}`]) {
                                                        fetchMakes(selectedYear);
                                                        prefetchedOnFocus.current[`makes_${selectedYear}`] = true;
                                                    }
                                                }}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#f24026]/20 focus:border-[#f24026] transition text-gray-900 disabled:opacity-60"
                                            >
                                                <option value="">Select Make</option>
                                                {makes.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-800 font-bold flex items-center justify-between">
                                        <span className="flex items-center gap-1.5"><Car className="w-4 h-4 text-[#f24026]" /> Model</span>
                                        {loading.models && <Loader2 className="w-3.5 h-3.5 text-[#f24026] animate-spin" />}
                                    </label>
                                    <div className={cn("relative", loading.models && "animate-pulse")}>
                                        <select
                                            {...form.register('model_id')}
                                            disabled={loading.models || !selectedMake}
                                            onFocus={() => {
                                                if (selectedMake && selectedYear && !prefetchedOnFocus.current[`models_${selectedMake}`]) {
                                                    fetchModels(selectedMake, selectedYear);
                                                    prefetchedOnFocus.current[`models_${selectedMake}`] = true;
                                                }
                                            }}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#f24026]/20 focus:border-[#f24026] transition text-gray-900 disabled:opacity-60"
                                        >
                                            <option value="">Select Model</option>
                                            {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-800 font-bold flex items-center justify-between">
                                        <span className="flex items-center gap-1.5"><Hash className="w-4 h-4 text-[#f24026]" /> Variant</span>
                                        {loading.variants && <Loader2 className="w-3.5 h-3.5 text-[#f24026] animate-spin" />}
                                    </label>
                                    <div className={cn("relative", loading.variants && "animate-pulse")}>
                                        <select
                                            {...form.register('variant_id')}
                                            disabled={loading.variants || !selectedModel}
                                            onFocus={() => {
                                                if (selectedModel && selectedYear && !prefetchedOnFocus.current[`variants_${selectedModel}`]) {
                                                    fetchVariants(selectedModel, selectedYear);
                                                    prefetchedOnFocus.current[`variants_${selectedModel}`] = true;
                                                }
                                            }}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#f24026]/20 focus:border-[#f24026] transition text-gray-900 disabled:opacity-60"
                                        >
                                            <option value="">Select Variant</option>
                                            {variants.map(v => <option key={v.id} value={v.id}>{v.name} ({v.engine})</option>)}
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={isHome ? { opacity: 0, x: 20 } : {}}
                                animate={isHome ? { opacity: 1, x: 0 } : {}}
                                exit={isHome ? { opacity: 0, x: -20 } : {}}
                                transition={isHome ? { duration: 0.3 } : { duration: 0 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-800 font-bold flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-[#f24026]" /> Current Odometer (KMS)
                                    </label>
                                    <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                                        {[
                                            "0 - 10,000",
                                            "10,000 - 20,000",
                                            "20,000 - 40,000",
                                            "40,000 - 60,000",
                                            "60,000 - 90,000",
                                            "90,000 - 120,000",
                                            "120,000 - 150,000",
                                            "150,000 - 180,000",
                                            "180,000 - 220,000",
                                            "220,000 - 250,000",
                                            "250,000+",
                                        ].map((range) => (
                                            <button
                                                key={range}
                                                type="button"
                                                onClick={() => setValue('mileage', range)}
                                                className={cn(
                                                    "py-3 px-2 rounded-xl border-2 transition font-bold text-xs text-center",
                                                    watch('mileage') === range
                                                        ? "border-[#f24026] bg-[#f24026]/5 text-[#f24026]"
                                                        : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"
                                                )}
                                            >
                                                {range} kms
                                            </button>
                                        ))}
                                    </div>
                                    {errors.mileage && <p className="text-xs text-red-500">{errors.mileage.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-800 font-bold flex items-center gap-2">
                                        <Car className="w-4 h-4 text-[#f24026]" /> Regional Specs
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['GCC', 'NON-GCC'].map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setValue('specs', s)}
                                                className={cn(
                                                    "py-3 px-4 rounded-xl border-2 transition font-bold text-sm",
                                                    watch('specs') === s
                                                        ? "border-[#f24026] bg-[#f24026]/5 text-[#f24026]"
                                                        : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200"
                                                )}
                                            >
                                                {s === 'GCC' ? 'GCC Spec' : 'NON-GCC'}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.specs && <p className="text-xs text-red-500">{errors.specs.message}</p>}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={isHome ? { opacity: 0, x: 20 } : {}}
                                animate={isHome ? { opacity: 1, x: 0 } : {}}
                                exit={isHome ? { opacity: 0, x: -20 } : {}}
                                transition={isHome ? { duration: 0.3 } : { duration: 0 }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-800 font-bold">
                                        <User className="w-4 h-4 text-[#f24026]" /> Full Name
                                    </label>
                                    <input
                                        {...form.register('name')}
                                        placeholder="Expat Car Buyer"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#f24026]/20 focus:border-[#f24026] transition text-gray-900"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-800 font-bold">
                                        <Phone className="w-4 h-4 text-[#f24026]" /> Phone Number (UAE)
                                    </label>
                                    <input
                                        {...form.register('phone')}
                                        placeholder="05X XXX XXXX"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#f24026]/20 focus:border-[#f24026] transition text-gray-900"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-800 font-bold">
                                        <Mail className="w-4 h-4 text-[#f24026]" /> Email Address
                                    </label>
                                    <input
                                        {...form.register('email')}
                                        placeholder="name@example.com"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#f24026]/20 focus:border-[#f24026] transition text-gray-900"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <footer className="mt-10 flex gap-4">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-4 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition flex items-center gap-2"
                            >
                                <ChevronLeft className="w-5 h-5" /> Back
                            </button>
                        )}

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={step === 1 && !watch('variant_id')}
                                className="flex-1 bg-[#f24026] text-white py-4 rounded-xl font-bold hover:bg-[#d6351f] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
                            >
                                Continue <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-1 bg-[#f24026] text-white py-4 rounded-xl font-bold hover:bg-[#d6351f] disabled:opacity-50 transition flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"
                            >
                                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get Instant Valuation"}
                            </button>
                        )}
                    </footer>
                </form>
            </div>
        </div>
    );
}
