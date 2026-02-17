
'use client';

import { motion } from 'framer-motion';
import CourseCard from '@/components/CourseCard';
import Link from 'next/link';
import type { Course } from '@/types';

export default function FeaturedCourses({ courses }: { courses: Course[] }) {
    return (
        <div className="py-16 bg-white lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-brand tracking-wide uppercase">Our Programs</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Featured Driving Courses
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Choose the program that best fits your needs and experience level.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))}
                </div>
                <div className="mt-16 text-center">
                    <Link href="/services" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand bg-brand/10 hover:bg-brand/20 transition-all duration-300">
                        View all courses <span aria-hidden="true" className="ml-2">&rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
