
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Key } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                            <Link href="https://facebook.com/TrinityDrivingSchool" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-6 w-6" />
                            </Link>
                            <Link href="https://www.tiktok.com/@trinity_driving_school" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
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
                            <Link href="https://instagram.com/TRINITY.DRIVING.SCHOOL" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                                <Instagram className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white">About Us</Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-400 hover:text-white">Services</Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
                            </li>
                            <li>
                                <Link href="/instructors" className="text-gray-400 hover:text-white">Instructors</Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="text-gray-400 hover:text-white">Gallery</Link>
                            </li>
                            <li>
                                <Link href="/testimonials" className="text-gray-400 hover:text-white">Testimonials</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="h-6 w-6 text-brand mr-2 mt-1" />
                                <span className="text-gray-400">Moi Drive, Nairobi, Kenya</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-brand mr-2" />
                                <span className="text-gray-400">0722 999 309</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-brand mr-2" />
                                <span className="text-gray-400">Trinitydriving23@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">Subscribe to our newsletter for tips and updates.</p>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Check your email"
                                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-brand"
                            />
                            <button
                                type="submit"
                                className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded font-medium transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Trinity Driving College. All rights reserved.
                    <Link href="/login" className="ml-2 text-gray-500 hover:text-white transition-colors opacity-20 hover:opacity-100 inline-flex items-center" aria-label="Admin Login">
                        <Key className="w-3 h-3" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
