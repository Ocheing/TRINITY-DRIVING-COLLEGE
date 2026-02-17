
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Image as ImageIcon, Video, Loader2 } from 'lucide-react';
import type { GalleryItem } from '@/types';

export default function AdminGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchItems = async () => {
        try {
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (error) {
            console.error('Error fetching gallery items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id: string, imageUrl: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        setDeletingId(id);
        try {
            // 1. Delete from Storage
            const path = imageUrl.split('/').pop(); // simplistic path extraction
            if (path) {
                await supabase.storage.from('gallery').remove([path]);
            }

            // 2. Delete from DB
            const { error } = await supabase
                .from('gallery')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Remove from state
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete item.');
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
                <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
                <Link
                    href="/admin/gallery/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Item
                </Link>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No items in gallery</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new gallery item.</p>
                    <div className="mt-6">
                        <Link
                            href="/admin/gallery/new"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-brand-dark"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            Add Item
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden group relative">
                            <div className="relative h-48 w-full bg-gray-100">
                                {item.type === 'video' ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Video className="h-12 w-12 text-gray-400" />
                                        <span className="sr-only">Video</span>
                                    </div>
                                ) : (
                                    <Image
                                        src={item.image_url}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded p-1">
                                    {item.type === 'video' ? <Video className="h-4 w-4 text-gray-600" /> : <ImageIcon className="h-4 w-4 text-gray-600" />}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-gray-900 truncate">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleDelete(item.id, item.image_url)}
                                    disabled={deletingId === item.id}
                                    className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center justify-center"
                                    title="Delete Item"
                                >
                                    {deletingId === item.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
