import React from 'react';
import Seo from '@/components/layout/Seo';
import PageHeader from '@/components/layout/PageHeader';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <>
      <Seo
        title="Terms of Service | Meet The Mind Technologies"
        description="Terms governing your use of meethemind.com and engagement with Meet The Mind Technologies' Salesforce consulting services."
        canonical="/terms-of-service"
      />
      <PageHeader
        title="Terms of Service"
        subtitle="The terms and conditions governing use of our website and services"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-700 space-y-10">

            <div>
              <p className="text-sm text-gray-500 mb-6">Last updated: June 2025</p>
              <p>
                These Terms of Service ("Terms") govern your use of the meethemind.com website and any services provided by Meet The Mind Technologies Pty Ltd ("we", "us", or "our"). By accessing our website or engaging our services, you agree to these Terms in full. If you do not agree, please do not use our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Use of the Website</h2>
              <p className="mb-3">You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the site in any way that violates applicable local, national, or international laws or regulations</li>
                <li>Transmit unsolicited or unauthorised advertising or promotional material</li>
                <li>Attempt to gain unauthorised access to any part of our systems or servers</li>
                <li>Engage in any conduct that restricts or inhibits others from using or enjoying the website</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Intellectual Property</h2>
              <p>
                All content on this website — including text, graphics, logos, images, and software — is the property of Meet The Mind Technologies or its content suppliers and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Services</h2>
              <p className="mb-3">
                We provide Salesforce consulting services including Agentforce implementation, B2B lead-generation automation, CRM strategy, and related technology advisory services. Specific terms for any engagement are set out in a separate Statement of Work or consulting agreement signed by both parties.
              </p>
              <p>
                We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with reasonable notice where practicable.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Disclaimer of Warranties</h2>
              <p>
                This website and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Meet The Mind Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of (or inability to use) this website or our services, even if we have been advised of the possibility of such damages. Our total liability for any claim arising in connection with these Terms shall not exceed the amount you paid us in the three months preceding the claim.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. These links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy</h2>
              <p>
                Your use of our website is also governed by our <Link to="/privacy-policy" className="text-brand hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the State of New South Wales, Australia. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of New South Wales, without prejudice to any mandatory consumer protection rights you may have in your local jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to These Terms</h2>
              <p>
                We reserve the right to amend these Terms at any time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the website after changes constitutes acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us:</p>
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

export default TermsOfService;
