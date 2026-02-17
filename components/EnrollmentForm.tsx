
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Define categories and classes
const CATEGORIES = [
    {
        id: 'A',
        name: 'Category A – Motorcycles',
        classes: [
            { id: 'A2', name: 'A2 – Motorcycle' },
            { id: 'A3', name: 'A3 – Three Wheelers (TukTuk)' }
        ]
    },
    {
        id: 'B',
        name: 'Category B – Light Vehicles',
        classes: [
            { id: 'B1', name: 'B1 – Light Vehicle (Automatic)' },
            { id: 'B2', name: 'B2 – Light Vehicle (Manual)' },
            { id: 'B1_B2', name: 'Combined (B1 + B2)' } // Added based on pricing logic
        ]
    },
    {
        id: 'C',
        name: 'Category C – Trucks',
        classes: [
            { id: 'C1', name: 'C1 – Light Trucks' },
            { id: 'C2', name: 'C2 – Medium Trucks' },
            { id: 'B2_C1', name: 'Combined (B2 + C1)' } // Added based on pricing logic
        ]
    },
    {
        id: 'D',
        name: 'Category D – PSV',
        classes: [
            { id: 'B3', name: 'B3 – Professional 7-Seater' },
            { id: 'D1', name: 'D1 – 14-Seater' },
            { id: 'D2', name: 'D2 – 33-Seater' }
        ]
    }
];

const formSchema = z.object({
    fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
    category: z.string().min(1, { message: 'Please select a category.' }),
    courseId: z.string().min(1, { message: 'Please select a specific class.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function EnrollmentForm() {
    const [isClient, setIsClient] = useState(false);
    const searchParams = useSearchParams();
    const courseIdParam = searchParams.get('course');
    const categoryParam = searchParams.get('category'); // e.g., category-a

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // State to track available classes based on selected category
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [availableClasses, setAvailableClasses] = useState<{ id: string, name: string }[]>([]);

    // Hydration fix for client-side search params
    useEffect(() => {
        setIsClient(true);
    }, []);

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: 'ocheing999@gmail.com', // Pre-filled for testing
            phone: '',
            category: '',
            courseId: '',
        }
    });

    // Watch category changes to update classes
    const watchedCategory = watch('category');

    useEffect(() => {
        if (watchedCategory) {
            setSelectedCategory(watchedCategory);
            const categoryObj = CATEGORIES.find(c => c.id === watchedCategory);
            setAvailableClasses(categoryObj ? categoryObj.classes : []);
            // Only reset courseId if it's not the one we just set from params (this logic can be improved)
            // Ideally we clear courseId when category changes manually
        } else {
            setAvailableClasses([]);
        }
    }, [watchedCategory]);

    // Handle initial params
    useEffect(() => {
        if (categoryParam) {
            // Map 'category-a' to 'A'
            const catId = categoryParam.replace('category-', '').toUpperCase();
            const validCat = CATEGORIES.find(c => c.id === catId);
            if (validCat) {
                setValue('category', catId);
            }
        }

        // If course param maps to a known class ID, set it
        // This part is tricky if courseParam doesn't match our new IDs, but we'll leave it simple for now
        if (courseIdParam) {
            // Try to find which category this course belongs to if not explicitly passed
            for (const cat of CATEGORIES) {
                if (cat.classes.some(c => c.id === courseIdParam)) {
                    setValue('category', cat.id);
                    setTimeout(() => setValue('courseId', courseIdParam), 0);
                    break;
                }
            }
        }
    }, [categoryParam, courseIdParam, setValue]);


    async function onSubmit(values: FormValues) {
        setLoading(true);
        setError('');
        try {
            // Find the full class name for clearer records
            const categoryObj = CATEGORIES.find(c => c.id === values.category);
            const classObj = categoryObj?.classes.find(c => c.id === values.courseId);
            const fullCourseName = classObj ? `${categoryObj?.name} - ${classObj.name}` : values.courseId;

            const { error: insertError } = await supabase.from('enrollments').insert([
                {
                    full_name: values.fullName,
                    email: values.email,
                    phone: values.phone,
                    course_name: fullCourseName, // Saving as text since we don't have DB course UUIDs
                    status: 'pending'
                }
            ]);

            if (insertError) throw insertError;

            // Send email notification (async - don't block success message)
            fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: values.fullName,
                    email: values.email,
                    phone: values.phone,
                    courseId: fullCourseName
                })
            }).catch(err => console.error('Failed to send email:', err));

            setSuccess(true);
            reset();
            setSelectedCategory('');
        } catch (e: any) {
            console.error('Enrollment error:', e);
            setError(e.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    if (!isClient) return <div>Loading...</div>;

    if (success) {
        return (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg shadow-sm text-center">
                <h3 className="font-bold text-2xl mb-2">Thank you for enrolling!</h3>
                <p className="text-lg">We have received your application successfully.</p>
                <p className="mt-2 text-sm">Our team will contact you shortly to confirm your schedule.</p>
                <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-brand font-medium hover:underline"
                >
                    Submit another enrollment
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-xl rounded-lg p-8 space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Start Your Journey</h2>
                <p className="text-gray-500">Fill in the form below to enroll in a course.</p>
            </div>

            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <div className="mt-1">
                    <input
                        id="fullName"
                        {...register('fullName')}
                        type="text"
                        className={`appearance-none block w-full px-3 py-2 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm`}
                        placeholder="John Doe"
                    />
                    {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                </label>
                <div className="mt-1">
                    <input
                        id="email"
                        {...register('email')}
                        type="email"
                        className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm`}
                        placeholder="john@example.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <div className="mt-1">
                    <input
                        id="phone"
                        {...register('phone')}
                        type="tel"
                        className={`appearance-none block w-full px-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm`}
                        placeholder="+254 700 000 000"
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                </div>
            </div>

            {/* Category Dropdown */}
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                </label>
                <div className="mt-1">
                    <select
                        id="category"
                        {...register('category')}
                        className={`block w-full px-3 py-2 border ${errors.category ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand sm:text-sm text-gray-900`}
                    >
                        <option value="">Select a Category</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                </div>
            </div>

            {/* Class Dropdown - Dependent on Category */}
            <div>
                <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">
                    Specific Class
                </label>
                <div className="mt-1">
                    <select
                        id="courseId"
                        {...register('courseId')}
                        disabled={!selectedCategory}
                        className={`block w-full px-3 py-2 border ${errors.courseId ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand sm:text-sm text-gray-900 ${!selectedCategory ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    >
                        <option value="">Select a Class</option>
                        {availableClasses.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                    {!selectedCategory && (
                        <p className="mt-1 text-xs text-gray-500">Please select a category first.</p>
                    )}
                    {errors.courseId && (
                        <p className="mt-1 text-sm text-red-600">{errors.courseId.message}</p>
                    )}
                </div>
            </div>

            {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded border border-red-200">
                    {error}
                </div>
            )}

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-colors`}
                >
                    {loading ? 'Submitting...' : 'Enroll Now'}
                </button>
            </div>
        </form>
    );
}
