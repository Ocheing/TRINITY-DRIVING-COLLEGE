'use client';

import { Check, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PricingOption {
    title: string;
    price: string;
    lessons: string;
    description?: string;
    isCombined?: boolean;
}

interface ServiceCategory {
    id: string;
    name: string; // "Category A – Motorcycles"
    icon: string;
    classes: string[]; // ["A2", "A3"]
    options: PricingOption[];
    features: string[];
}

const services: ServiceCategory[] = [
    {
        id: 'category-a',
        name: 'Category A – Motorcycles',
        icon: 'bike',
        classes: ['A2 – Motorcycle', 'A3 – Three Wheelers (TukTuk)'],
        options: [
            {
                title: 'A2 or A3 Course',
                price: 'KSH 7,500',
                lessons: '20 Lessons',
                description: 'Comprehensive training for either Motorcycle or TukTuk.'
            }
        ],
        features: [
            'PDL Included',
            'Assessment Included',
            'NTSA Exam Included',
            'Safety Gear Provided',
            'Flexible Scheduling'
        ]
    },
    {
        id: 'category-b',
        name: 'Category B – Light Vehicles',
        icon: 'car',
        classes: ['B1 – Automatic', 'B2 – Manual'],
        options: [
            {
                title: 'Single Class (B1 or B2)',
                price: 'KSH 12,500',
                lessons: '30 Lessons',
                description: 'Master either manual or automatic transmission.'
            },
            {
                title: 'Combined (B1 + B2)',
                price: 'KSH 14,000',
                lessons: '30 Lessons',
                description: 'Complete training for both transmission types.',
                isCombined: true
            }
        ],
        features: [
            'PDL Included',
            'Assessment Included',
            'NTSA Exam Included',
            'Defensive Driving',
            'First Aid Basics'
        ]
    },
    {
        id: 'category-c',
        name: 'Category C – Trucks',
        icon: 'truck',
        classes: ['C1 – Light Trucks', 'C2 – Medium Trucks'],
        options: [
            {
                title: 'Light Trucks (C1)',
                price: 'KSH 13,000',
                lessons: 'Variable',
                description: 'For commercial light truck operation.'
            },
            {
                title: 'Medium Trucks (C2)',
                price: 'KSH 13,000',
                lessons: 'Variable',
                description: 'For commercial medium truck operation.'
            },
            {
                title: 'Combined (B2 + C1)',
                price: 'KSH 16,000',
                lessons: '30 Lessons',
                description: 'Light Vehicle Manual + Light Truck package.',
                isCombined: true
            }
        ],
        features: [
            'PDL Included',
            'Assessment Included',
            'NTSA Exam Included',
            'Commercial Evaluation',
            'Load Safety Training'
        ]
    },
    {
        id: 'category-d',
        name: 'Category D – PSV',
        icon: 'users',
        classes: ['B3 – Pro 7-Seater', 'D1 – 14-Seater', 'D2 – 33-Seater'],
        options: [
            {
                title: 'Any Single Class',
                price: 'KSH 8,500',
                lessons: '20 Lessons',
                description: 'Select B3, D1, or D2 based on your needs.'
            }
        ],
        features: [
            'PDL Included',
            'Assessment Included',
            'NTSA Exam Included',
            'Passenger Relations',
            'PSV Regulations'
        ]
    }
];

export default function PricingPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/assets/hero.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay */}

                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-extrabold mb-4"
                    >
                        Transparent Pricing
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-xl md:text-2xl font-light mb-2 text-gray-200">
                            Affordable Driving Courses
                        </p>
                        <p className="text-lg text-gray-300 mb-6">
                            Choose the category that fits your needs.
                        </p>
                        <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
                            <p className="text-sm sm:text-base font-medium text-white flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-400" />
                                All prices are inclusive of PDL, Assessment, and NTSA Exam.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Offerings Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="max-w-5xl mx-auto">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex flex-col bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="p-6 pb-2">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {service.classes.map((cls) => (
                                            <span key={cls} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-100/50 text-blue-800 border border-blue-100">
                                                {cls}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="space-y-3">
                                        {service.options.map((option, idx) => (
                                            <div
                                                key={idx}
                                                className={`p-4 rounded-xl border transition-colors ${option.isCombined
                                                    ? 'bg-amber-50/40 border-amber-200/50 hover:bg-amber-50/60'
                                                    : 'bg-gray-50/40 border-gray-200/50 hover:bg-gray-50/60'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start gap-3">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-sm">{option.title}</h4>
                                                        <p className="text-xs text-gray-600 mt-0.5">{option.description}</p>
                                                        <div className="flex items-center mt-1.5 text-[10px] font-medium text-gray-500 uppercase tracking-wide">
                                                            <span className="bg-white/80 px-1.5 py-0.5 rounded shadow-sm border border-gray-100">{option.lessons}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right whitespace-nowrap">
                                                        <span className="block text-lg font-extrabold text-brand">{option.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex-1 px-6 py-4 bg-gray-50/30 border-t border-gray-100/50">
                                    <h4 className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase mb-3">What's included</h4>
                                    <ul className="grid sm:grid-cols-2 gap-2">
                                        {service.features.map((feature) => (
                                            <li key={feature} className="flex items-start">
                                                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                                    <Check className="h-2.5 w-2.5 text-green-600" />
                                                </div>
                                                <span className="text-xs text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-4 bg-white/40 border-t border-gray-200/50 backdrop-blur-sm">
                                    <Link
                                        href={`/enroll?category=${service.id}`}
                                        className="block w-full bg-brand hover:bg-brand-dark text-white text-center font-bold py-2.5 px-4 rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
                                    >
                                        Enroll in {service.name}
                                    </Link>
                                    <p className="mt-2 text-center text-[10px] text-gray-500 flex items-center justify-center gap-1 opacity-80">
                                        <ShieldCheck className="h-3 w-3 text-green-600" />
                                        Inclusive of PDL + Assessment + NTSA Exam
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
