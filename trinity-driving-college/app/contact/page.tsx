
'use client';

import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const { error: insertError } = await supabase.from('contact_messages').insert([
                {
                    name,
                    email,
                    message
                }
            ]);

            if (insertError) throw insertError;

            setSuccess(true);
            setName('');
            setEmail('');
            setMessage('');
        } catch (e: any) {
            console.error('Error sending message:', e);
            setError(e.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-2">Get in Touch</h2>
                    <p className="text-xl text-brand font-semibold mb-6 italic">"TOGETHER LETS DRIVE"</p>
                    <p className="text-lg text-gray-500 mb-8">
                        Have questions about our courses or need to schedule a lesson? Our team is ready to assist you.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <Phone className="h-6 w-6 text-brand" />
                            </div>
                            <div className="ml-3 text-base text-gray-500">
                                <p>0722 999 309</p>
                                <p className="text-sm text-gray-400">Call & WhatsApp</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <Mail className="h-6 w-6 text-brand" />
                            </div>
                            <div className="ml-3 text-base text-gray-500">
                                <p>Trinitydriving23@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <MapPin className="h-6 w-6 text-brand" />
                            </div>
                            <div className="ml-3 text-base text-gray-500">
                                <p>Moi Drive</p>
                                <p>Nairobi, Kenya</p>
                            </div>
                        </div>

                        <a href="https://instagram.com/TRINITY.DRIVING.SCHOOL" target="_blank" rel="noopener noreferrer" className="flex items-start group">
                            <div className="flex-shrink-0">
                                <Instagram className="h-6 w-6 text-brand group-hover:text-pink-600 transition-colors" />
                            </div>
                            <div className="ml-3 text-base text-gray-500 group-hover:text-pink-600 transition-colors">
                                <p>@TRINITY.DRIVING.SCHOOL</p>
                            </div>
                        </a>

                        <a href="https://facebook.com/TrinityDrivingSchool" target="_blank" rel="noopener noreferrer" className="flex items-start group">
                            <div className="flex-shrink-0">
                                <Facebook className="h-6 w-6 text-brand group-hover:text-blue-600 transition-colors" />
                            </div>
                            <div className="ml-3 text-base text-gray-500 group-hover:text-blue-600 transition-colors">
                                <p>Trinity Driving School</p>
                            </div>
                        </a>

                        <a href="https://www.tiktok.com/@trinity_driving_school" target="_blank" rel="noopener noreferrer" className="flex items-start group">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-6 w-6 text-brand group-hover:text-black transition-colors"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </div>
                            <div className="ml-3 text-base text-gray-500 group-hover:text-black transition-colors">
                                <p>@trinity_driving_school</p>
                            </div>
                        </a>
                    </div>

                    <div className="mt-8 h-80 bg-gray-300 rounded-lg overflow-hidden shadow-md">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src="https://maps.google.com/maps?q=Moi+Drive,+Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            title="Trinity Driving School Location"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 h-fit">
                    {success ? (
                        <div className="text-center py-8">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Message Sent!</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Thank you for contacting us. We will get back to you shortly.
                            </p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="mt-4 text-brand hover:text-brand-dark font-medium"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="shadow-sm focus:ring-brand focus:border-brand block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="shadow-sm focus:ring-brand focus:border-brand block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="shadow-sm focus:ring-brand focus:border-brand block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100">
                                    {error}
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-colors`}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
