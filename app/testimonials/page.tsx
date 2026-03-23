
'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Star, Loader2, Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Testimonial } from '@/types';

export default function TestimonialsPage() {
    const supabase = createClient();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(4);
    const [loadingMore, setLoadingMore] = useState(false);

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
                        Hear from the thousands of drivers who passed with Trinity Driving School.
                    </motion.p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a1520] to-transparent" />
            </section>

            {/* ══════════ TESTIMONIALS GRID SECTION ══════════ */}
            <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/60 transition-all">
                <div className="max-w-7xl mx-auto">
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
                        <>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
                                <AnimatePresence>
                                    {testimonials.slice(0, visibleCount).map((testimonial, idx) => (
                                        <motion.div
                                            key={testimonial.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-10px" }}
                                            transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
                                        >
                                            <TestimonialCard testimonial={testimonial} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* ── Load More Button ── */}
                            {visibleCount < testimonials.length && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-14 flex flex-col items-center gap-4"
                                >
                                    <p className="text-sm text-gray-500 font-medium">
                                        Showing <span className="text-gray-900">{visibleCount}</span> of{' '}
                                        <span className="text-gray-900">{testimonials.length}</span> testimonials
                                    </p>
                                    <button
                                        onClick={() => {
                                            setLoadingMore(true);
                                            setTimeout(() => {
                                                setVisibleCount(prev => prev + 4);
                                                setLoadingMore(false);
                                            }, 400);
                                        }}
                                        disabled={loadingMore}
                                        className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand to-blue-700 text-white font-semibold text-sm shadow-lg hover:shadow-brand/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loadingMore ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Loading...
                                            </>
                                        ) : (
                                            <>
                                                <MessageSquare className="h-4 w-4" />
                                                Load More Reviews
                                            </>
                                        )}
                                    </button>
                                </motion.div>
                            )}

                            {!loadingMore && visibleCount >= testimonials.length && testimonials.length > 4 && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-12 text-center text-sm font-medium text-gray-400"
                                >
                                    ✓ All testimonials loaded
                                </motion.p>
                            )}
                        </>
                    )}
                </div>
            </section>
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
            <div className="flex items-center border-t border-gray-100 pt-5 mt-auto">
                {/* Avatar with initials or Image */}
                {testimonial.image_url ? (
                    <img src={testimonial.image_url} alt={testimonial.name} className="w-11 h-11 rounded-full object-cover border border-gray-200 shadow-sm" />
                ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                        {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="ml-3">
                    <h4 className="text-sm font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs text-brand font-semibold uppercase tracking-wider">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );
}
