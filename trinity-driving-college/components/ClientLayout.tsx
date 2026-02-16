
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Hide public nav/footer on admin routes and login auth pages if desired
    const isStandalone = pathname?.startsWith('/admin') || pathname?.startsWith('/login') || pathname?.startsWith('/signup');

    return (
        <div className="flex flex-col min-h-screen">
            {!isStandalone && <Navbar />}
            <main className={`flex-grow ${isStandalone ? 'h-full' : ''}`}>
                {children}
            </main>
            {!isStandalone && <Footer />}
        </div>
    );
}
