import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | CleverSpace Solutions',
  description: 'Learn about how CleverSpace Solutions uses cookies and similar technologies to improve your browsing experience.',
  robots: 'index, follow',
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This Cookie Policy explains how CleverSpace Solutions ("we," "our," or "us") uses cookies and similar 
                technologies when you visit our website cleverspacesolutions.com (the "Service").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Why We Use Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We use cookies for several important reasons:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Essential Functionality:</strong> Some cookies are essential for you to be able to experience the full functionality of our site</li>
                <li><strong>Analytics:</strong> We use cookies to understand how visitors interact with our website</li>
                <li><strong>Personalization:</strong> Cookies help us remember your preferences and provide a more personalized experience</li>
                <li><strong>Security:</strong> Some cookies help us identify and prevent security risks</li>
                <li><strong>Advertising:</strong> We use cookies to show you relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Essential Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies are necessary for the website to function and cannot be switched off in our systems. 
                They are usually only set in response to actions made by you which amount to a request for services.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2"><strong>Examples:</strong></p>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                  <li>Session cookies for website functionality</li>
                  <li>Security cookies to authenticate users</li>
                  <li>Cookies to remember your cookie preferences</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Analytics Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance 
                of our site. They help us know which pages are the most and least popular.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2"><strong>Examples:</strong></p>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                  <li>Google Analytics cookies (_ga, _gid, _gat)</li>
                  <li>Page view tracking cookies</li>
                  <li>User behavior analysis cookies</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">3.3 Functional Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies enable the website to provide enhanced functionality and personalization. They may be set 
                by us or by third-party providers whose services we have added to our pages.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2"><strong>Examples:</strong></p>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                  <li>Language preference cookies</li>
                  <li>Theme preference cookies (dark/light mode)</li>
                  <li>Social media integration cookies</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">3.4 Advertising Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies may be set through our site by our advertising partners. They may be used to build a 
                profile of your interests and show you relevant adverts on other sites.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-2"><strong>Examples:</strong></p>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                  <li>Google AdSense cookies</li>
                  <li>Social media advertising cookies</li>
                  <li>Retargeting and remarketing cookies</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use several third-party services that may set their own cookies. These include:
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-900">Service</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-900">Purpose</th>
                      <th className="border-b px-4 py-3 text-left text-sm font-medium text-gray-900">Cookie Names</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Google Analytics</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Website analytics and tracking</td>
                      <td className="px-4 py-3 text-sm text-gray-700">_ga, _gid, _gat_gtag</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Google AdSense</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Displaying relevant advertisements</td>
                      <td className="px-4 py-3 text-sm text-gray-700">IDE, test_cookie, NID</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700">Social Media</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Social sharing and login features</td>
                      <td className="px-4 py-3 text-sm text-gray-700">Various platform-specific cookies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. How Long Do Cookies Last?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Cookies can be either:</p>
              
              <h3 className="text-lg font-medium text-gray-800 mb-3">Session Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These are temporary cookies that are deleted when you close your browser. They help our website 
                remember what you did on the previous page, avoiding having to re-enter information.
              </p>

              <h3 className="text-lg font-medium text-gray-800 mb-3">Persistent Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These cookies remain on your device for a set period (ranging from minutes to years) or until you 
                delete them. They help our website remember your preferences and provide a more personalized experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Browser Settings</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>View what cookies are stored on your device</li>
                <li>Delete cookies individually or all at once</li>
                <li>Block cookies from specific sites</li>
                <li>Block all cookies from being set</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 Browser-Specific Instructions</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800 mb-2"><strong>Popular browsers:</strong></p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">6.3 Opt-Out Options</h3>
              <p className="text-gray-700 leading-relaxed mb-4">For specific services, you can opt-out here:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                <li><a href="https://adssettings.google.com" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
                <li><a href="https://www.youronlinechoices.com" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Your Online Choices (EU)</a></li>
                <li><a href="https://optout.networkadvertising.org" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative (US)</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Impact of Disabling Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you choose to disable cookies, please note that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li>Some features of our website may not function properly</li>
                <li>You may need to re-enter information more frequently</li>
                <li>Your preferences may not be saved between visits</li>
                <li>Some personalized content may not be available</li>
                <li>Analytics data may be less accurate</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under GDPR and other privacy laws, you have rights regarding cookies and personal data processing:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
                <li><strong>Right to be informed:</strong> This policy provides information about our cookie use</li>
                <li><strong>Right of access:</strong> You can request information about cookies we use</li>
                <li><strong>Right to object:</strong> You can object to certain types of cookie processing</li>
                <li><strong>Right to withdraw consent:</strong> You can withdraw consent for non-essential cookies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Updates to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, 
                or our business practices. We will post the updated policy on this page and update the "Last updated" date.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We encourage you to review this policy periodically to stay informed about how we use cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@cleverspacesolutions.com</p>
                <p className="text-gray-700 mb-2"><strong>Address:</strong> [Your Business Address]</p>
                <p className="text-gray-700"><strong>Subject Line:</strong> Cookie Policy Inquiry</p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                This Cookie Policy is compliant with GDPR, ePrivacy Directive, and other applicable laws. 
                For specific legal advice, please consult with a qualified attorney.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 