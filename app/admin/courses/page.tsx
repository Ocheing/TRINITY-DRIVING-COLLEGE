
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function AdminCourses() {
    const supabase = await createClient();
    const { data: courses } = await supabase.from('courses').select('*').order('created_at', { ascending: false });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
                <Link
                    href="/admin/courses/new"
                    className="bg-brand text-white px-4 py-2 rounded shadow-sm hover:bg-brand-dark transition-colors"
                >
                    Add New Course
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                {courses && courses.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {courses.map((course: any) => (
                            <li key={course.id}>
                                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-brand truncate">{course.title}</p>
                                        <div className="ml-2 flex-shrink-0 flex space-x-2">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${course.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {course.is_published ? 'Published' : 'Draft'}
                                            </span>
                                            <Link href={`/admin/courses/${course.id}`} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex text-sm text-gray-500 gap-4">
                                            <p className="flex items-center">
                                                Duration: {course.duration}
                                            </p>
                                            <p className="flex items-center">
                                                Price: KES {course.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="p-12 text-center text-gray-500">
                        No courses found. Click "Add New Course" to create one.
                    </div>
                )}
            </div>
        </div>
    );
}
