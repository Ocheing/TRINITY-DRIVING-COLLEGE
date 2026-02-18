'use client';

import Link from 'next/link';
import { Car, Truck, Bike, Users, ArrowRight, Shield, Clock, Award, ChevronRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ───────────── data ───────────── */
const serviceCategories = [
    {
        id: 'category-a',
        title: 'Category A – Motorcycle',
        description: 'Comprehensive training for all types of motorcycles and three-wheelers.',
        icon: Bike,
        gradient: 'from-sky-400 to-blue-600',
        items: [
            { code: 'A2', name: 'Motorcycle', description: 'Standard motorcycle riding lessons' },
            { code: 'A3', name: 'Three Wheelers (TukTuk)', description: 'Professional TukTuk operation' },
        ],
    },
    {
        id: 'category-b',
        title: 'Category B – Saloon Cars',
        description: 'Master the art of driving light vehicles with our expert instructors.',
        icon: Car,
        gradient: 'from-emerald-400 to-teal-600',
        items: [
            { code: 'B1', name: 'Light Vehicle (Automatic)', description: 'Automatic transmission training' },
            { code: 'B2', name: 'Light Vehicle (Manual)', description: 'Manual transmission training' },
        ],
    },
    {
        id: 'category-c',
        title: 'Category C – Trucks',
        description: 'Professional truck driving courses for commercial careers.',
        icon: Truck,
        gradient: 'from-amber-400 to-orange-600',
        items: [
            { code: 'C1', name: 'Light Trucks', description: 'Training for light commercial trucks' },
            { code: 'C2', name: 'Medium Trucks', description: 'Training for medium-sized trucks' },
        ],
    },
    {
        id: 'category-d',
        title: 'Category D – PSV',
        description: 'Public Service Vehicle training for professional drivers.',
        icon: Users,
        gradient: 'from-violet-400 to-purple-600',
        items: [
            { code: 'B3', name: 'Professional 7-Seater', description: 'For professional taxi/shuttle services' },
            { code: 'D1', name: '14-Seater', description: 'Matatu and van operation' },
            { code: 'D2', name: '33-Seater', description: 'Mini-bus operation' },
        ],
    },
];

const highlights = [
    { icon: Shield, label: 'NTSA Certified', description: 'Fully accredited by the National Transport and Safety Authority' },
    { icon: Clock, label: 'Flexible Hours', description: 'Morning, afternoon, and weekend sessions available' },
    { icon: Award, label: 'Expert Instructors', description: 'Highly trained and experienced driving instructors' },
];

/* ───────────── animation variants ───────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

/* ───────────── reusable scroll wrapper ───────────── */
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ───────────── page component ───────────── */
export default function ServicesPage() {
    return (
        <main className="bg-gray-50 min-h-screen">
            {/* ══════════ HERO ══════════ */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/assets/hero.jpg')" }}
                />
                {/* Dark overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90" />
                {/* Decorative dot pattern */}
                <div className="absolute inset-0 bg-dot-pattern opacity-20" />

                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="inline-block mb-4 px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-white/10 text-sky-300 border border-sky-400/30 backdrop-blur-sm"
                    >
                        Professional Driving Training
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Services</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        From motorcycles to heavy commercial vehicles, we offer a comprehensive
                        range of driving courses tailored to launch your career on the road.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/enroll"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Get Started <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/20 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            View Pricing
                        </Link>
                    </motion.div>
                </div>

                {/* Bottom curve */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 100" className="w-full fill-gray-50" preserveAspectRatio="none">
                        <path d="M0,60 C360,100 1080,0 1440,60 L1440,100 L0,100 Z" />
                    </svg>
                </div>
            </section>

            {/* ══════════ HIGHLIGHTS BAR ══════════ */}
            <section className="relative z-10 -mt-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {highlights.map((h, i) => (
                            <motion.div
                                key={h.label}
                                custom={i}
                                variants={fadeUp}
                                className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg shadow-gray-200/60 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30">
                                    <h.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{h.label}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{h.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedSection>
            </section>

            {/* ══════════ SERVICE CARDS ══════════ */}
            <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section heading */}
                    <AnimatedSection className="text-center mb-16">
                        <motion.h2
                            variants={fadeUp}
                            custom={0}
                            className="text-3xl sm:text-4xl font-extrabold text-gray-900"
                        >
                            Explore Our Training Categories
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            custom={1}
                            className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto"
                        >
                            Each category is designed to give you the skills and confidence you need
                            to excel on the road, backed by NTSA-certified training.
                        </motion.p>
                    </AnimatedSection>

                    {/* Cards grid */}
                    <div className="grid gap-8 md:grid-cols-2">
                        {serviceCategories.map((category, ci) => (
                            <ServiceCard key={category.id} category={category} index={ci} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ CTA SECTION ══════════ */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="max-w-4xl mx-auto">
                    <motion.div
                        variants={fadeUp}
                        custom={0}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 p-10 sm:p-16 text-center shadow-2xl shadow-sky-600/20"
                    >
                        {/* Decorative circles */}
                        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                        <h2 className="relative text-3xl sm:text-4xl font-extrabold text-white mb-4">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="relative text-blue-100 text-lg max-w-xl mx-auto mb-8">
                            Join thousands of successful graduates. Enroll today and take the first step
                            towards becoming a licensed, confident driver.
                        </p>
                        <Link
                            href="/enroll"
                            className="relative inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-sky-700 font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            Enroll Now <ArrowRight className="h-5 w-5" />
                        </Link>
                    </motion.div>
                </AnimatedSection>
            </section>
        </main>
    );
}

/* ───────────── SERVICE CARD COMPONENT ───────────── */
interface ServiceItem {
    code: string;
    name: string;
    description: string;
}

interface ServiceCategory {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    items: ServiceItem[];
}

function ServiceCard({ category, index }: { category: ServiceCategory; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg shadow-gray-200/40 hover:shadow-2xl hover:shadow-gray-300/50 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500"
        >
            {/* Top gradient accent bar */}
            <div className={`h-1.5 bg-gradient-to-r ${category.gradient}`} />

            <div className="p-8">
                {/* Header */}
                <div className="flex items-center mb-6">
                    <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="h-7 w-7" />
                    </div>
                    <h2 className="ml-4 text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300">
                        {category.title}
                    </h2>
                </div>

                <p className="text-gray-500 mb-6 leading-relaxed">{category.description}</p>

                {/* Items */}
                <div className="space-y-3">
                    {category.items.map((item) => (
                        <div
                            key={item.code}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/80 border border-gray-100 hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 hover:border-sky-200/60 transition-all duration-300"
                        >
                            <span className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg bg-gradient-to-r ${category.gradient} text-white`}>
                                {item.code}
                            </span>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                                <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 border-t border-gray-100/80 bg-gray-50/50 backdrop-blur-sm">
                <Link
                    href="/enroll"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 group/link transition-colors"
                >
                    Enroll in this category
                    <ChevronRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
}
