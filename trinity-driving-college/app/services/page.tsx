
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Car, Truck, Bike, Users } from 'lucide-react';

export default async function ServicesPage() {
    // In a real implementation, we would fetch these from the database
    // const supabase = createClient();
    // const { data: services } = await supabase.from('services').select('*');

    const serviceCategories = [
        {
            id: 'category-a',
            title: 'Category A – Motorcycle Category',
            description: 'Comprehensive training for all types of motorcycles and three-wheelers.',
            icon: Bike,
            items: [
                { code: 'A2', name: 'Motorcycle', description: 'Standard motorcycle riding lessons' },
                { code: 'A3', name: 'Three Wheelers (TukTuk)', description: 'Professional TukTuk operation' },
            ]
        },
        {
            id: 'category-b',
            title: 'Category B – Saloon Cars',
            description: 'Master the art of driving light vehicles with our expert instructors.',
            icon: Car,
            items: [
                { code: 'B1', name: 'Light Vehicle (Automatic)', description: 'Automatic transmission training' },
                { code: 'B2', name: 'Light Vehicle (Manual)', description: 'Manual transmission training' },
            ]
        },
        {
            id: 'category-c',
            title: 'Category C – Trucks',
            description: 'Professional truck driving courses for commercial careers.',
            icon: Truck,
            items: [
                { code: 'C1', name: 'Light Trucks', description: 'Training for light commercial trucks' },
                { code: 'C2', name: 'Medium Trucks', description: 'Training for medium-sized trucks' },
            ]
        },
        {
            id: 'category-d',
            title: 'Category D – PSV',
            description: 'Public Service Vehicle training for professional drivers.',
            icon: Users,
            items: [
                { code: 'B3', name: 'Professional 7-Seater', description: 'For professional taxi/shuttle services' },
                { code: 'D1', name: '14-Seater', description: 'Matatu and van operation' },
                { code: 'D2', name: '33-Seater', description: 'Mini-bus operation' },
            ]
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
                        Our Services
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        We offer a comprehensive range of driving courses tailored to your professional needs, from motorcycles to heavy commercial vehicles.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {serviceCategories.map((category) => (
                        <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="p-8">
                                <div className="flex items-center mb-6">
                                    <div className="p-3 bg-brand/10 rounded-full mr-4">
                                        <category.icon className="h-8 w-8 text-brand" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                                </div>
                                <p className="text-gray-600 mb-6">{category.description}</p>

                                <div className="space-y-4">
                                    {category.items.map((item) => (
                                        <div key={item.code} className="border-l-4 border-brand pl-4 py-2 bg-gray-50 rounded-r-md">
                                            <div className="flex items-baseline justify-between">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    <span className="text-brand mr-2">{item.code}</span>
                                                    {item.name}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                                <Link href="/enroll" className="text-brand font-medium hover:text-brand-dark flex items-center">
                                    Enroll in this category <span aria-hidden="true" className="ml-2">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
