
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { Trash2, Edit, Plus, MessageSquareQuote, Loader2, Check, X } from 'lucide-react';
import type { Testimonial } from '@/types';

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const fetchTestimonials = async () => {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTestimonials(data || []);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;

        setDeletingId(id);
        try {
            const { error } = await supabase
                .from('testimonials')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setTestimonials(testimonials.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            alert('Failed to delete testimonial.');
        } finally {
            setDeletingId(null);
        }
    };

    const togglePublish = async (id: string, currentStatus: boolean) => {
        setTogglingId(id);
        try {
            const { error } = await supabase
                .from('testimonials')
                .update({ is_published: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setTestimonials(testimonials.map(t =>
                t.id === id ? { ...t, is_published: !currentStatus } : t
            ));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status.');
        } finally {
            setTogglingId(null);
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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
                <Link
                    href="/admin/testimonials/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Testimonial
                </Link>
            </div>

            {testimonials.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <MessageSquareQuote className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No testimonials yet</h3>
                    <div className="mt-6">
                        <Link
                            href="/admin/testimonials/new"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-brand-dark"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Add Testimonial
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {testimonials.map((testimonial) => (
                            <li key={testimonial.id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-medium text-brand truncate">
                                                {testimonial.name} <span className="text-gray-500 font-normal">- {testimonial.role}</span>
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500 line-clamp-2 max-w-xl">
                                                "{testimonial.content}"
                                            </p>
                                            <div className="mt-2 flex items-center text-xs text-gray-400">
                                                <span>Rating: {testimonial.rating}/5</span>
                                                <span className="mx-2">•</span>
                                                <span>{new Date(testimonial.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => togglePublish(testimonial.id, testimonial.is_published)}
                                                disabled={togglingId === testimonial.id}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${testimonial.is_published
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {togglingId === testimonial.id ? (
                                                    <Loader2 className="h-3 w-3 animate-spin" />
                                                ) : testimonial.is_published ? (
                                                    <><Check className="h-3 w-3" /> Published</>
                                                ) : (
                                                    <><X className="h-3 w-3" /> Draft</>
                                                )}
                                            </button>

                                            <Link
                                                href={`/admin/testimonials/${testimonial.id}`}
                                                className="text-gray-400 hover:text-gray-500 transition"
                                                title="Edit"
                                            >
                                                <Edit className="h-5 w-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(testimonial.id)}
                                                disabled={deletingId === testimonial.id}
                                                className="text-red-400 hover:text-red-500 transition"
                                                title="Delete"
                                            >
                                                {deletingId === testimonial.id ? (
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
