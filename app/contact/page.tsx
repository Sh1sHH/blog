import { Metadata } from 'next';
import { Mail, Clock, MessageSquare } from 'lucide-react';

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
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Have a question about small space living? Want to collaborate or share your story?
            We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl py-16">
        <div className="grid md:grid-cols-2 gap-16">

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-8">Send a Message</h2>
            <form
              action="https://formsubmit.co/cleverspacesolutions@gmail.com"
              method="POST"
              className="space-y-6"
            >
              {/* Honeypot spam protection */}
              <input type="text" name="_honey" className="hidden" />
              {/* Disable captcha */}
              <input type="hidden" name="_captcha" value="false" />
              {/* Thank you page redirect */}
              <input type="hidden" name="_next" value="https://cleverspacesolutions.com/contact?sent=true" />
              <input type="hidden" name="_subject" value="New message from CleverSpaceSolutions.com" />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 bg-white"
                >
                  <option value="" disabled selected>Select a topic...</option>
                  <option value="General Question">General Question</option>
                  <option value="Collaboration / Partnership">Collaboration / Partnership</option>
                  <option value="Content Suggestion">Content Suggestion</option>
                  <option value="Advertising Inquiry">Advertising Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 active:bg-gray-950 transition-colors"
              >
                Send Message
              </button>

              <p className="text-xs text-gray-500 text-center">
                We typically respond within 24–48 hours.
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-8">Other Ways to Reach Us</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:cleverspacesolutions@gmail.com"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      cleverspacesolutions@gmail.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">For collaborations and press inquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Response Time</h3>
                    <p className="text-gray-600">Within 24–48 hours</p>
                    <p className="text-sm text-gray-500 mt-1">Monday through Friday</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Social Media</h3>
                    <div className="flex gap-4 mt-2">
                      <a
                        href="https://pinterest.com/cleverspacesolutions/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Pinterest
                      </a>
                      <a
                        href="https://www.instagram.com/cleverspacesolutions/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Instagram
                      </a>
                      <a
                        href="https://www.tiktok.com/@cleverspacesolutions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        TikTok
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ mini */}
            <div className="border-t border-gray-100 pt-10">
              <h3 className="font-medium text-gray-900 mb-6">Common Questions</h3>
              <div className="space-y-5">
                <div>
                  <p className="font-medium text-gray-900 text-sm mb-1">Do you accept guest posts?</p>
                  <p className="text-sm text-gray-600">Yes! We welcome high-quality, original content about small space living and home organization. Reach out with your idea first.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm mb-1">Do you do brand collaborations?</p>
                  <p className="text-sm text-gray-600">We partner with brands that genuinely fit our audience's needs — home organization, storage, and small space living products. Get in touch to discuss.</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm mb-1">Can I share my small space story?</p>
                  <p className="text-sm text-gray-600">Absolutely. We love hearing real stories from real people. Send us a message and tell us about your space.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
