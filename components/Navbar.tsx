
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between h-16 items-center">
                    {/* Left: Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
                            <div className="relative h-12 w-12 transition-transform group-hover:scale-105">
                                <Image
                                    src="/assets/logo.jpeg"
                                    alt="Trinity Driving College Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="font-bold text-lg text-gray-900 hidden lg:block ml-2 group-hover:text-brand transition-colors">
                                Trinity Driving College
                            </span>
                        </Link>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="hidden sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:flex sm:space-x-8">
                        <Link href="/" className="text-gray-900 hover:text-brand inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                            Home
                        </Link>
                        <Link href="/about" className="text-gray-500 hover:text-brand inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                            About
                        </Link>
                        <Link href="/services" className="text-gray-500 hover:text-brand inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                            Services
                        </Link>
                        <Link href="/pricing" className="text-gray-500 hover:text-brand inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                            Pricing
                        </Link>
                        <Link href="/contact" className="text-gray-500 hover:text-brand inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="hidden sm:flex sm:items-center gap-4">

                        <Link href="/enroll" className="bg-brand hover:bg-brand-dark text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                            Enroll Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
