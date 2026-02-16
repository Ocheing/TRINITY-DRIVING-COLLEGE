
import { createClient } from '@/utils/supabase/server';
import EnrollmentsTable from '@/components/EnrollmentsTable';

export default async function AdminEnrollments() {
    const supabase = await createClient();
    const { data: enrollments } = await supabase
        .from('enrollments')
        .select(`
            *,
            courses (title, price)
        `)
        .order('created_at', { ascending: false });

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Manage Enrollments</h1>
                <p className="mt-1 text-sm text-gray-500">View and manage student applications.</p>
            </div>

            <EnrollmentsTable enrollments={enrollments || []} />
        </div>
    );
}
