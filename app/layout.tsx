import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsletterPopup from '@/components/ui/newsletter-popup';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NishBlog',
  description: 'Modern ve minimalist blog sitesi',
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
    <html lang="tr">
      <body className={inter.className}>
        <Header />
        <main className="pt-16 min-h-screen bg-slate-50">
          {children}
        </main>
        <Footer />
        <NewsletterPopup />
      </body>
    </html>
  );
}