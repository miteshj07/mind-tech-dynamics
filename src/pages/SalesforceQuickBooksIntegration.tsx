import React from 'react';
import { Users, FileText, Percent, CreditCard, Wallet, BellRing } from 'lucide-react';
import IntegrationPage from '@/components/layout/IntegrationPage';

const SalesforceQuickBooksIntegration = () => (
  <IntegrationPage
    path="/salesforce-quickbooks-integration"
    seoTitle="Salesforce QuickBooks Integration: Custom Two-Way Sync"
    seoDescription="Two-way Salesforce and QuickBooks Online integration built in Apex: invoices created from Salesforce, payments and balances synced back to the record."
    name="Salesforce QuickBooks Integration"
    schemaDescription="Custom two-way integration between Salesforce and QuickBooks Online, built in Apex: customers and invoices from Salesforce, payment status, balances and refunds back to Salesforce."
    subtitle="We connect Salesforce and QuickBooks Online in both directions, so invoices start from the CRM and payment status comes back to it, with nobody re-keying data."
    intro={[
      'When sales and service run in Salesforce and the books run in QuickBooks, someone ends up copying data between the two. Invoices go out late, finance cannot see what sales agreed, and the people talking to customers cannot see who has paid.',
      'We build the connection directly in Salesforce, with Apex and the QuickBooks Online API. Each system keeps doing its own job, and both show the same numbers.',
    ]}
    problems={[
      'Invoices typed into QuickBooks by hand after a deal closes or a customer signs up',
      'Reps and account managers cannot see payment status or open balances in Salesforce',
      'Customer names and addresses drift apart between the two systems',
      'Refunds and credits reconciled by hand, days after the fact',
      'Overdue accounts noticed late because nobody watches both systems',
    ]}
    gridHeading="What syncs, and in which direction"
    grids={[
      {
        heading: 'Salesforce to QuickBooks',
        items: [
          { icon: <Users size={26} />, title: 'Customers', description: 'Salesforce Accounts or Contacts become QuickBooks customers, matched first so an existing customer is linked, not created twice.' },
          { icon: <FileText size={26} />, title: 'Invoices', description: 'An invoice is created when a record reaches the point you choose: a closed deal, a signed order, an enrollment.' },
          { icon: <Percent size={26} />, title: 'Discounts and credits', description: 'Discounts that are decided in Salesforce land on the invoice automatically. At Lakewood University, scholarships became invoice discounts.' },
        ],
      },
      {
        heading: 'QuickBooks to Salesforce',
        items: [
          { icon: <CreditCard size={26} />, title: 'Payment status', description: 'Paid, partly paid or unpaid shows on the Salesforce record, with the date, so nobody has to ask finance.' },
          { icon: <Wallet size={26} />, title: 'Balances and refunds', description: 'Open balances and refunds flow back from QuickBooks, so reconciliation is no longer a manual job.' },
          { icon: <BellRing size={26} />, title: 'Overdue follow-up', description: 'An overdue balance can start a reminder email, a task for the account owner, or any other Salesforce automation.' },
        ],
      },
    ]}
    caseStudy={{
      heading: 'Lakewood University, Ohio',
      text: 'Lakewood runs students in Salesforce Education Cloud and tuition in QuickBooks Online. We built a two-way integration in Apex: enrollments create tuition invoices, scholarships apply as discounts, and payments, refunds and balances flow back to each student record every 15 minutes.',
      results: [
        'Tuition invoices issued automatically on enrollment instead of days later',
        'Refund reconciliation automated between finance and student services',
        'Outstanding balances trigger automated reminders',
      ],
      path: '/case-studies/two-way-quickbooks-salesforce-integration',
    }}
    steps={[
      ['Discovery and field mapping', 'We agree which Salesforce objects map to QuickBooks customers, items and invoices, which system owns each field, and which event creates an invoice.'],
      ['Secure connection', 'Salesforce connects to the QuickBooks Online API with OAuth 2.0. Tokens are stored and refreshed inside Salesforce, never in code.'],
      ['Sync logic in Apex', 'We write the sync in Salesforce Apex, with matching rules so records link instead of duplicating, and scheduled jobs for the return sync.'],
      ['Error logging', 'Every failed sync is logged against the record with the reason, so finance sees what to fix instead of finding a gap at month end.'],
      ['Testing and go-live', 'We test against a QuickBooks sandbox company with your real scenarios, then switch on production.'],
    ]}
    faqs={[
      { q: 'Does Salesforce integrate with QuickBooks out of the box?', a: 'No. Salesforce does not include a QuickBooks connector as standard. Teams use a connector app from the AppExchange, an integration platform such as Zapier or MuleSoft, or a custom integration built inside Salesforce.' },
      { q: 'Should I use a connector app or a custom integration?', a: 'If you only need standard Accounts and Opportunities turned into standard invoices, a connector app is often enough and costs less. A custom integration makes sense when the invoice depends on your own objects or rules (enrollments, subscriptions, discounts decided in Salesforce), when payment data needs to drive automation in Salesforce, or when you do not want another per-user subscription. We will tell you which one fits on the first call.' },
      { q: 'Do you work with QuickBooks Online or QuickBooks Desktop?', a: "Our delivered work is on QuickBooks Online, which has a cloud API. QuickBooks Desktop has no cloud API of its own and connects through Intuit's Web Connector on the machine that hosts the company file, so it needs a different design. Tell us your setup and we will say whether it is a fit." },
      { q: 'How often does the data sync?', a: 'You choose. Invoices can be created as soon as a record changes in Salesforce. Payments and balances usually come back on a schedule. The Lakewood University integration runs every 15 minutes, which keeps both systems current without straining either one.' },
      { q: 'Will the integration create duplicate customers?', a: 'Not if matching is designed in from the start. Once a Salesforce record is linked, the QuickBooks ID is stored on it. Before that, we match on email or company name, so existing customers are linked instead of created again.' },
      { q: 'What happens when a sync fails?', a: 'The failure is logged against the record with the reason QuickBooks gave, so someone can fix the cause and send it again. Nothing fails silently.' },
    ]}
    links={[
      { label: 'See all integration case studies', path: '/case-studies' },
      { label: 'Recurly Salesforce integration', path: '/recurly-salesforce-integration' },
      { label: 'Chargent Salesforce integration', path: '/chargent-salesforce-integration' },
    ]}
    cta={{
      heading: 'Tired of re-keying invoices between Salesforce and QuickBooks?',
      subheading: "Tell us how deals, orders or enrollments turn into invoices today. We'll show you what the integration would look like and whether a connector app would do the job instead.",
      buttonText: 'Talk to us about QuickBooks',
    }}
  />
);

export default SalesforceQuickBooksIntegration;
