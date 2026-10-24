import React from 'react';
import Seo from '@/components/layout/Seo';
import PageHeader from '@/components/layout/PageHeader';

const AntiSpamPolicy = () => {
  return (
    <>
      <Seo
        title="Anti-spam policy | Meet The Mind"
        description="Meet The Mind Technologies does not permit meethemind.com or its product pages to be advertised in unsolicited bulk email. Read our anti-spam policy."
        canonical="/anti-spam-policy"
      />
      <PageHeader title="Anti-spam policy" />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              MeetTheMind Technologies Private Limited does not permit meethemind.com, or any of our product pages (including DealPulse and GroundTruth), to be advertised in unsolicited bulk email. This applies to our own staff and to any contractor, affiliate, reseller or partner acting for us.
            </p>
            <p>
              We do not buy or rent email lists. Any one-to-one business email we send is individually researched, addressed to a named person whose role relates to our work, identifies the sender, includes a working reply address, and stops at the recipient's first request. Opt-out requests are honoured within one business day and recorded on a suppression list that applies to every channel and future campaign. Our outbound messages do not include links to or mentions of meethemind.com.
            </p>
            <p>
              If you received an email you believe breaks this policy, write to{' '}
              <a href="mailto:abuse@meethemind.com" className="text-brand">abuse@meethemind.com</a>{' '}
              with the message and we will investigate and respond within two business days.
            </p>
            <p className="text-sm text-gray-500">Last updated: 24 October 2026</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AntiSpamPolicy;
