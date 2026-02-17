
import { createClient } from '@/utils/supabase/server';
import { format } from 'date-fns';
import { Mail, Calendar } from 'lucide-react';

export default async function AdminMessages() {
    const supabase = await createClient();
    const { data: messages } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-semibold leading-6 text-gray-900">
                    Inbox
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {messages?.length || 0} Messages
                </span>
            </div>

            <div className="divide-y divide-gray-200">
                {messages && messages.length > 0 ? (
                    messages.map((msg: any) => (
                        <div key={msg.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-gray-900">{msg.name}</span>
                                    <span className="text-gray-400 text-sm">&bull;</span>
                                    <span className="text-gray-500 text-sm flex items-center">
                                        <Mail className="w-3 h-3 mr-1" />
                                        {msg.email}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {format(new Date(msg.created_at), 'MMM d, yyyy h:mm a')}
                                </div>
                            </div>
                            <div className="mt-2 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm leading-relaxed">
                                {msg.message}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center text-gray-500">
                        No messages received yet.
                    </div>
                )}
            </div>
        </div>
    );
}
