
'use client';

import { motion } from 'framer-motion';
import { Users, Award, Calendar, Car } from 'lucide-react';


const stats = [
    { id: 1, name: 'Students Trained', value: '5,000+', icon: Users },
    { id: 2, name: 'Certified Instructors', value: '50+', icon: Award },
    { id: 3, name: 'Years of Experience', value: '15+', icon: Calendar },
    { id: 4, name: 'Vehicles', value: '30+', icon: Car },
];

export default function Stats() {
    return (
        <div className="bg-brand pt-12 sm:pt-16 pb-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute left-0 bottom-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
                        Trusted by Thousands of Drivers
                    </h2>
                    <p className="text-2xl text-white/90 font-medium italic">
                        "We deliver results that speak for themselves."
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: stat.id * 0.1 }}
                            className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-colors"
                        >
                            <div className="p-3 bg-white/20 rounded-full mb-4 text-white">
                                <stat.icon className="h-8 w-8" />
                            </div>
                            <dd className="text-4xl font-extrabold text-white mb-2">
                                {stat.value}
                            </dd>
                            <dt className="text-sm font-medium text-blue-100 uppercase tracking-wide">
                                {stat.name}
                            </dt>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
