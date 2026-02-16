
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { Mail, Phone, Award, Loader2 } from 'lucide-react';
import type { Instructor } from '@/types';

export default function InstructorsPage() {
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const { data, error } = await supabase
                    .from('instructors')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (data) {
                    setInstructors(data);
                }
            } catch (error) {
                console.error('Error fetching instructors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, []);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-brand py-24 sm:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-brand mix-blend-multiply" />
                    <div className="absolute inset-0 bg-dot-pattern opacity-10" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Meet Our Expert Instructors
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
                        Learn from the best. Our NTSA-certified team is dedicated to making you a safe and confident driver.
                    </p>
                </div>
            </div>

            {/* Instructors Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                {loading ? (
                    <div className="flex justify-center h-64">
                        <Loader2 className="h-10 w-10 animate-spin text-brand" />
                    </div>
                ) : instructors.length > 0 ? (
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {instructors.map((instructor) => (
                            <div key={instructor.id} className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                <div className="relative h-64 sm:h-auto sm:w-1/3 min-h-[250px]">
                                    <Image
                                        src={instructor.image_url}
                                        alt={instructor.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">{instructor.name}</h3>
                                                <p className="text-brand font-medium">{instructor.role}</p>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-gray-600 leading-relaxed line-clamp-4">
                                            {instructor.bio}
                                        </p>

                                        {instructor.certifications && instructor.certifications.length > 0 && (
                                            <div className="mt-6">
                                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                                                    <Award className="h-4 w-4 text-brand" /> Certifications
                                                </h4>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {instructor.certifications.map((cert) => (
                                                        <span key={cert} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-brand-dark">
                                                            {cert}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-4">
                                        <button className="text-sm font-medium text-gray-500 hover:text-brand flex items-center gap-2 transition-colors">
                                            <Mail className="h-4 w-4" /> Message
                                        </button>
                                        <button className="text-sm font-medium text-gray-500 hover:text-brand flex items-center gap-2 transition-colors">
                                            <Phone className="h-4 w-4" /> Book Session
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <p className="text-xl text-gray-500">Currently accepting new instructor applications.</p>
                        <p className="mt-2 text-gray-400">Check back soon for our full team listing!</p>
                    </div>
                )}
            </div>

            {/* CTA */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Ready to choose your instructor?</h2>
                    <p className="mt-4 text-lg text-gray-500">Enroll today and ask for your preferred instructor during orientation.</p>
                    <div className="mt-8">
                        <a href="/enroll" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand hover:bg-brand-dark md:py-4 md:text-lg md:px-10 shadow-md transition-all">
                            Enroll Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
