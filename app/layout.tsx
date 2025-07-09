import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://cleverspacesolutions.com'),
  title: 'CleverSpaceSolutions - Reclaim Your Space!',
  description: 'Tired of clutter? Discover clever storage solutions & organization ideas for small spaces. Turn your tiny home into a tidy, organized oasis. Reclaim your space!',
  keywords: ['storage solutions', 'small spaces', 'organization', 'home organization', 'space saving', 'declutter', 'tiny home', 'clever storage'],
  authors: [{ name: 'CleverSpace Editorial Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cleverspacesolutions.com',
    siteName: 'CleverSpaceSolutions',
    title: 'CleverSpaceSolutions - Reclaim Your Space!',
    description: 'Tired of clutter? Discover clever storage solutions & organization ideas for small spaces. Turn your tiny home into a tidy, organized oasis.',
    images: [
      {
        url: '/images/navbar/logo2.webp',
        width: 1200,
        height: 630,
        alt: 'CleverSpaceSolutions - Storage Solutions for Small Spaces',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cleverspacesolutions',
    creator: '@cleverspacesolutions',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD structured data for homepage - English only
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CleverSpaceSolutions",
    "url": "https://cleverspacesolutions.com",
    "logo": "https://cleverspacesolutions.com/images/navbar/logo2.webp",
    "description": "Tired of clutter? Discover clever storage solutions & organization ideas for small spaces. Turn your tiny home into a tidy, organized oasis. Reclaim your space!",
    "slogan": "Reclaim your space!",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CleverSpaceSolutions",
    "url": "https://cleverspacesolutions.com",
    "description": "Tired of clutter? Discover clever storage solutions & organization ideas for small spaces. Turn your tiny home into a tidy, organized oasis.",
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://cleverspacesolutions.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Website JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="pt-16 min-h-screen bg-slate-50">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}