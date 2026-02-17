
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trinity Driving College',
  description: 'Professional driving instruction and certification in Kenya.',
  openGraph: {
    title: 'Trinity Driving College',
    description: 'Learn to drive safely and confidently with our expert instructors.',
    url: 'https://trinitydriving.co.ke',
    siteName: 'Trinity Driving College',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Trinity Driving College',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
