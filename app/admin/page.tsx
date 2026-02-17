
import { createClient } from '@/utils/supabase/server';
import { Users, BookOpen, Mail, DollarSign } from 'lucide-react';

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Fetch real counts if tables exist, otherwise 0
    const { count: enrollmentsCount } = await supabase.from('enrollments').select('*', { count: 'exact', head: true });
    const { count: coursesCount } = await supabase.from('courses').select('*', { count: 'exact', head: true });
    const { count: messagesCount } = await supabase.from('contact_messages').select('*', { count: 'exact', head: true });

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stat Card 1 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-blue-50 text-brand">
                        <Users className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-gray-500 text-sm font-medium">Total Enrollments</h3>
                        <p className="mt-1 text-2xl font-bold text-gray-900">{enrollmentsCount || 0}</p>
                    </div>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-green-50 text-green-600">
                        <BookOpen className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-gray-500 text-sm font-medium">Active Courses</h3>
                        <p className="mt-1 text-2xl font-bold text-gray-900">{coursesCount || 0}</p>
                    </div>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-yellow-50 text-yellow-600">
                        <Mail className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-gray-500 text-sm font-medium">New Messages</h3>
                        <p className="mt-1 text-2xl font-bold text-gray-900">{messagesCount || 0}</p>
                    </div>
                </div>

                {/* Stat Card 4 */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                        <DollarSign className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                        <p className="mt-1 text-2xl font-bold text-gray-900">KES 0</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Enrollments</h3>
                    <div className="text-gray-500 text-sm text-center py-8">No recent enrollments found.</div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Messages</h3>
                    <div className="text-gray-500 text-sm text-center py-8">No new messages.</div>
                </div>
            </div>
        </div>
    );
}
