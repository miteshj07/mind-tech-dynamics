import React from 'react';
import { CalendarClock, RefreshCw, Workflow, Eye, ShieldCheck, Mail } from 'lucide-react';
import IntegrationPage from '@/components/layout/IntegrationPage';

const ChargentSalesforceIntegration = () => (
  <IntegrationPage
    path="/chargent-salesforce-integration"
    seoTitle="Chargent Salesforce Integration: Recurring Billing Setup"
    seoDescription="Chargent set up inside Salesforce: recurring payment schedules, dunning that recovers failed cards, automated renewals and payment history on every account."
    name="Chargent Salesforce Integration"
    schemaDescription="Chargent implementation inside Salesforce: payment gateway connection, recurring payment schedules, dunning for failed payments, automated renewals with Salesforce Flow, and payment history on every account."
    subtitle="We set up Chargent inside Salesforce so recurring payments, failed-card recovery and billing history all run in the CRM your team already uses."
    intro={[
      'Chargent is a payment app that runs natively inside Salesforce. It connects to your payment gateway, so cards are charged from Salesforce records and every transaction is stored in Salesforce.',
      'Installing it is the easy part. The work is designing payment schedules that match your plans, recovering failed payments, and replacing manual renewals with automation. That is what we do.',
    ]}
    problems={[
      'Payments taken in a separate system that Salesforce cannot see',
      'Renewals processed by hand every month, quarter or year',
      'Failed and expired-card payments that nobody chases',
      'Reps unable to see whether a customer has paid before they call',
      'Card details handled in ways that are hard to keep PCI compliant',
    ]}
    gridHeading="What we set up in Chargent"
    grids={[
      {
        items: [
          { icon: <CalendarClock size={26} />, title: 'Recurring payment schedules', description: 'Monthly, quarterly, half-yearly or annual schedules defined in Salesforce and matched to each of your plans.' },
          { icon: <RefreshCw size={26} />, title: 'Dunning and retries', description: 'Failed and expired-card payments retried automatically on a schedule you set, with customer emails along the way.' },
          { icon: <Workflow size={26} />, title: 'Automated renewals', description: 'Scheduled flows renew subscriptions and take payment, replacing manual renewal work.' },
          { icon: <Eye size={26} />, title: 'Payment visibility', description: 'Payment status and history on the Account and Opportunity, so reps see it before they call.' },
          { icon: <ShieldCheck size={26} />, title: 'Secure card handling', description: "Chargent's tokenization means the full card number is not stored in your Salesforce records." },
          { icon: <Mail size={26} />, title: 'Billing emails', description: 'Receipts, reminders and failed-payment notices sent from your marketing tool. At Adam Mesh Trading Group, these run through Pardot.' },
        ],
      },
    ]}
    caseStudy={{
      heading: 'Adam Mesh Trading Group, New York',
      text: 'Adam Mesh Trading Group sells trading signals, investor alerts and stock coaching on monthly, quarterly, half-yearly and annual subscriptions. Payments ran in a separate system, so renewals were manual and failed cards went unrecovered. We implemented Chargent inside Sales Cloud with Authorize.Net as the gateway.',
      results: [
        '100% of recurring renewals automated across all 4 subscription terms',
        'Failed and expired-card payments recovered automatically through dunning',
        'Payment status and subscription history visible on the Account and Opportunity',
      ],
      path: '/case-studies/automated-subscription-billing-with-chargent',
    }}
    steps={[
      ['Discovery and plan mapping', 'We map your plans, prices and billing terms to Chargent payment schedules, and agree how a sale in Salesforce turns into a billing record.'],
      ['Gateway connection', 'We connect Chargent to your payment gateway, such as Authorize.Net or Stripe, and confirm test transactions end to end.'],
      ['Schedules and dunning', 'We set up the recurring schedules and the retry rules for failed payments.'],
      ['Automation', 'Salesforce Flow handles renewals, status updates and billing emails, so nobody has to process them by hand.'],
      ['Testing and go-live', 'We test successful, failed and expired-card payments in a sandbox with the gateway in test mode, then go live.'],
    ]}
    faqs={[
      { q: 'What is Chargent?', a: 'Chargent is a payment app from the Salesforce AppExchange that runs natively inside Salesforce. It charges cards through your payment gateway and stores every transaction as a Salesforce record, so billing lives in the same place as your customers.' },
      { q: 'Do I still need a payment gateway?', a: 'Yes. Chargent connects Salesforce to a gateway; it does not replace one. It works with many gateways, including Authorize.Net and Stripe. The Adam Mesh Trading Group build uses Authorize.Net.' },
      { q: 'Can we set Chargent up ourselves?', a: 'You can install it yourself, and for simple one-off payments that may be enough. Outside help pays off when you have several plans and billing terms, need failed payments recovered automatically, or want renewals and billing emails to run without anyone touching them.' },
      { q: 'Are card numbers stored in Salesforce?', a: 'No. Chargent uses tokenization, so the full card number is not stored in your Salesforce records.' },
      { q: 'Should I use Chargent or Recurly?', a: 'Chargent runs payments inside Salesforce, so billing lives where your team already works. Recurly is a separate subscription billing platform with its own dunning and revenue reporting, and Salesforce needs an integration to see its data. We have delivered both. The right choice depends on whether your finance team wants a billing system of its own.' },
      { q: 'Can sales reps see payment status?', a: 'Yes. In the Adam Mesh build, payment status and subscription history show on the Account and Opportunity, so a rep knows whether a customer is paid up before calling.' },
    ]}
    links={[
      { label: 'See all integration case studies', path: '/case-studies' },
      { label: 'Recurly Salesforce integration', path: '/recurly-salesforce-integration' },
      { label: 'Salesforce QuickBooks integration', path: '/salesforce-quickbooks-integration' },
    ]}
    cta={{
      heading: 'Want recurring billing to run inside Salesforce?',
      subheading: "Tell us your plans and billing terms. We'll show you how Chargent would handle them, and tell you if a separate billing platform would suit you better.",
      buttonText: 'Talk to us about Chargent',
    }}
  />
);

export default ChargentSalesforceIntegration;
