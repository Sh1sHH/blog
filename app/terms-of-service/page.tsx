import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | CleverSpace Solutions',
  description: 'Our Terms of Service outline the rules and regulations for using CleverSpace Solutions website and services.',
  robots: 'index, follow',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using CleverSpace Solutions website (cleverspacesolutions.com), you accept and agree 
                to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service ("Terms") govern your use of our website and services operated by 
                CleverSpace Solutions ("us", "we", or "our").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                CleverSpace Solutions provides interior design inspiration, home organization tips, and lifestyle content 
                through our blog and website. Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Blog articles and design inspiration content</li>
                <li>Home organization and decorating tips</li>
                <li>Product recommendations and reviews</li>
                <li>Newsletter and email communications</li>
                <li>Community features and commenting system</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Use the service in any way that violates applicable laws or regulations</li>
                <li>Post or transmit any harmful, offensive, or inappropriate content</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Engage in any form of harassment, abuse, or spam</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated systems to access the service without permission</li>
                <li>Copy, reproduce, or distribute our content without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Content</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you post comments, feedback, or other content on our website, you grant us a non-exclusive, 
                royalty-free, perpetual, and worldwide license to use, modify, and display such content in connection 
                with our service.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">You represent and warrant that:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>You own or have the necessary rights to the content you post</li>
                <li>Your content does not infringe on the rights of others</li>
                <li>Your content does not violate any applicable laws</li>
                <li>Your content is accurate and not misleading</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on this website, including but not limited to text, graphics, logos, images, audio clips, 
                digital downloads, and software, is the property of CleverSpace Solutions or its content suppliers and 
                is protected by copyright laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of the service without 
                express written permission from us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of 
                the service, to understand our practices. You can find our Privacy Policy at 
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline"> cleverspacesolutions.com/privacy-policy</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Disclaimers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
                CleverSpace Solutions:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Excludes all representations and warranties relating to this website and its contents</li>
                <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
                <li>Does not guarantee the accuracy, completeness, or timeliness of the information</li>
                <li>Does not warrant that the website will be available or error-free</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                In no event shall CleverSpace Solutions, its officers, directors, employees, or agents be liable to you 
                or any third party for any direct, indirect, consequential, incidental, special, or punitive damages, 
                including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental 
                damages, so the above limitation may not apply to you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to defend, indemnify, and hold harmless CleverSpace Solutions and its affiliates from and against 
                any claims, actions, or demands, including reasonable legal fees, arising out of or relating to your use 
                of the website, your violation of these Terms, or your violation of any rights of another.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Affiliate Links and Advertising</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website may contain affiliate links to third-party products and services. When you click on these 
                links and make a purchase, we may receive a commission at no additional cost to you.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We only recommend products and services that we believe will add value to our readers. However, 
                we are not responsible for the content, privacy policies, or practices of these third-party sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our service may contain links to third-party websites or services that are not owned or controlled by 
                CleverSpace Solutions. We have no control over and assume no responsibility for the content, privacy 
                policies, or practices of any third-party websites or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your access immediately, without prior notice or liability, for any reason 
                whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Upon termination, your right to use the service will cease immediately. All provisions of the Terms 
                which by their nature should survive termination shall survive termination.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of the United States and the state where 
                CleverSpace Solutions is incorporated, without regard to conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any disputes arising out of or relating to these Terms or the use of our service shall be resolved through:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Informal Resolution:</strong> Direct communication between the parties</li>
                <li><strong>Mediation:</strong> Non-binding mediation if informal resolution fails</li>
                <li><strong>Arbitration:</strong> Binding arbitration in accordance with applicable rules</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
                try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By continuing to access or use our service after those revisions become effective, you agree to be 
                bound by the revised terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Severability</h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed 
                and interpreted to accomplish the objectives of such provision to the greatest extent possible under 
                applicable law and the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@cleverspacesolutions.com</p>
                <p className="text-gray-700 mb-2"><strong>Address:</strong> [Your Business Address]</p>
                <p className="text-gray-700"><strong>Response Time:</strong> We will respond to your inquiry within 48 hours</p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                These Terms of Service are compliant with US federal and state laws. For specific legal advice, 
                please consult with a qualified attorney.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 