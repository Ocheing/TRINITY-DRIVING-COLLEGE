
'use client';

import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    is_published: boolean;
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const { data } = await supabase
                    .from('testimonials')
                    .select('*')
                    .eq('is_published', true)
                    .order('created_at', { ascending: false })
                    .limit(3);

                if (data) {
                    setTestimonials(data);
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();

        // Realtime Subscription
        const channel = supabase
            .channel('public:testimonials')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'testimonials'
                },
                () => {
                    // Fetch updated data on any change
                    fetchTestimonials();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // If loading or no testimonials, do not render anything (Clean UI)
    if (loading || testimonials.length === 0) {
        return null;
    }

    return (
        <div className="relative py-16 lg:py-24 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-brand-dark/90 mix-blend-multiply z-10" />
                <img
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
                    alt="Testimonials Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
                <div className="text-center mb-16">
                    <h2 className="text-base font-semibold text-brand-light tracking-wide uppercase">Testimonials</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        What Our Students Say
                    </p>
                </div>
                <div className="grid gap-8 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10 relative hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="flex items-center mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={`star-${testimonial.id}-${i}`} className="h-5 w-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-100 mb-6 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-white text-brand flex items-center justify-center font-bold text-sm">
                                    {testimonial.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-bold text-white">{testimonial.name}</p>
                                    <p className="text-xs text-brand-light font-medium uppercase tracking-wider">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
