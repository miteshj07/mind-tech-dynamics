import React from 'react';
import Seo from '@/components/layout/Seo';
import PageHeader from '@/components/layout/PageHeader';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <>
      <Seo
        title="Privacy Policy | Meet The Mind Technologies"
        description="Learn how Meet The Mind Technologies collects, uses, and protects your personal data. We are committed to your privacy and GDPR compliance."
        canonical="/privacy-policy"
      />
      <PageHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">

            <div>
              <p className="text-sm text-gray-500 mb-6">Last updated: June 2025</p>
              <p>
                Meet The Mind Technologies Pty Ltd ("we", "us", or "our") operates meethemind.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services. By using the site you agree to the terms described here.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <h3 className="text-lg font-semibold mb-2">Information you provide directly</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Name, company name, email address, and phone number submitted via our contact form</li>
                <li>Details about the service you are interested in</li>
                <li>Any other information you voluntarily share in messages to us</li>
              </ul>
              <h3 className="text-lg font-semibold mb-2">Information collected automatically</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP address, browser type, and operating system</li>
                <li>Pages visited and time spent on those pages</li>
                <li>Referral source (how you arrived at our site)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Respond to your enquiries and provide the services you request</li>
                <li>Send you updates about our services, case studies, or blog content where you have consented</li>
                <li>Improve the content and functionality of our website</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-3">
                We do <strong>not</strong> sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Legal Basis for Processing (GDPR)</h2>
              <p className="mb-3">For visitors in the European Economic Area, we process personal data under the following lawful bases:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Legitimate interests</strong> — responding to your enquiries and running our business</li>
                <li><strong>Consent</strong> — where you have explicitly opted in to receive communications</li>
                <li><strong>Contractual necessity</strong> — when processing is required to deliver services you have engaged us for</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Retention</h2>
              <p>
                We retain contact form submissions for up to 24 months unless you ask us to delete your data sooner. Website analytics data is retained for 26 months in aggregate form.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
              <p className="mb-3">We use the following third-party services, each governed by their own privacy policies:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Supabase</strong> — database and backend infrastructure (EU and US data centres)</li>
                <li><strong>Vercel</strong> — website hosting and CDN</li>
                <li><strong>Google Analytics</strong> (if enabled) — anonymised website traffic analytics</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
              <p>
                Our website may use functional cookies to remember your preferences. We do not use advertising or tracking cookies. You can disable cookies in your browser settings without affecting your ability to read our content.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="mb-3">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data ("right to be forgotten")</li>
                <li>Object to or restrict processing of your data</li>
                <li>Withdraw consent at any time (where processing is based on consent)</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, email us at <strong>hello@meethemind.com</strong>.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Transfers</h2>
              <p>
                We are based in Australia and serve clients in the US, UK, UAE, and Australia. Data may be processed in multiple jurisdictions. We ensure appropriate safeguards are in place for any cross-border transfers.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page reflects when the policy was last revised. We encourage you to review this page periodically.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="mt-3 p-5 bg-gray-50 rounded-lg">
                <p><strong>Meet The Mind Technologies Pty Ltd</strong></p>
                <p>Email: hello@meethemind.com</p>
                <p className="mt-2">
                  Or use our <Link to="/contact-us" className="text-brand hover:underline">contact form</Link>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
