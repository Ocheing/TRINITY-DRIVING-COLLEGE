
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function AdminPricing() {
    const supabase = await createClient();
    // Fetch courses to display their prices
    const { data: courses } = await supabase.from('courses').select('id, title, price, duration').order('price', { ascending: true });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Pricing Management</h1>
                <Link
                    href="/admin/courses/new"
                    className="bg-brand text-white px-4 py-2 rounded shadow-sm hover:bg-brand-dark transition-colors text-sm"
                >
                    Add New Course/Package
                </Link>
            </div>

            <p className="text-gray-600 bg-blue-50 p-4 rounded-md border border-blue-100 text-sm">
                Managing pricing is done by updating the <strong>Price</strong> of each Course.
                Below is a quick overview of all course prices.
                Click "Edit" to change the price for a specific course.
            </p>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Course / Package Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Duration
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price (KES)
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {courses && courses.length > 0 ? (
                            courses.map((course: any) => (
                                <tr key={course.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{course.duration}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900">
                                            {course.price.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/admin/courses/${course.id}`} className="text-brand hover:text-brand-dark">
                                            Edit Price
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                                    No courses found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
