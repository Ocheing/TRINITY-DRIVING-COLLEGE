
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Edit, Plus, User, Loader2 } from 'lucide-react';
import type { Instructor } from '@/types';

export default function AdminInstructorsPage() {
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchInstructors = async () => {
        try {
            const { data, error } = await supabase
                .from('instructors')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setInstructors(data || []);
        } catch (error) {
            console.error('Error fetching instructors:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInstructors();
    }, []);

    const handleDelete = async (id: string, imageUrl: string) => {
        if (!confirm('Are you sure you want to delete this instructor?')) return;

        setDeletingId(id);
        try {
            // 1. Delete Image from Storage
            const path = imageUrl.split('/').pop();
            if (path) {
                await supabase.storage.from('instructors').remove([path]);
            }

            // 2. Delete from DB
            const { error } = await supabase
                .from('instructors')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Remove from state
            setInstructors(instructors.filter(i => i.id !== id));
        } catch (error) {
            console.error('Error deleting instructor:', error);
            alert('Failed to delete instructor.');
        } finally {
            setDeletingId(null);
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
                <h1 className="text-2xl font-bold text-gray-900">Instructor Management</h1>
                <Link
                    href="/admin/instructors/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Instructor
                </Link>
            </div>

            {instructors.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <User className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No instructors found</h3>
                    <div className="mt-6">
                        <Link
                            href="/admin/instructors/new"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-brand-dark"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Add Instructor
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {instructors.map((instructor) => (
                            <li key={instructor.id}>
                                <div className="px-4 py-4 flex items-center sm:px-6">
                                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12 relative rounded-full overflow-hidden">
                                                <Image
                                                    src={instructor.image_url}
                                                    alt={instructor.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="ml-4 truncate">
                                                <div className="flex text-sm">
                                                    <p className="font-medium text-brand truncate">{instructor.name}</p>
                                                    <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                                                        - {instructor.role}
                                                    </p>
                                                </div>
                                                <div className="mt-2 flex">
                                                    <p className="text-sm text-gray-500 truncate max-w-md">
                                                        {instructor.bio}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-5 flex-shrink-0 flex gap-2">
                                        <Link
                                            href={`/admin/instructors/${instructor.id}`}
                                            className="p-2 text-gray-400 hover:text-gray-500 transition"
                                            title="Edit"
                                        >
                                            <Edit className="h-5 w-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(instructor.id, instructor.image_url)}
                                            disabled={deletingId === instructor.id}
                                            className="p-2 text-red-400 hover:text-red-500 transition"
                                            title="Delete"
                                        >
                                            {deletingId === instructor.id ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-5 w-5" />
                                            )}
                                        </button>
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
