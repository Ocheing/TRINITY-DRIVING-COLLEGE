
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Link from 'next/link';
import type { Course } from '@/types';

// Dynamically import components that are below the fold
const Stats = dynamic(() => import('@/components/Stats'), {
  loading: () => <div className="h-48 bg-gray-50 animate-pulse" />,
});
const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});
const FeaturedCourses = dynamic(() => import('@/components/FeaturedCourses'), {
  loading: () => <div className="h-[600px] bg-gray-50 animate-pulse" />,
});
const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />,
});

export const metadata: Metadata = {
  title: 'Trinity Driving College - Home',
  description: 'Learn to drive with confidence at Trinity Driving College. Expert instructors, modern fleet, and flexible scheduling.',
};

// Placeholder data for featured courses
const featuredCoursesData: Course[] = [
  {
    id: 'category-a',
    title: 'Category A – Motorcycles',
    description: 'Comprehensive training for all types of motorcycles (A2) and three-wheelers (A3). Ideal for personal and commercial riders.',
    price: 7500,
    duration: '20 Lessons',
    image_url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80',
    is_published: true
  },
  {
    id: 'category-b',
    title: 'Category B – Light Vehicles',
    description: 'Master driving saloon cars with our expert instruction. Choose between Automatic (B1) or Manual (B2) transmission.',
    price: 12500,
    duration: '30 Lessons',
    image_url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80',
    is_published: true
  },
  {
    id: 'category-c',
    title: 'Category C – Trucks',
    description: 'Professional training for light and medium trucks. Gain the skills needed for a career in commercial transport.',
    price: 13000,
    duration: 'Variable',
    image_url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80',
    is_published: true
  }
];

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <Stats />
      <Features />
      <div className="bg-gray-50/50">
        <FeaturedCourses courses={featuredCoursesData} />
      </div>
      <Testimonials />

      {/* Modern CTA Section */}
      <div className="relative bg-brand py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-dot-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white mb-6 sm:text-5xl drop-shadow-md">
            Ready to start your journey?
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-white font-medium mb-10 drop-shadow-sm">
            Book your first lesson today and experience the difference of professional instruction.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/enroll"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-brand bg-white hover:bg-gray-50 hover:scale-105 transform transition-all shadow-lg"
            >
              Enroll Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
