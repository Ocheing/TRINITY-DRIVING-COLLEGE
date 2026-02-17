'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between h-16 items-center">
                    {/* Left: Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="relative h-10 w-10 sm:h-12 sm:w-12 transition-transform group-hover:scale-105">
                                <Image
                                    src="/assets/logo.jpeg"
                                    alt="Trinity Driving College Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="font-bold text-lg sm:text-xl text-gray-900 ml-2 group-hover:text-brand transition-colors">
                                <span className="hidden sm:inline">Trinity Driving College</span>
                                <span className="sm:hidden">Trinity</span>
                            </span>
                        </Link>
                    </div>

                    {/* Center: Navigation Links (Desktop) - Visible on Large screens (lg) and up */}
                    <div className="hidden lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:flex lg:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors hover:text-brand ${pathname === link.href ? 'text-brand border-b-2 border-brand' : 'text-gray-500'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Actions (Desktop) - Visible on Large screens (lg) and up */}
                    <div className="hidden lg:flex lg:items-center gap-4">
                        <Link
                            href="/enroll"
                            className="bg-brand hover:bg-brand-dark text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        >
                            Enroll Now
                        </Link>
                    </div>

                    {/* Mobile/Tablet Menu Button - Visible on screens smaller than Large (lg) */}
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand transition-colors"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label="Toggle menu"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile/Tablet Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden bg-white border-b border-gray-200 overflow-hidden shadow-lg absolute w-full left-0 top-16 z-40"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${pathname === link.href
                                            ? 'text-brand bg-brand/10'
                                            : 'text-gray-700 hover:text-brand hover:bg-gray-50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 mt-4 border-t border-gray-100">
                                <Link
                                    href="/enroll"
                                    className="block w-full text-center bg-brand hover:bg-brand-dark text-white px-5 py-3 rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all"
                                >
                                    Enroll Now
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
