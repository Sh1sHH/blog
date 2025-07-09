import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CleverSpace Solutions',
  description: 'Our Privacy Policy explains how we collect, use, and protect your personal information in compliance with GDPR, CCPA, and other privacy laws.',
  robots: 'index, follow',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                CleverSpace Solutions ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                cleverspacesolutions.com and use our services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This policy complies with the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), 
                and other applicable privacy laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Contact information (name, email address, phone number)</li>
                <li>Comments and feedback on blog posts</li>
                <li>Newsletter subscription information</li>
                <li>Inquiry forms and contact requests</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Information Automatically Collected</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>IP address and browser information</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referral sources and search terms</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>To provide and maintain our website and services</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To send newsletters and marketing communications (with your consent)</li>
                <li>To analyze website usage and improve our content</li>
                <li>To prevent fraud and enhance security</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Legal Basis for Processing (GDPR)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We process your personal data based on:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Consent:</strong> When you subscribe to newsletters or contact us</li>
                <li><strong>Legitimate Interest:</strong> To analyze website usage and improve services</li>
                <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
                <li><strong>Contract Performance:</strong> To provide requested services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Service Providers:</strong> Google Analytics, email service providers, hosting services</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Improve website functionality and performance</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can control cookies through your browser settings. For more information, see our 
                <a href="/cookie-policy" className="text-blue-600 hover:text-blue-800 underline"> Cookie Policy</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 GDPR Rights (EU Residents)</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Access:</strong> Request copies of your personal data</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Restriction:</strong> Request limitation of data processing</li>
                <li><strong>Objection:</strong> Object to data processing based on legitimate interest</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">7.2 CCPA Rights (California Residents)</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Know:</strong> Right to know what personal information is collected</li>
                <li><strong>Delete:</strong> Right to delete personal information</li>
                <li><strong>Opt-Out:</strong> Right to opt-out of sale of personal information</li>
                <li><strong>Non-Discrimination:</strong> Right to equal service and pricing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal data against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
                the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your personal data only as long as necessary for the purposes outlined in this policy, 
                or as required by law. When data is no longer needed, we securely delete or anonymize it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your data may be transferred to and processed in countries other than your residence. 
                We ensure appropriate safeguards are in place for such transfers in accordance with applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website is not intended for children under 16 years of age. We do not knowingly collect 
                personal information from children under 16. If you are a parent and believe your child has 
                provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@cleverspacesolutions.com</p>
                <p className="text-gray-700 mb-2"><strong>Address:</strong> [Your Business Address]</p>
                <p className="text-gray-700"><strong>Response Time:</strong> We will respond to your request within 30 days</p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                This Privacy Policy is compliant with GDPR, CCPA, and other applicable privacy laws. 
                For specific legal advice, please consult with a qualified attorney.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 