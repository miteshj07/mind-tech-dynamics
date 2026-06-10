import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What does Meet The Mind Technologies do?',
    answer:
      'Meet The Mind Technologies is a specialist Salesforce consulting firm. We help B2B businesses implement Salesforce, deploy Agentforce AI agents, automate lead-generation pipelines (Apollo.io → Salesforce), and design CRM strategies that drive measurable revenue growth. We serve clients across the US, UK, UAE, and Australia.',
  },
  {
    question: 'What is Agentforce and how can it benefit my business?',
    answer:
      'Agentforce is Salesforce\'s AI-agent platform that lets you deploy autonomous digital workers — for lead qualification, customer service, internal operations, and more — directly inside your Salesforce environment. For B2B businesses, this typically means 24/7 prospect engagement and dramatically faster pipeline velocity without adding headcount.',
  },
  {
    question: 'How does the Apollo.io to Salesforce lead-generation automation work?',
    answer:
      'We connect Apollo.io\'s prospecting database to your Salesforce CRM using a 6-step automated workflow: Apollo identifies and enriches contacts based on your ICP, sequences them with personalised outreach, and automatically creates Leads or Contacts in Salesforce — complete with engagement history, scoring, and owner assignment — so your reps only touch warm, qualified prospects.',
  },
  {
    question: 'Do you work with businesses outside Australia?',
    answer:
      'Yes. We are a remote-first practice and routinely work with clients in the United States, United Kingdom, United Arab Emirates, and Australia. We accommodate multiple timezones and have experience with the compliance and market nuances of each region.',
  },
  {
    question: 'How long does a Salesforce implementation typically take?',
    answer:
      'A focused Agentforce implementation or lead-gen automation project typically takes 4–8 weeks from discovery to go-live. Full CRM implementations or multi-cloud projects vary based on scope, data complexity, and integration requirements. We provide a detailed project timeline after an initial discovery call.',
  },
  {
    question: 'Is Meet The Mind Technologies a certified Salesforce Partner?',
    answer:
      'Yes. Meet The Mind Technologies is a Salesforce Partner. Our founder Mitesh Jain holds five Salesforce certifications — including Platform Administrator, Platform App Builder, Platform Developer I, Sales Cloud Consultant, and CRM Analytics & Einstein Discovery Consultant — and holds Agentblazer Innovator status for 2025.',
  },
];

const FaqItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900">{faq.question}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-brand transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed bg-white border-t border-gray-100">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

// FAQPage JSON-LD — rendered inline so react-snap captures it deterministically
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
};

const HomeFaq = () => {
  return (
    <section className="py-20 bg-white" aria-label="Frequently Asked Questions">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about working with Meet The Mind Technologies.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Still have questions?{' '}
          <a href="/contact-us" className="text-brand hover:underline font-medium">
            Book a free discovery call →
          </a>
        </p>
      </div>
    </section>
  );
};

export default HomeFaq;
