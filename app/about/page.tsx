
'use client';

import { motion } from 'framer-motion';
import { Target, Award, Clock, ChevronRight, Linkedin, Twitter, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const timeline = [
    {
        year: '2005',
        title: 'The Beginning',
        desc: 'Founded with just 2 cars and a passion for road safety, Trinity Driving School opened its doors with a single location.',
    },
    {
        year: '2010',
        title: 'Growing Strong',
        desc: 'Expanded to 3 branches, grew our fleet to 15 vehicles, and surpassed our first 5,000 graduates.',
    },
    {
        year: '2016',
        title: 'National Recognition',
        desc: 'Awarded "Best Driving School" regionally. Introduced simulator-based training and advanced driving courses.',
    },
    {
        year: '2020',
        title: 'Digital Transformation',
        desc: 'Launched online theory classes and a mobile app. Adapted to new learning models while maintaining our high standards.',
    },
    {
        year: '2026',
        title: 'Leading the Way',
        desc: 'With 15,000+ graduates and a 98% pass rate, Trinity stands as the gold standard in driving education, now with 8 locations.',
    },
];

const instructors = [
    {
        name: 'David Kimani',
        role: 'Head Instructor',
        desc: '20+ years of experience. Specialized in defensive driving and advanced maneuver training.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    },
    {
        name: 'Sarah Wanjiku',
        role: 'Senior Instructor',
        desc: 'Specializes in beginner training with a patient, confidence-building approach to every lesson.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    },
    {
        name: 'Michael Oduor',
        role: 'Highway Specialist',
        desc: 'Highway and night driving expert with extensive experience in adverse condition training.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    },
    {
        name: 'Grace Muthoni',
        role: 'Theory & Safety Lead',
        desc: 'Road safety advocate leading our theory program, ensuring deep understanding of traffic laws.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    },
];

export default function AboutPage() {
    return (
        <div className="bg-[#0a0e17] text-white min-h-screen">
            {/* ══════════ HERO SECTION ══════════ */}
            <section className="relative h-[50vh] lg:h-[45vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/assets/hero.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17]/80 via-[#0a0e17]/70 to-[#0a0e17]" />

                <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-10">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 mb-6 text-sm"
                    >
                        <Link href="/" className="text-gray-400 hover:text-brand transition-colors">Home</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                        <span className="text-white font-medium">About Us</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight"
                    >
                        About <span className="text-brand">Trinity</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-gray-400 text-sm md:text-base mt-4 max-w-xl mx-auto"
                    >
                        Empowering drivers since 2005 with world-class instruction and a commitment to road safety excellence.
                    </motion.p>
                </div>

                {/* Curved bottom */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 80" fill="none" className="w-full">
                        <path d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z" fill="#0a0e17" />
                    </svg>
                </div>
            </section>

            {/* ══════════ WHO WE ARE + ACCREDITATION CARDS ══════════ */}
            <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Who We Are Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#0c1929] border border-[#1e3450] rounded-2xl p-8 text-center relative overflow-hidden group hover:border-brand/50 transition-colors shadow-xl"
                    >
                        {/* Subtle glow */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand/5 rounded-full blur-3xl group-hover:bg-brand/10 transition-colors" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center mx-auto mb-5">
                                <Target className="w-6 h-6 text-brand" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Who We Are</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Established with a mission to create safer roads, Trinity Driving School has been a leader in driver education for over a decade. We combine theoretical knowledge with practical experience to ensure our students become responsible drivers. Based at our Training Center in Nairobi, we serve students from across the city and beyond.
                            </p>
                        </div>
                    </motion.div>

                    {/* Accreditation & Values Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="bg-[#0c1929] border border-brand/30 rounded-2xl p-8 text-center relative overflow-hidden group hover:border-brand/50 transition-colors shadow-xl"
                    >
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand/5 rounded-full blur-3xl group-hover:bg-brand/10 transition-colors" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-full bg-brand flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Accreditation & Values</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                We are fully accredited by the National Transport and Safety Authority (NTSA) and our curriculum meets all regulatory standards. Our core values are <strong className="text-white">Safety</strong> — the safety of our students and the community is our top priority; <strong className="text-white">Excellence</strong> — we strive for the highest standards in instruction and customer service; and <strong className="text-white">Integrity</strong> — we operate with honesty and transparency in all our dealings.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══════════ TIMELINE SECTION ══════════ */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background image overlay */}
                <div className="absolute inset-0">
                    <Image
                        src="/assets/salooncar.jpg"
                        alt="Background"
                        fill
                        className="object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-transparent to-[#0a0e17]" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-5">
                            <Clock className="w-4 h-4 text-brand" />
                            <span className="text-xs font-bold text-brand tracking-widest uppercase">Our Journey</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            The Trinity <span className="text-brand">Story</span>
                        </h2>
                        <p className="text-gray-400 text-sm mt-3 max-w-lg mx-auto">
                            Two decades of transforming nervous beginners into confident, skilled drivers.
                        </p>
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand via-brand/50 to-brand/10" />

                        <div className="space-y-10">
                            {timeline.map((item, idx) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="relative pl-14 md:pl-16"
                                >
                                    {/* Dot on timeline */}
                                    <div className="absolute left-2.5 md:left-4.5 top-4 w-3 h-3 rounded-full bg-brand border-2 border-[#0a0e17] shadow-[0_0_8px_rgba(14,165,233,0.5)]" />

                                    {/* Card */}
                                    <div className="bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:border-brand/30 rounded-xl p-5 transition-all">
                                        <span className="inline-block px-3 py-0.5 rounded-full bg-brand text-white text-xs font-bold mb-3">
                                            {item.year}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1.5">{item.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ MEET OUR TEAM SECTION ══════════ */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-5">
                            <Users className="w-4 h-4 text-brand" />
                            <span className="text-xs font-bold text-brand tracking-widest uppercase">Our Team</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                            Meet Our <span className="text-brand">Expert Instructors</span>
                        </h2>
                        <p className="text-gray-500 text-sm mt-3">
                            Certified professionals dedicated to your driving success.
                        </p>
                    </motion.div>

                    {/* Instructor cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {instructors.map((inst, idx) => (
                            <motion.div
                                key={inst.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-[#0ea5e9] border border-[#0284c7] rounded-2xl p-6 text-center hover:shadow-2xl transition-all group shadow-lg"
                            >
                                {/* Photo */}
                                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white transition-colors">
                                    <Image
                                        src={inst.image}
                                        alt={inst.name}
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                </div>

                                <h4 className="text-white font-bold text-base mb-1">{inst.name}</h4>
                                <span className="inline-block px-3 py-0.5 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-bold tracking-wider uppercase mb-3">
                                    {inst.role}
                                </span>
                                <p className="text-white/90 text-xs leading-relaxed mb-4">{inst.desc}</p>

                                {/* Social icons */}
                                <div className="flex items-center justify-center gap-3">
                                    <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <Linkedin className="w-3.5 h-3.5 text-white" />
                                    </a>
                                    <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <Twitter className="w-3.5 h-3.5 text-white" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ WHAT WE STAND FOR ══════════ */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 mb-5">
                            <span className="text-brand text-sm">❤</span>
                            <span className="text-xs font-bold text-brand tracking-widest uppercase">Our Values</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                            What We <span className="text-brand">Stand For</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            {
                                num: '01',
                                title: 'Safety',
                                desc: 'The safety of our students and the community is our top priority. Every lesson emphasizes responsible road behaviour.',
                            },
                            {
                                num: '02',
                                title: 'Excellence',
                                desc: 'We strive for the highest standards in instruction and customer service. Our goal is your success.',
                            },
                            {
                                num: '03',
                                title: 'Integrity',
                                desc: 'We operate with honesty and transparency in all our dealings. No hidden fees, no shortcuts.',
                            },
                            {
                                num: '04',
                                title: 'NTSA Accreditation',
                                desc: 'Fully accredited by the National Transport and Safety Authority. Our curriculum meets all regulatory standards.',
                            },
                        ].map((val, idx) => (
                            <motion.div
                                key={val.num}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="bg-[#0c1929] border border-[#1e3450] rounded-xl p-6 hover:border-brand/50 transition-colors group shadow-lg"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="text-3xl md:text-4xl font-black text-brand/80 leading-none select-none">{val.num}</span>
                                    <div>
                                        <h3 className="text-base font-bold text-white mb-1.5">{val.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ CTA SECTION ══════════ */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0">
                    <Image
                        src="/assets/salooncar.jpg"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0a0e17]/85" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-[#0a0e17]/60" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4"
                    >
                        Ready to Start Your <span className="text-brand">Driving Journey?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-sm md:text-base mb-8"
                    >
                        Join 15,000+ confident graduates who trusted Trinity Driving School.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/enroll"
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand text-white font-bold text-sm shadow-[0_6px_20px_-6px_var(--color-brand)] hover:brightness-110 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                            </svg>
                            Enroll Now
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-gray-500 text-white font-bold text-sm hover:bg-white/5 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            View Services
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
