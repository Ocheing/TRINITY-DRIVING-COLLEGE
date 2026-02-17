'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="relative bg-gray-900 overflow-hidden h-screen max-h-[800px] flex items-center">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/hero.jpg"
                    alt="Driving School Car"
                    fill
                    priority
                    className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/50 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6"
                    >
                        Master the Road <br />
                        <span className="text-brand">With Confidence</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-6 text-xl text-gray-200 max-w-2xl"
                    >
                        Join Trinity Driving College for expert instruction, flexible scheduling, and a proven track record of success. Your journey to independence starts here.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="/enroll"
                            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-brand hover:bg-brand-dark transition-all hover:scale-105 transform duration-200"
                        >
                            Enroll Now
                        </Link>
                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-full shadow-lg text-white hover:bg-white hover:text-gray-900 transition-all hover:scale-105 transform duration-200"
                        >
                            View Courses
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
