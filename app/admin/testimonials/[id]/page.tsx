
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditTestimonialPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form States
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState('5');
    const [isPublished, setIsPublished] = useState(false);

    useEffect(() => {
        const fetchTestimonial = async () => {
            if (!id) return;
            try {
                const { data, error } = await supabase
                    .from('testimonials')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setName(data.name);
                    setRole(data.role);
                    setContent(data.content);
                    setRating(data.rating.toString());
                    setIsPublished(data.is_published);
                }
            } catch (error) {
                console.error('Error fetching testimonial:', error);
                alert('Error loading testimonial.');
                router.push('/admin/testimonials');
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonial();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !content) return;

        setSaving(true);
        try {
            const { error: dbError } = await supabase
                .from('testimonials')
                .update({
                    name,
                    role,
                    content,
                    rating: parseInt(rating),
                    is_published: isPublished,
                })
                .eq('id', id);

            if (dbError) throw dbError;

            router.push('/admin/testimonials');
        } catch (error) {
            console.error('Error updating testimonial:', error);
            alert('Error updating testimonial. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-brand" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/testimonials" className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Testimonials
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Testimonial</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Student Name</label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm text-gray-900"
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role / Context</label>
                    <input
                        type="text"
                        id="role"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm text-gray-900"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Testimonial Content</label>
                    <textarea
                        id="content"
                        rows={4}
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm text-gray-900"
                    />
                </div>

                <div className="flex gap-6">
                    <div className="w-1/2">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm text-gray-900"
                        >
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Good</option>
                            <option value="3">3 - Average</option>
                            <option value="2">2 - Fair</option>
                            <option value="1">1 - Poor</option>
                        </select>
                    </div>

                    <div className="w-1/2 flex items-center pt-6">
                        <input
                            id="is_published"
                            name="is_published"
                            type="checkbox"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                            className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                        />
                        <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
                            Published
                        </label>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand mr-3"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50"
                    >
                        {saving && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
