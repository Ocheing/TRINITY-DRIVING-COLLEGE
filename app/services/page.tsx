'use client';

import Link from 'next/link';
import { Car, Truck, Bike, Bus, ChevronRight, Settings, Check, ArrowRight, FileText, Laptop, PlusSquare, Handshake, RefreshCw, Shield, PhoneCall, Tag } from 'lucide-react';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

/* ───────────── data ───────────── */
const serviceCategories = [
    {
        id: 'category-a',
        categoryTag: 'CATEGORY A',
        title: 'Motorcycle',
        subtitle: 'TWO & THREE WHEELERS',
        description: "Comprehensive training for all types of motorcycles and three-wheelers. Whether you're looking to ride a standard motorcycle or operate a TukTuk professionally, our certified instructors will guide you through every aspect of safe riding.",
        icon: Bike,
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800',
        bullets: [
            'A2 — Standard Motorcycle',
            'A3 — Three Wheelers (TukTuk)',
            'Road safety & traffic rules',
            'Practical riding skills',
            'Professional certification',
            'License test preparation'
        ],
        badge: { text: 'CATEGORY A', cls: 'bg-[#1A2234]/80 backdrop-blur-md text-brand-light shadow-sm' },
        layout: 'image-left'
    },
    {
        id: 'category-b',
        categoryTag: 'CATEGORY B',
        title: 'Saloon Cars',
        subtitle: 'LIGHT VEHICLES — CATEGORY B',
        description: 'Master the art of driving light vehicles with our expert instructors. Whether you prefer automatic or manual transmission, our tailored programs ensure you gain the confidence and skill to navigate any road situation safely.',
        icon: Car,
        image: '/assets/salooncar.jpg',
        bullets: [
            'B1 — Automatic Transmission',
            'B2 — Manual Transmission',
            'Defensive driving techniques',
            'Highway & city driving',
            'Parking & maneuver mastery',
            'Mock test & certification'
        ],
        badge: { text: 'MOST POPULAR', cls: 'bg-brand text-white shadow-md' },
        layout: 'image-right'
    },
    {
        id: 'category-c',
        categoryTag: 'CATEGORY C',
        title: 'Trucks',
        subtitle: 'COMMERCIAL VEHICLES — CATEGORY C',
        description: 'Professional truck driving courses designed for commercial driving careers. Our comprehensive program covers everything from light commercial vehicles to medium-sized trucks, preparing you for a rewarding career on the road.',
        icon: Truck,
        image: '/assets/lighttruck.jfif',
        bullets: [
            'C1 — Light Trucks',
            'C2 — Medium Trucks',
            'Cargo handling basics',
            'Safety regulations',
            'Commercial license prep',
            'Vehicle maintenance training'
        ],
        badge: { text: 'PROFESSIONAL', cls: 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md' },
        layout: 'image-left'
    },
    {
        id: 'category-d',
        categoryTag: 'CATEGORY D',
        title: 'PSV',
        subtitle: 'PUBLIC SERVICE VEHICLES — CATEGORY D',
        description: 'Public Service Vehicle training for professional drivers. From 7-seater taxis to 33-seater mini-buses, our PSV program equips you with the skills, knowledge, and professionalism required for passenger transport services.',
        icon: Bus,
        image: '/assets/psv.jfif',
        bullets: [
            'B3 — Professional 7-Seater',
            'D1 — 14-Seater (Matatu)',
            'D2 — 33-Seater (Mini-bus)',
            'Passenger safety protocols',
            'Route management skills',
            'PSV license preparation'
        ],
        badge: { text: 'CATEGORY D', cls: 'bg-[#1A2234]/80 backdrop-blur-md text-brand shadow-sm' },
        layout: 'image-right'
    },
];

const additionalServices = [
    { id: 1, title: 'License Processing', desc: 'We handle all your licensing paperwork and guide you through the entire NTSA process.', icon: FileText },
    { id: 2, title: 'Online Theory Classes', desc: 'Study at your own pace with our comprehensive online theory modules and quizzes.', icon: Laptop },
    { id: 3, title: 'First Aid Training', desc: 'Essential first aid knowledge for road emergencies and accident response.', icon: PlusSquare },
    { id: 4, title: 'Corporate Training', desc: 'Fleet safety programs for businesses to reduce accidents and insurance costs.', icon: Handshake },
    { id: 5, title: 'Refresher Courses', desc: "Haven't driven in a while? Rebuild your confidence with our tailored refresher programs.", icon: RefreshCw },
    { id: 6, title: 'Defensive Driving', desc: 'Advanced safety techniques to protect you and your passengers on the road.', icon: Shield },
];

/* ───────────── animation variants ───────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function ServicesPage() {
    return (
        <main className="bg-white min-h-screen text-gray-900 font-sans selection:bg-brand/30">
            {/* ══════════ HERO ══════════ */}
            <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#050505]">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
                    style={{ backgroundImage: "url('/assets/hero.jpg')" }}
                />

                {/* Dark overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/20 to-[#050505]" />

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
                    >
                        <Link href="/" className="text-brand hover:text-brand-light text-sm font-medium transition-colors">Home</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-gray-300 text-sm font-medium">Services</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6"
                    >
                        Our <span className="text-brand">Services</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        Comprehensive driving education tailored to every skill level and
                        driving need.
                    </motion.p>
                </div>

                {/* Smile Curve Shape */}
                <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-[2px]">
                    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[120px] text-white">
                        <path d="M0,0 Q720,150 1440,0 L1440,100 L0,100 Z" fill="currentColor" />
                    </svg>
                </div>
            </section>

            {/* ══════════ WHAT WE OFFER INTRO ══════════ */}
            <section className="relative z-10 px-4 sm:px-6 lg:px-8 mt-4 mb-16">
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-brand/20 bg-brand/5 text-brand mb-6 shadow-[0_0_15px_-5px_transparent]"
                    >
                        <Settings className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold tracking-widest uppercase">What We Offer</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
                    >
                        Comprehensive <span className="text-brand">Training Programs</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 max-w-2xl text-base md:text-lg"
                    >
                        From motorcycles to PSV vehicles — professional training for every license category in Kenya.
                    </motion.p>
                </div>
            </section>

            {/* ══════════ CARDS SECTION ══════════ */}
            <section className="px-4 sm:px-6 lg:px-8 pb-32">
                <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
                    {serviceCategories.map((category, idx) => (
                        <ServiceCard key={category.id} category={category} index={idx} />
                    ))}
                </div>
            </section>

            {/* ══════════ ADDITIONAL SERVICES ══════════ */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-32 border-t border-gray-800 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: "url('/assets/salooncar.jpg')" }}
                />

                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="text-center mb-16 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-brand/50 bg-black/40 backdrop-blur-md shadow-sm text-white mb-6"
                        >
                            <PlusSquare className="w-3.5 h-3.5 text-brand" />
                            <span className="text-xs font-bold tracking-widest uppercase text-brand-light">Additional Services</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold text-white tracking-tight drop-shadow-xl"
                        >
                            More Ways We <span className="text-brand drop-shadow-xl">Help You</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {additionalServices.map((srv, i) => (
                            <motion.div
                                key={srv.id}
                                initial="hidden"
                                whileInView="visible"
                                custom={i}
                                variants={fadeUp}
                                viewport={{ once: true, margin: '-50px' }}
                                className="group bg-[#111621] border border-[#1C2538] p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(14,165,233,0.15)] hover:border-brand/40 transition-all duration-300 flex flex-col items-center text-center backdrop-blur-sm"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#1A2234] border border-[#232F46] flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand/10 group-hover:border-brand/20 transition-colors">
                                    <srv.icon className="w-8 h-8 text-brand" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{srv.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{srv.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ CTA CONSULTATION ══════════ */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-32 border-t border-gray-800">
                {/* Last Section Image Background Setup */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: "url('/assets/salooncar.jpg')" }}
                />

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
                            Not Sure Which Service <span className="text-brand drop-shadow-xl">Fits You?</span>
                        </h2>
                        <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-bold drop-shadow-md">
                            Our team will help you choose the perfect program. Book a free consultation today!
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                            <Link
                                href="/contact"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand text-white font-bold shadow-[0_8px_20px_-8px_var(--color-brand)] hover:shadow-[0_12px_25px_-8px_var(--color-brand)] hover:bg-brand-light transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <PhoneCall className="w-5 h-5" />
                                Free Consultation
                            </Link>
                            <Link
                                href="/pricing"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#131B26]/90 backdrop-blur-md text-white border border-[#232F46] hover:border-brand/40 font-bold hover:bg-[#1A2234] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <Tag className="w-5 h-5 text-brand" />
                                View Pricing
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

/* ───────────── SERVICE CARD COMPONENT ───────────── */
function ServiceCard({ category, index }: { category: any; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const isImageRight = category.layout === 'image-right';

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={index}
            variants={fadeUp}
            className={`group flex flex-col ${isImageRight ? 'md:flex-row-reverse' : 'md:flex-row'} 
            bg-[#111621] border border-[#1C2538] rounded-[2rem] overflow-hidden 
            shadow-[0_8px_30px_rgb(0,0,0,0.1)] 
            hover:shadow-[0_8px_40px_rgba(14,165,233,0.15)] 
            hover:border-brand/30 transition-all duration-500`}
        >
            {/* Image side */}
            <div className="relative w-full md:w-[45%] h-[300px] md:h-auto shrink-0 overflow-hidden">
                <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-[#0B0E14]/20" />

                {/* Badge top */}
                <div className={`absolute top-6 ${isImageRight ? 'right-6' : 'left-6'} md:left-6 md:right-auto z-10`}>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${category.badge.cls}`}>
                        {category.badge.text}
                    </span>
                </div>
            </div>

            {/* Content side */}
            <div className="w-full md:w-[55%] p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#1A2234] border border-[#232F46] group-hover:border-brand/30 flex items-center justify-center shrink-0 transition-colors">
                        <category.icon className="w-7 h-7 text-brand" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{category.title}</h2>
                        <p className="text-brand uppercase text-xs font-bold tracking-widest mt-1.5">
                            {category.subtitle}
                        </p>
                    </div>
                </div>

                <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed mb-8">
                    {category.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
                    {category.bullets.map((bullet: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-brand shrink-0 mt-[3px]" />
                            <span className="text-gray-300 text-sm font-medium">{bullet}</span>
                        </div>
                    ))}
                </div>

                <div>
                    <Link
                        href="/enroll"
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-brand text-white font-bold text-sm hover:shadow-[0_10px_20px_-10px_var(--color-brand)] hover:bg-brand-light transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        <ArrowRight className="w-4 h-4" />
                        Enroll Now
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
