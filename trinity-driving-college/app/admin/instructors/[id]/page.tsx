
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EditInstructorPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form States
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');
    const [certifications, setCertifications] = useState('');
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchInstructor = async () => {
            if (!id) return;
            try {
                const { data, error } = await supabase
                    .from('instructors')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setName(data.name);
                    setRole(data.role);
                    setBio(data.bio || '');
                    setCertifications(data.certifications?.join(', ') || '');
                    setCurrentImageUrl(data.image_url);
                }
            } catch (error) {
                console.error('Error fetching instructor:', error);
                alert('Error loading instructor.');
                router.push('/admin/instructors');
            } finally {
                setLoading(false);
            }
        };

        fetchInstructor();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !role) return;

        setSaving(true);
        try {
            let publicUrl = currentImageUrl;

            // 1. Upload File if selected
            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('instructors')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('instructors')
                    .getPublicUrl(filePath);

                publicUrl = data.publicUrl;
            }

            // 2. Process Certifications
            const certsArray = certifications.split(',').map(c => c.trim()).filter(c => c);

            // 3. Update DB
            const { error: dbError } = await supabase
                .from('instructors')
                .update({
                    name,
                    role,
                    bio,
                    image_url: publicUrl,
                    certifications: certsArray,
                })
                .eq('id', id);

            if (dbError) throw dbError;

            router.push('/admin/instructors');
        } catch (error) {
            console.error('Error updating instructor:', error);
            alert('Error updating instructor. Please try again.');
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
                <Link href="/admin/instructors" className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Instructors
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Instructor</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
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
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role / Title</label>
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
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                        id="bio"
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm text-gray-900"
                    />
                </div>

                <div>
                    <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">Certifications (comma separated)</label>
                    <input
                        type="text"
                        id="certifications"
                        value={certifications}
                        onChange={(e) => setCertifications(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand focus:border-brand sm:text-sm text-gray-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Current Profile Image</label>
                    {currentImageUrl && (
                        <div className="mt-2 relative h-32 w-32 rounded-lg overflow-hidden border border-gray-200">
                            <Image src={currentImageUrl} alt="Current" fill className="object-cover" />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Change Image (Optional)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand hover:text-brand-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand">
                                    <span>Upload new file</span>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    />
                                </label>
                            </div>
                            {file && <p className="text-sm font-semibold text-gray-900 mt-2">Selected: {file.name}</p>}
                        </div>
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
