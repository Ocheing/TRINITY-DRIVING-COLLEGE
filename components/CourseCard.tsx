
import Image from 'next/image';
import type { Course } from '@/types';
import Link from 'next/link';

export default function CourseCard({ course }: { course: Course }) {
    return (
        <div className="flex flex-col rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
            <div className="flex-shrink-0 relative h-48 w-full bg-gray-200">
                {course.image_url ? (
                    <Image
                        fill
                        className="object-cover"
                        src={course.image_url}
                        alt={course.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                )}
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-brand uppercase tracking-wide">
                        {course.duration}
                    </p>
                    <Link href={`/courses/${course.id}`} className="block mt-2 group">
                        <p className="text-xl font-semibold text-gray-900 group-hover:text-brand transition-colors">{course.title}</p>
                        <p className="mt-3 text-base text-gray-500 line-clamp-3">{course.description}</p>
                    </Link>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex-shrink-0">
                        <span className="text-2xl font-bold text-gray-900">KES {course.price.toLocaleString()}</span>
                    </div>
                    <div className="ml-4">
                        <Link
                            href={`/enroll?course=${course.id}`}
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand hover:bg-brand-dark transition-colors"
                        >
                            Enroll
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
