
import { Suspense } from 'react';
import EnrollmentForm from '@/components/EnrollmentForm';
import { GraduationCap } from 'lucide-react';

export default function EnrollPage() {
    return (
        <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-screen">
            {/* Hero Banner */}
            <div className="relative bg-gradient-to-br from-[#0c1929] via-[#0f2035] to-[#0a1520] pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-6">
                        <GraduationCap className="w-4 h-4 text-brand" />
                        <span className="text-xs font-bold text-brand tracking-widest uppercase">Enrollment</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Enroll at <span className="text-brand">Trinity</span> Driving College
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
                        Secure your spot today and start your driving journey with expert instructors.
                    </p>
                </div>

                {/* Bottom gradient blend — matches hero background */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a1520] to-transparent" />
            </div>

            {/* Form Section */}
            <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Suspense fallback={
                    <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-4" />
                        <div className="h-4 bg-gray-100 rounded w-64 mx-auto" />
                    </div>
                }>
                    <EnrollmentForm />
                </Suspense>
            </div>
        </div>
    );
}
