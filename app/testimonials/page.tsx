
'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Star, Loader2, Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Testimonial } from '@/types';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const fetchTestimonials = useCallback(async () => {
        try {
            const { data } = await supabase
                .from('testimonials')
                .select('*')
                .eq('is_published', true)
                .order('created_at', { ascending: false });

            if (data) {
                setTestimonials(data);
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTestimonials();

        // Realtime subscription for admin adding testimonials in real time
        const channel = supabase
            .channel('public:testimonials:page')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'testimonials'
                },
                () => {
                    fetchTestimonials();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchTestimonials]);

    // Auto-slide carousel
    useEffect(() => {
        if (testimonials.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length, isPaused]);

    const goTo = (index: number) => {
        setCurrentIndex(index);
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Compute which testimonials to show (current + next for desktop)
    const getVisibleTestimonials = () => {
        if (testimonials.length === 0) return [];
        if (testimonials.length === 1) return [{ testimonial: testimonials[0], index: 0 }];
        const nextIndex = (currentIndex + 1) % testimonials.length;
        return [
            { testimonial: testimonials[currentIndex], index: currentIndex },
            { testimonial: testimonials[nextIndex], index: nextIndex },
        ];
    };

    const visibleTestimonials = getVisibleTestimonials();

    return (
        <div className="bg-white min-h-screen">
            {/* ══════════ HERO SECTION ══════════ */}
            <section className="relative h-[45vh] lg:h-[40vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/assets/hero.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c1929]/90 via-[#0f2035]/85 to-[#0a1520]/90" />

                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-white mt-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-6"
                    >
                        <MessageSquare className="w-4 h-4 text-brand" />
                        <span className="text-xs font-bold text-brand tracking-widest uppercase">Testimonials</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-extrabold mb-3"
                    >
                        Student Success <span className="text-brand">Stories</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-sm md:text-base text-gray-300 max-w-lg mx-auto"
                    >
                        Hear from the thousands of drivers who passed with Trinity Driving College.
                    </motion.p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a1520] to-transparent" />
            </section>

            {/* ══════════ CAROUSEL SECTION ══════════ */}
            <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-10 w-10 animate-spin text-brand" />
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="text-center py-24">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-xl font-bold text-gray-900 mb-2">No testimonials yet</p>
                            <p className="text-gray-500 text-sm">Check back soon — our students are sharing their stories!</p>
                        </div>
                    ) : (
                        <div
                            className="relative"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {/* Navigation arrows */}
                            {testimonials.length > 1 && (
                                <>
                                    <button
                                        onClick={goPrev}
                                        className="absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all"
                                        aria-label="Previous testimonial"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                                    </button>
                                    <button
                                        onClick={goNext}
                                        className="absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all"
                                        aria-label="Next testimonial"
                                    >
                                        <ChevronRight className="w-5 h-5 text-gray-700" />
                                    </button>
                                </>
                            )}

                            {/* Cards container */}
                            <div className="overflow-hidden px-2">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: 60 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -60 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                                    >
                                        {visibleTestimonials.map(({ testimonial, index: tIdx }) => (
                                            <TestimonialCard key={`${testimonial.id}-${tIdx}`} testimonial={testimonial} />
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Dot indicators */}
                            {testimonials.length > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-10">
                                    {testimonials.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => goTo(idx)}
                                            className={`transition-all duration-300 rounded-full ${idx === currentIndex
                                                ? 'w-8 h-2.5 bg-brand'
                                                : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                                                }`}
                                            aria-label={`Go to testimonial ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* ══════════ FULL GRID SECTION ══════════ */}
            {!loading && testimonials.length > 0 && (
                <section className="pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50/60">
                    <div className="max-w-6xl mx-auto pt-16">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                                All <span className="text-brand">Reviews</span>
                            </h2>
                            <p className="text-gray-500 text-sm mt-2">
                                Every voice matters. Here&apos;s what all our students have to say.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((testimonial, idx) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                >
                                    <TestimonialCard testimonial={testimonial} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

/* ══════════ TESTIMONIAL CARD COMPONENT ══════════ */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-7 relative group">
            {/* Quote decoration */}
            <Quote className="absolute top-6 right-6 h-8 w-8 text-brand/10 group-hover:text-brand/20 transition-colors" />

            {/* Star rating */}
            <div className="flex items-center gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-200 fill-gray-200'
                            }`}
                    />
                ))}
                <span className="text-xs text-gray-400 ml-2 font-medium">{testimonial.rating}.0</span>
            </div>

            {/* Testimonial content */}
            <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed mb-6 italic">
                &ldquo;{testimonial.content}&rdquo;
            </p>

            {/* Student info */}
            <div className="flex items-center border-t border-gray-100 pt-5">
                {/* Avatar with initials */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {testimonial.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                    <h4 className="text-sm font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs text-brand font-semibold uppercase tracking-wider">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );
}
