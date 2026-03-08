'use client';

import { useState } from 'react';
import { Check, ShieldCheck, Tag, Bike, Car, Truck, Bus, Scale, ArrowRight, Minus, HelpCircle, ChevronDown, GraduationCap, Phone } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
    {
        id: 'category-a',
        badge: 'CATEGORY A',
        badgeCls: 'bg-[#1A2234] text-brand border border-[#232F46]',
        title: 'Motorcycles',
        subtitle: 'A2 – Motorcycle | A3 – TukTuk',
        price: '7,500',
        period: '/ 20 lessons',
        subPrice: null,
        icon: Bike,
        features: [
            'A2 or A3 Course',
            '20 Practical Lessons',
            'PDL Included',
            'Assessment Included',
            'NTSA Exam Included',
            'Safety Gear Provided',
            'Flexible Scheduling'
        ]
    },
    {
        id: 'category-b',
        badge: 'MOST POPULAR',
        badgeCls: 'bg-brand text-white border border-brand/20',
        highlight: true,
        title: 'Saloon Cars',
        subtitle: 'B1 – Automatic | B2 – Manual',
        price: '12,500',
        period: '/ 30 lessons',
        subPrice: 'Combined (B1 + B2): KSH 14,000',
        icon: Car,
        features: [
            'Single Class (B1 or B2) — 30 Lessons',
            'Combined (B1 + B2) Available',
            'PDL Included',
            'Assessment Included',
            'NTSA Exam Included',
            'Defensive Driving',
            'First Aid Basics'
        ]
    },
    {
        id: 'category-c',
        badge: 'PROFESSIONAL',
        badgeCls: 'bg-gradient-to-r from-orange-500 to-rose-500 text-white',
        title: 'Trucks',
        subtitle: 'C1 – Light | C2 – Medium',
        price: '13,000',
        period: '/ course',
        subPrice: 'Combined (B2 + C1): KSH 16,000 / 30 lessons',
        icon: Truck,
        features: [
            'C1 Light Trucks — KSH 13,000',
            'C2 Medium Trucks — KSH 13,000',
            'PDL Included',
            'Assessment Included',
            'NTSA Exam Included',
            'Commercial Evaluation',
            'Load Safety Training'
        ]
    },
    {
        id: 'category-d',
        badge: 'CATEGORY D',
        badgeCls: 'bg-[#1A2234] text-brand border border-[#232F46]',
        title: 'PSV',
        subtitle: 'B3 | D1 | D2 — Any Single Class',
        price: '8,500',
        period: '/ 20 lessons',
        subPrice: null,
        icon: Bus,
        features: [
            'B3 Pro 7-Seater / D1 14-Seater',
            '20 Practical Lessons',
            'PDL Included',
            'Assessment Included',
            'NTSA Exam Included',
            'Passenger Relations',
            'PSV Regulations'
        ]
    }
];

const comparisonFeatures = [
    { name: 'Lessons', a: '20', b: '30', c: 'Variable', d: '20' },
    { name: 'PDL Included', a: true, b: true, c: true, d: true },
    { name: 'Assessment', a: true, b: true, c: true, d: true },
    { name: 'NTSA Exam', a: true, b: true, c: true, d: true },
    { name: 'Defensive Driving', a: false, b: true, c: false, d: false },
    { name: 'First Aid Basics', a: false, b: true, c: false, d: false },
    { name: 'Safety Gear', a: true, b: false, c: false, d: false },
    { name: 'Load Safety Training', a: false, b: false, c: true, d: false },
    { name: 'PSV Regulations', a: false, b: false, c: false, d: true },
    { name: 'Starting Price', a: 'KSH 7,500', b: 'KSH 12,500', c: 'KSH 13,000', d: 'KSH 8,500' }
];

export default function PricingPage() {
    return (
        <div className="bg-white min-h-screen selection:bg-brand/30">
            {/* ══════════ HERO SECTION (MAINTAINED) ══════════ */}
            <section className="relative h-[45vh] lg:h-[40vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/assets/hero.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay */}

                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-white mt-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-extrabold mb-3"
                    >
                        Transparent Pricing
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-lg md:text-xl font-light mb-1.5 text-gray-200">
                            Affordable Driving Courses
                        </p>
                        <p className="text-sm md:text-base text-gray-300 mb-4">
                            Choose the category that fits your needs.
                        </p>
                    </motion.div>
                </div>

                {/* Soft dark blend at the base of the hero shadow */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/90 to-transparent" />
            </section>

            {/* ══════════ CHOOSE YOUR PLAN INFO ══════════ */}
            <section className="relative z-20 px-4 sm:px-6 lg:px-8 pt-8 pb-10">
                <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full border border-brand/20 bg-[#1A2234] text-brand-light mb-4 shadow-sm"
                    >
                        <Tag className="w-3 h-3 text-brand" />
                        <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">PLANS</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight"
                    >
                        Choose Your <span className="text-brand">Plan</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 max-w-2xl text-sm md:text-base"
                    >
                        All plans include PDL, Assessment, and NTSA Exam. Fee payable in installments.
                    </motion.p>
                </div>
            </section>

            {/* ══════════ PRICING CARDS ══════════ */}
            <section className="px-4 sm:px-6 lg:px-8 pb-12 relative z-20">
                <div className="max-w-[1240px] mx-auto">
                    <div className="flex flex-col lg:flex-row gap-4 justify-center">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col flex-1 min-w-[260px] bg-white rounded-2xl overflow-hidden transition-all duration-300
                                ${plan.highlight ? 'border border-brand shadow-[0_10px_40px_rgba(14,165,233,0.15)] transform -translate-y-1' : 'border border-gray-200 shadow-sm hover:shadow-md hover:border-brand/30'}`}
                            >
                                {/* Header Info */}
                                <div className="p-6 text-center flex flex-col items-center relative bg-gray-50/50">
                                    {plan.highlight && (
                                        <div className="absolute top-0 left-0 w-full h-1 bg-brand" />
                                    )}

                                    <div className={`px-3 py-1 rounded-full text-[9px] font-extrabold tracking-wider mb-4 ${plan.badgeCls.replace('bg-[#1A2234]', 'bg-brand/10').replace('text-brand', 'text-brand').replace('border-[#232F46]', 'border-brand/20')}`}>
                                        {plan.badge}
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm">
                                        <plan.icon className="w-6 h-6 text-brand" />
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{plan.title}</h3>
                                    <p className="text-gray-500 text-[11px] md:text-xs font-medium">{plan.subtitle}</p>

                                    {/* Price area */}
                                    <div className="mt-5 mb-3">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="text-brand text-sm font-bold">KSH</span>
                                                <span className="text-4xl font-black text-gray-900 tracking-tight">{plan.price}</span>
                                                <span className="text-gray-400 text-xs">/</span>
                                            </div>
                                            <span className="text-gray-500 text-[11px] md:text-xs mt-0.5">{plan.period}</span>
                                        </div>
                                        {/* Optional subprice info */}
                                        <div className="h-6 mt-2 flex items-center justify-center">
                                            {plan.subPrice && (
                                                <span className="text-brand text-[10px] md:text-[11px] font-bold leading-tight px-2">{plan.subPrice}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent w-full" />

                                {/* Features List & CTA */}
                                <div className="p-6 flex-1 flex flex-col bg-white">
                                    <ul className="space-y-3 mb-6 flex-1">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5">
                                                <div className="flex-shrink-0 mt-0.5 bg-brand/10 p-1 rounded-full">
                                                    <Check className="w-3 h-3 text-brand stroke-[3]" />
                                                </div>
                                                <span className="text-[13px] text-gray-600 font-medium leading-snug">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={`/enroll?category=${plan.id}`}
                                        className={`w-full flex items-center justify-center gap-2 py-3 md:py-3.5 rounded-lg font-bold text-[13px] md:text-sm transition-all
                                        ${plan.highlight ? 'bg-brand text-white shadow-[0_6px_15px_-6px_var(--color-brand)] hover:brightness-110' : 'bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'}`}
                                    >
                                        Get Started
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ PLAN COMPARISON ══════════ */}
            <section className="px-4 sm:px-6 lg:px-8 pb-16 pt-8 relative">
                <div className="absolute inset-0 top-1/3 bg-brand/5 blur-[80px] rounded-full" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center flex flex-col items-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand/20 bg-[#1A2234] text-brand-light mb-4 text-[10px] sm:text-xs"
                        >
                            <Scale className="w-3 h-3 text-brand" />
                            <span className="font-bold tracking-widest uppercase">COMPARISON</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight"
                        >
                            Plan <span className="text-brand">Comparison</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white border border-gray-200 rounded-2xl overflow-x-auto shadow-xl shadow-brand/5 relative"
                    >
                        {/* Highlights the popular B plan column softly */}
                        <div className="absolute top-0 bottom-0 left-[40%] w-[20%] bg-blue-50/50 border-x border-brand/10 pointer-events-none hidden md:block" />

                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr>
                                    <th className="py-4 px-6 text-xs font-black text-gray-700 uppercase tracking-wider w-[40%] border-b border-gray-200 bg-gray-50/50">Feature</th>
                                    <th className="py-4 px-4 text-xs font-black text-gray-700 uppercase tracking-wider text-center w-[15%] border-b border-gray-200 bg-gray-50/50">Cat. A</th>
                                    <th className="py-4 px-4 text-xs font-black text-brand uppercase tracking-wider text-center w-[15%] border-b border-gray-200 bg-blue-50/80">Cat. B</th>
                                    <th className="py-4 px-4 text-xs font-black text-gray-700 uppercase tracking-wider text-center w-[15%] border-b border-gray-200 bg-gray-50/50">Cat. C</th>
                                    <th className="py-4 px-4 text-xs font-black text-gray-700 uppercase tracking-wider text-center w-[15%] border-b border-gray-200 bg-gray-50/50">Cat. D</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {comparisonFeatures.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors relative">
                                        <td className="py-3 px-6 text-xs md:text-sm font-bold text-gray-800">{row.name}</td>

                                        <td className="py-3 px-4 text-center">
                                            {typeof row.a === 'boolean' ? (
                                                row.a ? <Check className="w-4 h-4 text-brand mx-auto stroke-[3]" /> : <Minus className="w-4 h-4 text-gray-300 mx-auto" />
                                            ) : (
                                                <span className="text-xs md:text-sm font-medium text-gray-500">{row.a}</span>
                                            )}
                                        </td>

                                        <td className="py-3 px-4 text-center bg-blue-50/30 relative">
                                            {typeof row.b === 'boolean' ? (
                                                row.b ? <Check className="w-4 h-4 text-brand mx-auto stroke-[3]" /> : <Minus className="w-4 h-4 text-gray-300 mx-auto" />
                                            ) : (
                                                <span className="text-xs md:text-sm font-bold text-gray-900">{row.b}</span>
                                            )}
                                        </td>

                                        <td className="py-3 px-4 text-center">
                                            {typeof row.c === 'boolean' ? (
                                                row.c ? <Check className="w-4 h-4 text-brand mx-auto stroke-[3]" /> : <Minus className="w-4 h-4 text-gray-300 mx-auto" />
                                            ) : (
                                                <span className="text-xs md:text-sm font-medium text-gray-500">{row.c}</span>
                                            )}
                                        </td>

                                        <td className="py-3 px-4 text-center">
                                            {typeof row.d === 'boolean' ? (
                                                row.d ? <Check className="w-4 h-4 text-brand mx-auto stroke-[3]" /> : <Minus className="w-4 h-4 text-gray-300 mx-auto" />
                                            ) : (
                                                <span className="text-xs md:text-sm font-medium text-gray-500">{row.d}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>

            {/* ══════════ FAQ SECTION ══════════ */}
            <section className="px-4 sm:px-6 lg:px-8 pb-16 relative z-20">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center flex flex-col items-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand/20 bg-[#1A2234] text-brand-light mb-4 shadow-sm"
                        >
                            <HelpCircle className="w-3 h-3 text-brand" />
                            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">FAQ</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight"
                        >
                            Frequently Asked <span className="text-brand">Questions</span>
                        </motion.h2>
                    </div>

                    <div className="space-y-3">
                        {[
                            {
                                q: "What is included in the fee?",
                                a: "All our plans explicitly include your PDL processing, regular assessments, and the final NTSA driving examination. There are no hidden fees!"
                            },
                            {
                                q: "Can I pay in installments?",
                                a: "Yes, you can! We offer perfectly flexible structure allowing you to pay as you take the lessons. Reach out to our front desk for bespoke planning."
                            },
                            {
                                q: "What's the difference between B1 and B2?",
                                a: "Category B1 is for driving Automatic transmission vehicles exclusively. Category B2 covers Manual transmission vehicles (which legally allows you to drive automatic safely as well!)."
                            },
                            {
                                q: "Can I combine categories?",
                                a: "Absolutely. We offer combined plans like Light Vehicle (B1 + B2) taking you through both types, and specific Commercial combos like B2 + C1 to get you fully road-ready."
                            },
                            {
                                q: "How do I get started?",
                                a: "Click 'Enroll Now' below to register your info immediately, or reach us via Phone for a free instant consultation to find the best course for you!"
                            }
                        ].map((faq, index) => (
                            <FAQItem key={index} faq={faq} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ FINAL CTA (READY TO GET STARTED) ══════════ */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-28 border-t border-[#1C2538] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed opacity-[0.25]"
                    style={{ backgroundImage: "url('/assets/salooncar.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]" />

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight drop-shadow-2xl">
                            Ready to Get <span className="text-brand drop-shadow-xl">Started?</span>
                        </h2>
                        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mb-8 font-medium">
                            Choose your category and start your driving journey today. Fee payable in installments!
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                            <Link
                                href="/enroll"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-bold text-sm shadow-[0_6px_15px_-5px_var(--color-brand)] hover:shadow-[0_10px_20px_-5px_var(--color-brand)] hover:bg-brand-light transition-all duration-300"
                            >
                                <GraduationCap className="w-4 h-4" />
                                Enroll Now
                            </Link>
                            <a
                                href="tel:0722999309"
                                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1A2234] text-white text-sm border border-[#232F46] hover:border-[#3E4A61] hover:bg-[#232F46] font-medium shadow-md transition-all duration-300"
                            >
                                <Phone className="w-4 h-4 text-gray-400" />
                                0722 999 309
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

function FAQItem({ faq, index }: { faq: any; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${isOpen ? 'bg-white border-brand/40 shadow-md ring-1 ring-brand/10' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-5 py-4 flex items-center justify-between focus:outline-none bg-transparent"
            >
                <span className="font-bold text-left text-gray-900 text-sm md:text-[15px]">{faq.q}</span>
                <ChevronDown
                    className={`w-4 h-4 text-brand shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden bg-gray-50/50"
                    >
                        <div className="px-5 pb-5 pt-0 text-gray-600 text-xs md:text-sm leading-relaxed border-t border-gray-100 mt-2 pt-4">
                            {faq.a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
