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
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between h-16 items-center">
                    {/* Left: Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="relative h-10 w-10 sm:h-12 sm:w-12 transition-transform group-hover:scale-105 rounded-full overflow-hidden">
                                <Image
                                    src="/assets/logo.jpeg"
                                    alt="Trinity Driving School Logo"
                                    fill
                                    className="object-cover mix-blend-multiply"
                                    priority
                                />
                            </div>
                            <span className="font-bold text-lg sm:text-xl text-[#800000] ml-2 group-hover:text-accent-dark transition-colors">
                                Trinity<span className="text-gray-900">DS</span>
                            </span>
                        </Link>
                    </div>

                    {/* Center: Navigation Links (Desktop) - Visible on Large screens (lg) and up */}
                    <div className="hidden lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:flex lg:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`inline-flex items-center px-1 pt-1 text-sm font-bold transition-colors hover:text-[#5c0000] ${pathname === link.href ? 'text-[#5c0000] border-b-2 border-[#800000]' : 'text-[#800000]'
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
                            className="bg-[#800000] hover:bg-[#5c0000] text-white px-7 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-[0_8px_20px_-6px_#800000] hover:shadow-[0_12px_25px_-8px_#5c0000] transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Enroll Now
                        </Link>
                    </div>

                    {/* Mobile/Tablet Menu Button - Visible on screens smaller than Large (lg) */}
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-accent hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent transition-colors"
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
                        className="lg:hidden bg-white border-b border-gray-100 overflow-hidden shadow-lg absolute w-full left-0 top-16 z-40"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-3 py-3 rounded-md text-base font-bold transition-colors ${pathname === link.href
                                        ? 'text-[#5c0000] bg-[#800000]/10'
                                        : 'text-[#800000] hover:text-[#5c0000] hover:bg-[#800000]/5'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 mt-4 border-t border-gray-100">
                                <Link
                                    href="/enroll"
                                    className="block w-full text-center bg-[#800000] hover:bg-[#5c0000] text-white px-5 py-3.5 rounded-xl text-base font-bold tracking-wide shadow-[0_8px_20px_-6px_#800000] hover:shadow-[0_12px_25px_-8px_#5c0000] transition-all duration-300"
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
