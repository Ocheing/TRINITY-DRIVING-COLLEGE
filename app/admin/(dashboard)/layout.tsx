import Link from 'next/link';
import Image from 'next/image';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Mail,
    Image as ImageIcon,
    DollarSign,
    MessageSquareQuote,
    LogOut,
    ExternalLink,
} from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { adminSignOut } from '../actions';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const adminEmail = user?.email ?? 'Admin';

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl flex flex-col fixed inset-y-0">
                <div className="p-6 border-b border-gray-200">
                    <Link href="/" className="text-xl font-bold text-gray-900 flex items-center group">
                        <div className="relative h-10 w-10 mr-3 rounded-full overflow-hidden transition-transform group-hover:scale-105 border border-brand/10">
                            <Image
                                src="/assets/logo.jpeg"
                                alt="Trinity Driving School Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="group-hover:text-brand transition-colors">Trinity<span className="text-brand">Admin</span></span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    <Link href="/admin" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand rounded-md transition-colors">
                        <LayoutDashboard className="h-5 w-5 mr-3" />
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    <Link href="/admin/enrollments" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand rounded-md transition-colors">
                        <Users className="h-5 w-5 mr-3" />
                        <span className="font-medium">Enrollments</span>
                    </Link>

                    <Link href="/admin/courses" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand rounded-md transition-colors">
                        <BookOpen className="h-5 w-5 mr-3" />
                        <span className="font-medium">Courses</span>
                    </Link>

                    <Link href="/admin/pricing" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand rounded-md transition-colors">
                        <DollarSign className="h-5 w-5 mr-3" />
                        <span className="font-medium">Pricing</span>
                    </Link>

                    <Link href="/admin/messages" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand rounded-md transition-colors">
                        <Mail className="h-5 w-5 mr-3" />
                        <span className="font-medium">Messages</span>
                    </Link>

                    <Link href="/admin/gallery" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand rounded-md transition-colors">
                        <ImageIcon className="h-5 w-5 mr-3" />
                        <span className="font-medium">Gallery</span>
                    </Link>

                    <Link href="/admin/instructors" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand rounded-md transition-colors">
                        <Users className="h-5 w-5 mr-3" />
                        <span className="font-medium">Instructors</span>
                    </Link>

                    <Link href="/admin/testimonials" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand rounded-md transition-colors">
                        <MessageSquareQuote className="h-5 w-5 mr-3" />
                        <span className="font-medium">Testimonials</span>
                    </Link>

                    <div className="my-4 border-t border-gray-200 pt-4">
                        <Link href="/" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-brand rounded-md transition-colors">
                            <ExternalLink className="h-5 w-5 mr-3" />
                            <span className="font-medium">View Website</span>
                        </Link>
                    </div>
                </nav>

                {/* User info + Logout */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-sm shrink-0">
                            {adminEmail[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">Administrator</p>
                            <p className="text-[11px] text-gray-500 truncate">{adminEmail}</p>
                        </div>
                    </div>
                    <form action={adminSignOut}>
                        <button
                            type="submit"
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 p-8 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
