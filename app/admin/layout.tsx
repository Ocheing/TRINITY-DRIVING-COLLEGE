
import Link from 'next/link';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Mail,
    Image as ImageIcon,
    DollarSign,
    MessageSquareQuote
} from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-xl flex flex-col fixed inset-y-0">
                <div className="p-6 border-b border-gray-200">
                    <Link href="/" className="text-xl font-bold text-brand flex items-center">
                        <span className="bg-brand text-white p-1 rounded mr-2">T</span>
                        Trinity Admin
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
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
                            <span className="h-5 w-5 mr-3 flex items-center justify-center">🌐</span>
                            <span className="font-medium">View Website</span>
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    {/* Ideally logout button logic here */}
                    <div className="flex items-center px-4 py-2 text-sm text-gray-500">
                        <span>Admin User</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 p-8 overflow-y-auto">
                <header className="mb-8 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
                    {/* User profile or actions */}
                </header>
                {children}
            </div>
        </div>
    );
}
