
'use client';

// Replaced Lucide icons with others to match new features
import { Receipt, Car, Clock, BookOpen, UserCheck, CheckCircle, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        name: 'NTSA Accredited Instructors',
        description: 'Learn from fully certified and experienced instructors for trusted, professional training.',
        icon: Award,
    },
    {
        name: '30 Lessons & Guaranteed Pass',
        description: 'We offer a comprehensive 30-lesson package at affordable prices to ensure you pass confidently.',
        icon: Star,
    },
    {
        name: 'Fee Payable in Installments',
        description: 'We offer flexible payment plans allowing you to pay your fees in manageable installments.',
        icon: Receipt,
    },
    {
        name: 'Pick-Up & Drop-Off',
        description: 'Convenient pick-up and drop-off services available on request to save you time.',
        icon: Car,
    },
    {
        name: 'Flexible Class Timings',
        description: 'Early morning and evening classes designed to fit around your work or school schedule.',
        icon: Clock,
    },
    {
        name: 'Free Learner’s Manual',
        description: 'Get a complimentary softcopy of the NTSA Learner’s Manual to help you study anywhere.',
        icon: BookOpen,
    }
];

export default function Features() {
    return (
        <div className="relative py-16 lg:py-24 overflow-hidden bg-white">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-brand tracking-wide uppercase">Why Choose Us</h2>
                    <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Why Choose Trinity Driving College?
                    </h3>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                        We provide top-tier driving education with benefits designed for your convenience and success.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative bg-white/80 backdrop-blur-xl rounded-xl p-8 border border-gray-200/50 hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg group"
                        >
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand text-white mb-6 transform transition-transform group-hover:scale-110">
                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <div className="">
                                <h3 className="text-lg leading-6 font-bold text-gray-900">{feature.name}</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
