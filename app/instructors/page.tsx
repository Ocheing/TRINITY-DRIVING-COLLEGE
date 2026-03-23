
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Mail, Phone, Award, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Instructor } from '@/types';

export default function InstructorsPage() {
    const supabase = createClient();
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const { data, error } = await supabase
                    .from('instructors')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (data) {
                    setInstructors(data);
                }
            } catch (error) {
                console.error('Error fetching instructors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, []);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-brand py-24 sm:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-brand mix-blend-multiply" />
                    <div className="absolute inset-0 bg-dot-pattern opacity-10" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Meet Our Expert Instructors
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
                        Learn from the best. Our NTSA-certified team is dedicated to making you a safe and confident driver.
                    </p>
                </div>
            </div>

            {/* Instructors Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                {loading ? (
                    <div className="flex justify-center h-64">
                        <Loader2 className="h-10 w-10 animate-spin text-brand" />
                    </div>
                ) : instructors.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {instructors.slice(0, visibleCount).map((instructor, idx) => (
                                    <motion.div
                                        key={instructor.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-10px" }}
                                        transition={{ duration: 0.4, delay: (idx % 6) * 0.08 }}
                                        className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full group"
                                    >
                                        <div className="relative h-64 w-full shrink-0 overflow-hidden">
                                            <img
                                                src={instructor.image_url}
                                                alt={instructor.name}
                                                loading="lazy"
                                                className="absolute inset-0 object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out"
                                            />
                                        </div>
                                        <div className="flex-1 p-6 flex flex-col">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand transition-colors">{instructor.name}</h3>
                                                <p className="text-brand font-medium text-sm mt-1">{instructor.role}</p>
                                            </div>
                                            <p className="mt-4 text-gray-600 leading-relaxed text-sm line-clamp-3">
                                                {instructor.bio}
                                            </p>

                                            {instructor.certifications && instructor.certifications.length > 0 && (
                                                <div className="mt-5">
                                                    <div className="flex flex-wrap gap-2">
                                                        {instructor.certifications.map((cert) => (
                                                            <span key={cert} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600 uppercase tracking-wider">
                                                                {cert}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-auto pt-6 flex flex-wrap items-center gap-4">
                                                <button className="text-xs font-semibold text-gray-500 hover:text-brand flex items-center gap-1.5 transition-colors cursor-pointer">
                                                    <Mail className="h-3.5 w-3.5" /> Message
                                                </button>
                                                <button className="text-xs font-semibold text-gray-500 hover:text-brand flex items-center gap-1.5 transition-colors cursor-pointer">
                                                    <Phone className="h-3.5 w-3.5" /> Book
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* ── Load More Button ── */}
                        {visibleCount < instructors.length && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-14 flex flex-col items-center gap-4"
                            >
                                <p className="text-sm text-gray-500 font-medium">
                                    Showing <span className="text-gray-900">{visibleCount}</span> of{' '}
                                    <span className="text-gray-900">{instructors.length}</span> instructors
                                </p>
                                <button
                                    onClick={() => {
                                        setLoadingMore(true);
                                        setTimeout(() => {
                                            setVisibleCount(prev => prev + 6);
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
                                            <Award className="h-4 w-4" />
                                            Load More Instructors
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        )}

                        {!loadingMore && visibleCount >= instructors.length && instructors.length > 6 && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-12 text-center text-sm font-medium text-gray-400"
                            >
                                ✓ All instructors loaded
                            </motion.p>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No instructors found.</p>
                    </div>
                )}
            </div>

            {/* CTA */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Ready to choose your instructor?</h2>
                    <p className="mt-4 text-lg text-gray-500">Enroll today and ask for your preferred instructor during orientation.</p>
                    <div className="mt-8">
                        <a href="/enroll" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent-dark md:py-4 md:text-lg md:px-10 shadow-md transition-all">
                            Enroll Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
