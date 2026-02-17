
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Check, X, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Enrollment {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    course_name: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    courses?: {
        title: string;
        price: number;
    };
}

interface EnrollmentsTableProps {
    enrollments: Enrollment[];
}

export default function EnrollmentsTable({ enrollments }: EnrollmentsTableProps) {
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleApprove = async (enrollmentId: string) => {
        if (!confirm('Are you sure you want to approve this enrollment? An email will be sent to the student.')) return;

        setActionLoading(enrollmentId);
        try {
            const response = await fetch('/api/enrollments/approve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ enrollmentId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to approve enrollment');
            }

            alert(data.message || 'Enrollment approved successfully!');
            router.refresh(); // Refresh server component data
        } catch (error: any) {
            console.error('Approval Error:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold leading-6 text-gray-900">
                    Student Enrollments
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {enrollments.length} Total
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Student Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact Info
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Course
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {enrollments.length > 0 ? (
                            enrollments.map((enrollment) => (
                                <tr key={enrollment.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{enrollment.full_name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{enrollment.email}</div>
                                        <div className="text-sm text-gray-500">{enrollment.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {enrollment.courses?.title || enrollment.course_name || 'Unknown Course'}
                                        </div>
                                        {enrollment.courses?.price && (
                                            <div className="text-xs text-gray-500">KES {enrollment.courses.price.toLocaleString()}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(new Date(enrollment.created_at), 'MMM d, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${enrollment.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                enrollment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                            {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {enrollment.status === 'pending' && (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleApprove(enrollment.id)}
                                                    disabled={actionLoading === enrollment.id}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
                                                    title="Approve Enrollment"
                                                >
                                                    {actionLoading === enrollment.id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <Check className="h-4 w-4 mr-1" /> Approve
                                                        </>
                                                    )}
                                                </button>
                                                {/* Reject button logic could be added here similarly */}
                                            </div>
                                        )}
                                        {enrollment.status === 'approved' && (
                                            <span className="text-green-600 flex items-center justify-end">
                                                <Check className="h-4 w-4 mr-1" /> Approved
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                                    No enrollments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
