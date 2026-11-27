import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Users, FileText, Percent, CreditCard, Wallet, BellRing } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import Seo from '@/components/layout/Seo';

const CASE_STUDY = '/case-studies/two-way-quickbooks-salesforce-integration';

const problems = [
  'Invoices typed into QuickBooks by hand after a deal closes or a customer signs up',
  'Reps and account managers cannot see payment status or open balances in Salesforce',
  'Customer names and addresses drift apart between the two systems',
  'Refunds and credits reconciled by hand, days after the fact',
  'Overdue accounts noticed late because nobody watches both systems',
];

const toQuickBooks = [
  {
    icon: <Users size={26} />,
    title: 'Customers',
    description: 'Salesforce Accounts or Contacts become QuickBooks customers, matched first so an existing customer is linked, not created twice.',
  },
  {
    icon: <FileText size={26} />,
    title: 'Invoices',
    description: 'An invoice is created when a record reaches the point you choose: a closed deal, a signed order, an enrollment.',
  },
  {
    icon: <Percent size={26} />,
    title: 'Discounts and credits',
    description: 'Discounts that are decided in Salesforce land on the invoice automatically. At Lakewood University, scholarships became invoice discounts.',
  },
];

const toSalesforce = [
  {
    icon: <CreditCard size={26} />,
    title: 'Payment status',
    description: 'Paid, partly paid or unpaid shows on the Salesforce record, with the date, so nobody has to ask finance.',
  },
  {
    icon: <Wallet size={26} />,
    title: 'Balances and refunds',
    description: 'Open balances and refunds flow back from QuickBooks, so reconciliation is no longer a manual job.',
  },
  {
    icon: <BellRing size={26} />,
    title: 'Overdue follow-up',
    description: 'An overdue balance can start a reminder email, a task for the account owner, or any other Salesforce automation.',
  },
];

const steps = [
  ['Discovery and field mapping', 'We agree which Salesforce objects map to QuickBooks customers, items and invoices, which system owns each field, and which event creates an invoice.'],
  ['Secure connection', 'Salesforce connects to the QuickBooks Online API with OAuth 2.0. Tokens are stored and refreshed inside Salesforce, never in code.'],
  ['Sync logic in Apex', 'We write the sync in Salesforce Apex, with matching rules so records link instead of duplicating, and scheduled jobs for the return sync.'],
  ['Error logging', 'Every failed sync is logged against the record with the reason, so finance sees what to fix instead of finding a gap at month end.'],
  ['Testing and go-live', 'We test against a QuickBooks sandbox company with your real scenarios, then switch on production.'],
];

const faqs = [
  {
    q: 'Does Salesforce integrate with QuickBooks out of the box?',
    a: 'No. Salesforce does not include a QuickBooks connector as standard. Teams use a connector app from the AppExchange, an integration platform such as Zapier or MuleSoft, or a custom integration built inside Salesforce.',
  },
  {
    q: 'Should I use a connector app or a custom integration?',
    a: 'If you only need standard Accounts and Opportunities turned into standard invoices, a connector app is often enough and costs less. A custom integration makes sense when the invoice depends on your own objects or rules (enrollments, subscriptions, discounts decided in Salesforce), when payment data needs to drive automation in Salesforce, or when you do not want another per-user subscription. We will tell you which one fits on the first call.',
  },
  {
    q: 'Do you work with QuickBooks Online or QuickBooks Desktop?',
    a: 'Our delivered work is on QuickBooks Online, which has a cloud API. QuickBooks Desktop has no cloud API of its own and connects through Intuit\'s Web Connector on the machine that hosts the company file, so it needs a different design. Tell us your setup and we will say whether it is a fit.',
  },
  {
    q: 'How often does the data sync?',
    a: 'You choose. Invoices can be created as soon as a record changes in Salesforce. Payments and balances usually come back on a schedule. The Lakewood University integration runs every 15 minutes, which keeps both systems current without straining either one.',
  },
  {
    q: 'Will the integration create duplicate customers?',
    a: 'Not if matching is designed in from the start. Once a Salesforce record is linked, the QuickBooks ID is stored on it. Before that, we match on email or company name, so existing customers are linked instead of created again.',
  },
  {
    q: 'What happens when a sync fails?',
    a: 'The failure is logged against the record with the reason QuickBooks gave, so someone can fix the cause and send it again. Nothing fails silently.',
  },
];

const SalesforceQuickBooksIntegration = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Salesforce QuickBooks Integration',
    serviceType: 'Salesforce to QuickBooks Online integration',
    provider: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      url: 'https://www.meethemind.com/',
    },
    areaServed: ['United States', 'United Kingdom', 'Australia'],
    description:
      'Custom two-way integration between Salesforce and QuickBooks Online, built in Apex: customers and invoices from Salesforce, payment status, balances and refunds back to Salesforce.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const SyncGrid = ({ heading, items }: { heading: string; items: typeof toQuickBooks }) => (
    <div>
      <h3 className="text-xl font-semibold mb-6 text-center">{heading}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((c) => (
          <div key={c.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-brand mb-3">{c.icon}</div>
            <h4 className="text-lg font-semibold mb-2">{c.title}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Seo
        title="Salesforce QuickBooks Integration: Custom Two-Way Sync"
        description="Two-way Salesforce and QuickBooks Online integration built in Apex: invoices created from Salesforce, payments and balances synced back to the record."
        canonical="/salesforce-quickbooks-integration"
        jsonLd={[serviceSchema, faqSchema]}
      />

      <PageHeader
        title="Salesforce QuickBooks Integration"
        subtitle="We connect Salesforce and QuickBooks Online in both directions, so invoices start from the CRM and payment status comes back to it, with nobody re-keying data."
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-gray-700 leading-relaxed mb-5">
            When sales and service run in Salesforce and the books run in QuickBooks, someone ends up copying
            data between the two. Invoices go out late, finance cannot see what sales agreed, and the people
            talking to customers cannot see who has paid.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            We build the connection directly in Salesforce, with Apex and the QuickBooks Online API. Each system
            keeps doing its own job, and both show the same numbers.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-amber-900 font-semibold mb-2">What this fixes:</p>
            <ul className="space-y-2">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-2 text-amber-800 text-sm">
                  <span className="mt-1 text-amber-500 flex-shrink-0">✕</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          <h2 className="heading-md text-center">What syncs, and in which direction</h2>
          <SyncGrid heading="Salesforce to QuickBooks" items={toQuickBooks} />
          <SyncGrid heading="QuickBooks to Salesforce" items={toSalesforce} />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-xl border border-brand/30 bg-brand/5 p-8">
            <p className="text-brand font-semibold uppercase tracking-widest text-sm mb-2">Delivered</p>
            <h2 className="text-2xl font-bold mb-3">Lakewood University, Ohio</h2>
            <p className="text-gray-700 mb-4">
              Lakewood runs students in Salesforce Education Cloud and tuition in QuickBooks Online. We built a
              two-way integration in Apex: enrollments create tuition invoices, scholarships apply as discounts,
              and payments, refunds and balances flow back to each student record every 15 minutes.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                'Tuition invoices issued automatically on enrollment instead of days later',
                'Refund reconciliation automated between finance and student services',
                'Outstanding balances trigger automated reminders',
              ].map((r) => (
                <li key={r} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="text-brand mt-0.5 flex-shrink-0" size={18} /> {r}
                </li>
              ))}
            </ul>
            <Link to={CASE_STUDY} className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              Read the full case study <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="heading-md mb-12 text-center">How we build it</h2>
          <ol className="space-y-6">
            {steps.map(([title, desc], i) => (
              <li key={title} className="flex items-start">
                <div className="bg-brand text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-semibold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="heading-md mb-10 text-center">Salesforce QuickBooks integration FAQs</h2>
          <div className="space-y-5">
            {faqs.map((f) => (
              <div key={f.q} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <CheckCircle className="text-brand mt-0.5 flex-shrink-0" size={18} />
                  {f.q}
                </h3>
                <p className="text-gray-600 ml-7">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/case-studies" className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              See all integration case studies <ArrowRight size={16} />
            </Link>
            <Link to="/apollo-io-salesforce-integration" className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
              Apollo.io Salesforce integration <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA
        heading="Tired of re-keying invoices between Salesforce and QuickBooks?"
        subheading="Tell us how deals, orders or enrollments turn into invoices today. We'll show you what the integration would look like and whether a connector app would do the job instead."
        buttonText="Talk to us about QuickBooks"
      />
    </>
  );
};

export default SalesforceQuickBooksIntegration;
