'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, MapPin, Phone, Mail, Key, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');
        setMessage('');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setStatus('success');
            setMessage('Thank you for subscribing!');
            setEmail('');
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Failed to subscribe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-gray-900 text-white border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="relative h-10 w-10">
                                <Image
                                    src="/assets/logo.jpeg"
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold">Trinity Driving</h3>
                        </div>
                        <p className="text-brand font-semibold italic mb-2">"TOGETHER LETS DRIVE"</p>
                        <p className="text-gray-400 text-sm">
                            Professional driving instruction for safe and confident drivers. Licensed and accredited.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <Link href="https://facebook.com/TrinityDrivingSchool" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-6 w-6" />
                            </Link>
                            <Link href="https://www.tiktok.com/@trinity_driving_school" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                                <svg
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </Link>
                            <Link href="https://instagram.com/TRINITY.DRIVING.SCHOOL" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                                <Instagram className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-400 hover:text-brand transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-brand transition-colors">Services</Link></li>
                            <li><Link href="/pricing" className="text-gray-400 hover:text-brand transition-colors">Pricing</Link></li>
                            <li><Link href="/instructors" className="text-gray-400 hover:text-brand transition-colors">Instructors</Link></li>
                            <li><Link href="/gallery" className="text-gray-400 hover:text-brand transition-colors">Gallery</Link></li>
                            <li><Link href="/testimonials" className="text-gray-400 hover:text-brand transition-colors">Testimonials</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="h-6 w-6 text-brand mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-400">Moi Drive, Nairobi, Kenya</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-brand mr-2 flex-shrink-0" />
                                <a href="tel:+254722999309" className="text-gray-400 hover:text-white transition-colors">0722 999 309</a>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-brand mr-2 flex-shrink-0" />
                                <a href="mailto:Trinitydriving23@gmail.com" className="text-gray-400 hover:text-white transition-colors break-all">Trinitydriving23@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
                        <p className="text-gray-400 mb-4 text-sm">Subscribe to our newsletter for tips, updates, and special offers.</p>
                        <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all placeholder-gray-500 text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand hover:bg-brand-dark text-white px-4 py-2.5 rounded-md font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                        Subscribing...
                                    </>
                                ) : (
                                    'Subscribe Now'
                                )}
                            </button>

                            {status === 'success' && (
                                <div className="flex items-center text-green-400 text-sm mt-2 animate-in fade-in slide-in-from-top-1">
                                    <CheckCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
                                    <span>{message}</span>
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="flex items-center text-red-400 text-sm mt-2 animate-in fade-in slide-in-from-top-1">
                                    <XCircle className="h-4 w-4 mr-1.5 flex-shrink-0" />
                                    <span>{message}</span>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Trinity Driving College. All rights reserved.</p>
                    <div className="flex items-center mt-4 md:mt-0 space-x-4">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <span className="text-gray-700">|</span>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/login" className="ml-4 text-gray-600 hover:text-white transition-colors opacity-50 hover:opacity-100 p-1" aria-label="Admin Login">
                            <Key className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
