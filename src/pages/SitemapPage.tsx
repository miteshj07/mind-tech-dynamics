import React from 'react';
import Seo from '@/components/layout/Seo';
import PageHeader from '@/components/layout/PageHeader';
import { Link } from 'react-router-dom';

const sections = [
  {
    heading: 'Main Pages',
    links: [
      { label: 'Home', path: '/' },
      { label: 'Services', path: '/services' },
      { label: 'About Us', path: '/about-us' },
      { label: 'Case Studies', path: '/case-studies' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact Us', path: '/contact-us' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Agentforce Implementation', path: '/agentforce' },
      { label: 'B2B Lead-Generation Automation', path: '/b2b-lead-generation' },
      { label: 'Apollo.io Salesforce Integration', path: '/apollo-io-salesforce-integration' },
      { label: 'Salesforce QuickBooks Integration', path: '/salesforce-quickbooks-integration' },
      { label: 'Recurly Salesforce Integration', path: '/recurly-salesforce-integration' },
      { label: 'Chargent Salesforce Integration', path: '/chargent-salesforce-integration' },
    ],
  },
  {
    heading: 'Blog & Resources',
    links: [
      { label: 'Blog', path: '/blog' },
      { label: 'Apollo.io + Salesforce Integration Guide', path: '/blog/apollo-io-salesforce-integration-guide' },
      { label: 'Provision Microsoft 365 from Salesforce', path: '/blog/provision-microsoft-365-from-salesforce-graph-api' },
      { label: 'Sync Moodle Course Progress into Salesforce', path: '/blog/sync-moodle-course-progress-into-salesforce' },
      { label: 'Salesforce Permission Sets Guide', path: '/blog/salesforce-permission-sets-complete-guide' },
      { label: 'Deal Risk Signals in Salesforce', path: '/blog/deal-risk-signals-salesforce' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms of Service', path: '/terms-of-service' },
    ],
  },
];

const SitemapPage = () => {
  return (
    <>
      <Seo
        title="Sitemap | Meet The Mind Technologies"
        description="Full site map of meethemind.com, navigate to any page on our Salesforce consulting website."
        canonical="/sitemap"
      />
      <PageHeader
        title="Sitemap"
        subtitle="A complete guide to every page on meethemind.com"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  {section.heading}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-brand hover:text-brand-dark hover:underline transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SitemapPage;
