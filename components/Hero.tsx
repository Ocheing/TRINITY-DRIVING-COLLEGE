'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        title: "Master the Road",
        highlight: "With Confidence",
        description: "Join Trinity Driving College for expert instruction, flexible scheduling, and a proven track record of success. Your journey to independence starts here."
    },
    {
        title: "Expert Instructors",
        highlight: "Professional Training",
        description: "Our certified instructors provide patient, comprehensive training to ensure you become a safe and skilled driver for life."
    },
    {
        title: "Get Licensed",
        highlight: "Drive Safely",
        description: "We guide you through every step of the licensing process, from learner's permit to your final driving test success."
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative bg-gray-900 overflow-hidden h-screen max-h-[800px] flex items-center">
            {/* Static Background Image */}
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
                    {/* Text Carousel */}
                    <div className="min-h-[280px] sm:min-h-[320px]"> {/* Fixed height container to prevent layout shift */}
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                <div className="flex flex-col">
                                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
                                        {slides[currentSlide].title} <br />
                                        <span className="text-brand">{slides[currentSlide].highlight}</span>
                                    </h1>

                                    <p className="mt-6 text-xl text-gray-200 max-w-2xl">
                                        {slides[currentSlide].description}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Static Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-8 flex flex-col sm:flex-row gap-4"
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

                    {/* Carousel Indicators */}
                    <div className="flex gap-3 mt-12">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-brand' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
