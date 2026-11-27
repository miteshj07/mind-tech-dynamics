import React from 'react';
import { UserPlus, ArrowUpDown, Megaphone, CreditCard, FileText, CalendarClock } from 'lucide-react';
import IntegrationPage from '@/components/layout/IntegrationPage';

const RecurlySalesforceIntegration = () => (
  <IntegrationPage
    path="/recurly-salesforce-integration"
    seoTitle="Recurly Salesforce Integration: Custom Two-Way Sync"
    seoDescription="Two-way Recurly and Salesforce integration built in Apex: start subscriptions from Salesforce, see payments, invoices and renewals on every account."
    name="Recurly Salesforce Integration"
    schemaDescription="Custom two-way integration between Recurly and Salesforce, built in Apex: subscriptions started from Salesforce, payment status, invoices, renewal dates and plan changes synced back to Salesforce."
    subtitle="We connect Recurly and Salesforce in both directions, so subscriptions can start from the CRM and every payment, renewal and cancellation shows up on the account."
    intro={[
      'Recurly runs your subscriptions and Salesforce runs your customer relationships. When the two do not talk, sales cannot see who is paying, finance cannot see what sales sold, and a failing card turns into a cancellation before anyone notices.',
      'We build the connection directly in Salesforce, with Apex and the Recurly API, so a subscription started in Salesforce appears in Recurly, and what happens in Recurly comes back to the Salesforce record.',
    ]}
    problems={[
      'New subscribers set up by hand in Recurly after the deal is won in Salesforce',
      'Account managers cannot see payment status, invoices or renewal dates in Salesforce',
      'Upgrades, downgrades and cancellations recorded in one system and missed in the other',
      'Failed payments noticed only after the customer has churned',
      'No single report showing subscription revenue next to the sales pipeline',
    ]}
    gridHeading="What syncs, and in which direction"
    grids={[
      {
        heading: 'Salesforce to Recurly',
        items: [
          { icon: <UserPlus size={26} />, title: 'New subscriptions', description: 'A subscription started in Salesforce creates the matching account and subscription in Recurly, so nobody sets it up twice.' },
          { icon: <ArrowUpDown size={26} />, title: 'Plan changes', description: 'Upgrades, downgrades and cancellations made from Salesforce reach Recurly, so billing always matches what the customer agreed.' },
          { icon: <Megaphone size={26} />, title: 'Campaign tracking', description: "Recurly's renewal and dunning emails can be tied to Salesforce campaigns, so their results sit in the same reports as everything else." },
        ],
      },
      {
        heading: 'Recurly to Salesforce',
        items: [
          { icon: <CreditCard size={26} />, title: 'Payment status', description: 'Successful and failed payments show on the account, so the team can call a customer whose card is failing before they cancel.' },
          { icon: <FileText size={26} />, title: 'Invoices', description: 'Each invoice is stored in Salesforce with a link to it in Recurly, for finance and for the customer conversation.' },
          { icon: <CalendarClock size={26} />, title: 'Renewals and plan history', description: 'Renewal dates, current plan and every change made in Recurly are kept on the Salesforce record.' },
        ],
      },
    ]}
    caseStudy={{
      heading: 'Stock News Network, United States',
      text: 'Stock News Network sells subscriptions to trading signals, market analysis and premium alerts. Customers lived in Salesforce, but billing ran on a legacy platform with no automation. We moved billing to Recurly and connected it to Salesforce with the Recurly API and custom Apex, using custom Subscription and Invoice objects in Salesforce.',
      results: [
        'New subscriptions activate almost instantly instead of through manual setup',
        'Payment status, invoices and renewal dates visible inside Salesforce in real time',
        'Subscribers with failing payments flagged early so support can reach out',
      ],
      path: '/case-studies/recurly-salesforce-subscription-integration',
    }}
    steps={[
      ['Discovery and mapping', 'We agree how Recurly accounts, plans, subscriptions and invoices map to Salesforce, which system owns each field, and which actions start in Salesforce.'],
      ['Secure connection', 'Salesforce calls the Recurly API with credentials kept in Salesforce security settings, never in code.'],
      ['Outbound sync in Apex', 'We write the Apex that creates and changes subscriptions in Recurly from Salesforce, with checks so a subscription is never created twice.'],
      ['Inbound updates', 'Recurly webhooks tell Salesforce when a payment succeeds or fails, a subscription renews, or a plan changes, and Salesforce updates the record straight away.'],
      ['Testing and go-live', 'We test every lifecycle event in a Recurly sandbox site and a Salesforce sandbox, then switch on production.'],
    ]}
    faqs={[
      { q: 'Does Recurly have its own Salesforce integration?', a: "Yes. Recurly publishes a Salesforce package that brings Recurly data into Salesforce. Recurly's documentation describes that sync as mainly one way, from Recurly into Salesforce, with subscription changes sent back through a dedicated button. If that matches how your team works, start there. A custom integration makes sense when subscriptions need to start from your own Salesforce process, when you use custom objects, or when Recurly events need to drive Salesforce automation." },
      { q: 'Can a subscription be started from Salesforce?', a: 'Yes. In the Stock News Network build, a subscription started in Salesforce creates the matching records in Recurly, and the subscriber is active almost immediately.' },
      { q: 'What data comes back from Recurly to Salesforce?', a: 'Payment status, invoices with links to Recurly, renewal dates, the current plan, and upgrades, downgrades and cancellations. We agree the exact fields during discovery.' },
      { q: 'How quickly does Salesforce update?', a: 'Recurly sends events as they happen, so payments and plan changes usually appear in Salesforce within moments rather than on an overnight schedule.' },
      { q: 'Should I use Recurly or Chargent?', a: 'Chargent runs payments inside Salesforce, so billing lives where your team already works. Recurly is a separate subscription billing platform with its own dunning and revenue reporting, and Salesforce needs an integration to see its data. We have delivered both. The right choice depends on whether your finance team wants a billing system of its own.' },
      { q: 'What happens to failed payments?', a: "Recurly's dunning handles the retries and customer emails. The integration shows each failed payment on the Salesforce account, so your team can step in before the subscription lapses." },
    ]}
    links={[
      { label: 'See all integration case studies', path: '/case-studies' },
      { label: 'Chargent Salesforce integration', path: '/chargent-salesforce-integration' },
      { label: 'Salesforce QuickBooks integration', path: '/salesforce-quickbooks-integration' },
    ]}
    cta={{
      heading: 'Want Recurly and Salesforce to show the same customer?',
      subheading: "Tell us how subscriptions are sold and billed today. We'll show you what the integration would look like and whether Recurly's own package would do the job instead.",
      buttonText: 'Talk to us about Recurly',
    }}
  />
);

export default RecurlySalesforceIntegration;
