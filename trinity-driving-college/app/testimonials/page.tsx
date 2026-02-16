
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Star, Loader2, Quote } from 'lucide-react';
import type { Testimonial } from '@/types';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const { data, error } = await supabase
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
        };

        fetchTestimonials();
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
                        Student Success Stories
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
                        Don't just take our word for it. Hear from the thousands of drivers who passed with Trinity Driving College.
                    </p>
                </div>
            </div>

            {/* Testimonials Grid */}
            <div className="relative py-16 lg:py-24 bg-gray-50 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand/10 blur-3xl"></div>
                    <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    {loading ? (
                        <div className="flex justify-center h-64">
                            <Loader2 className="h-10 w-10 animate-spin text-brand" />
                        </div>
                    ) : testimonials.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative"
                                >
                                    <Quote className="absolute top-6 right-6 h-8 w-8 text-brand/10" />

                                    <div className="flex items-center mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={`star-${testimonial.id}-${i}`}
                                                className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 mb-6 italic text-lg leading-relaxed">
                                        "{testimonial.content}"
                                    </p>

                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-lg">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-gray-900 font-bold">{testimonial.name}</h4>
                                            <p className="text-brand text-sm font-medium uppercase tracking-wide">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <p className="text-xl text-gray-500">No testimonials published yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
