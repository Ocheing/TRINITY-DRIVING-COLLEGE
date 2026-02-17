
'use client';

import { Check, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

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
        <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-base font-semibold text-brand tracking-wide uppercase">Transparent Pricing</h2>
                    <h1 className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Affordable Driving Courses
                    </h1>
                    <p className="max-w-2xl mt-5 mx-auto text-xl text-gray-500">
                        Choose the category that fits your needs.
                        <br />
                        <span className="font-bold text-gray-800">All prices are inclusive of PDL, Assessment, and NTSA Exam.</span>
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {services.map((service) => (
                        <div key={service.id} className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="p-8 pb-4">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {service.classes.map((cls) => (
                                        <span key={cls} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {cls}
                                        </span>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    {service.options.map((option, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-4 rounded-xl border ${option.isCombined ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-gray-900 text-lg">{option.title}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                                                    <div className="flex items-center mt-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                        <span className="bg-gray-200 px-2 py-1 rounded">{option.lessons}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-2xl font-extrabold text-brand">{option.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 px-8 py-6 bg-gray-50 border-t border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-4">What's included</h4>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                            <span className="text-sm text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-6 bg-gray-50 border-t border-gray-200">
                                <Link
                                    href={`/enroll?category=${service.id}`}
                                    className="block w-full bg-brand hover:bg-brand-dark text-white text-center font-bold py-3 px-4 rounded-lg transition-colors shadow-md"
                                >
                                    Enroll in {service.name}
                                </Link>
                                <p className="mt-3 text-center text-xs text-gray-500 flex items-center justify-center">
                                    <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
                                    Inclusive of PDL + Assessment + NTSA Exam
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
