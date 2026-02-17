
import { Suspense } from 'react';
import EnrollmentForm from '@/components/EnrollmentForm';

export default function EnrollPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Enroll at Trinity Driving College
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Secure your spot today and start your driving journey.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Suspense fallback={<div className="text-center p-4">Loading enrollment form...</div>}>
                    <EnrollmentForm />
                </Suspense>
            </div>
        </div>
    );
}
