import { Metadata } from 'next';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | CleverSpaceSolutions',
  description: 'Get in touch with CleverSpace Solutions. Have a question about home organization, small space decor, or want to collaborate? We\'d love to hear from you.',
  alternates: {
    canonical: 'https://cleverspacesolutions.com/contact',
  },
  openGraph: {
    title: 'Contact | CleverSpaceSolutions',
    description: 'Get in touch with CleverSpace Solutions. Questions, collaborations, or just want to say hi — we respond within 48 hours.',
    url: 'https://cleverspacesolutions.com/contact',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Contact CleverSpaceSolutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | CleverSpaceSolutions',
    description: 'Get in touch with CleverSpace Solutions. Questions, collaborations, or just want to say hi — we respond within 48 hours.',
    images: ['/images/og-default.png'],
  },
  robots: 'index, follow',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-24 px-4">
      <div className="max-w-lg w-full text-center">

        <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-slate-400">
          Contact
        </span>
        <div className="h-px bg-slate-200 mt-3 mb-10" />

        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-4 tracking-tight">
          Get in Touch
        </h1>
        <p className="text-slate-500 leading-relaxed mb-12">
          For advertising, sponsorships, collaborations, or any inquiry —
          reach us directly by email.
        </p>

        <a
          href="mailto:cleverspacesolutions@gmail.com"
          className="inline-flex items-center gap-3 border border-slate-200 hover:border-slate-900 px-8 py-4 transition-colors group"
        >
          <Mail className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
          <span className="text-slate-700 group-hover:text-slate-900 transition-colors tracking-wide">
            cleverspacesolutions@gmail.com
          </span>
        </a>

        <p className="text-xs text-slate-400 mt-8 tracking-wide">
          We respond within 24–48 hours.
        </p>

      </div>
    </div>
  );
}
