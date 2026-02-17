
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { Loader2, Video } from 'lucide-react';
import type { GalleryItem } from '@/types';

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (data) {
                    setImages(data);
                }
            } catch (error) {
                console.error('Error fetching gallery:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-brand py-24 sm:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-brand mix-blend-multiply" />
                    <div className="absolute inset-0 bg-dot-pattern opacity-10" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Our Gallery
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
                        A glimpse into life at Trinity Driving College.
                    </p>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                {loading ? (
                    <div className="flex justify-center h-64">
                        <Loader2 className="h-10 w-10 animate-spin text-brand" />
                    </div>
                ) : images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {images.map((image) => (
                            <div key={image.id} className="group relative break-inside-avoid overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-900/5 aspect-square hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                {image.type === 'video' ? (
                                    <div className="flex flex-col items-center justify-center h-full bg-gray-900">
                                        <Video className="h-16 w-16 text-white/50 mb-4" />
                                        <a href={image.image_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-sm">
                                            View Video
                                        </a>
                                        {/* Ideally use a video player here */}
                                    </div>
                                ) : (
                                    <Image
                                        src={image.image_url}
                                        alt={image.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{image.title}</h3>
                                        <p className="text-gray-200 text-sm">{image.category}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <p className="text-xl text-gray-500">Gallery is being updated. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
