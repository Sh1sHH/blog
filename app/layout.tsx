import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterPopup from '@/components/ui/newsletter-popup';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ContentHub - Your Source for Quality Content & Reviews',
  description: 'Discover insightful articles, comprehensive reviews, and expert recommendations on technology, lifestyle, and more.',
  keywords: ['blog', 'reviews', 'technology', 'lifestyle', 'guides', 'recommendations'],
  authors: [{ name: 'ContentHub Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://contenthub.com',
    siteName: 'ContentHub',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'ContentHub - Quality Content & Reviews',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@contenthub',
    creator: '@contenthub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <NewsletterPopup />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}