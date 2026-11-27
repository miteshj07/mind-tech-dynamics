import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Seo from '@/components/layout/Seo';
import PageHeader from '@/components/layout/PageHeader';
import ContactCTA from '@/components/layout/ContactCTA';
import NotFound from '@/pages/NotFound';
import { useCms } from '@/cms/context/CmsContext';
import { caseStudySlug } from '@/lib/utils';

interface CaseStudy {
  title: string;
  client: string;
  location?: string;
  industry: string;
  metric?: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  tags: string[];
  images?: { src: string; caption?: string }[];
}

// Where to read more about the same work, keyed by case study slug.
const RELATED: Record<string, { label: string; path: string }> = {
  'automated-subscription-billing-with-chargent': { label: 'Chargent Salesforce integration service', path: '/chargent-salesforce-integration' },
  'recurly-salesforce-subscription-integration': { label: 'Recurly Salesforce integration service', path: '/recurly-salesforce-integration' },
  'two-way-quickbooks-salesforce-integration': { label: 'Salesforce QuickBooks integration service', path: '/salesforce-quickbooks-integration' },
  'moodle-course-progress-live-in-salesforce': { label: 'How we sync Moodle course progress into Salesforce', path: '/blog/sync-moodle-course-progress-into-salesforce' },
  'one-click-microsoft-365-provisioning-from-salesforce': { label: 'How to provision Microsoft 365 from Salesforce with the Graph API', path: '/blog/provision-microsoft-365-from-salesforce-graph-api' },
  'a-student-self-service-portal-on-a-salesforce-site': { label: 'How we built a student portal on a Salesforce Site', path: '/blog/student-self-service-portal-salesforce-site' },
  'a-phone-readiness-interview-scored-in-salesforce': { label: 'Scoring an interview in Salesforce without AI math', path: '/blog/scoring-an-interview-in-salesforce-without-ai-math' },
};

const describe = (s: CaseStudy) => {
  const text = `${s.metric ? `${s.metric}. ` : ''}${s.challenge}`;
  return text.length <= 155 ? text : `${text.slice(0, text.lastIndexOf(' ', 152))}...`;
};

const CaseStudyPage = () => {
  const { slug } = useParams();
  const { data } = useCms();
  const studies: CaseStudy[] = data.caseStudiesSection.studies;
  const study = studies.find((s) => caseStudySlug(s.title) === slug);
  if (!study) return <NotFound />;

  const path = `/case-studies/${slug}`;
  const where = [study.client, study.location].filter(Boolean).join(', ');
  const pageTitle = `${study.title} | Case Study`;
  const image = study.images?.[0]?.src ?? study.image;
  const related = RELATED[slug!];
  const others = studies.filter((s) => s !== study);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: describe(study),
    image: image.startsWith('http') ? image : `https://www.meethemind.com${image}`,
    url: `https://www.meethemind.com${path}`,
    keywords: study.tags.join(', '),
    about: {
      '@type': 'Organization',
      name: study.client,
      ...(study.location ? { address: study.location } : {}),
    },
    author: { '@type': 'Organization', name: 'Meet The Mind Technologies', url: 'https://www.meethemind.com/' },
    publisher: {
      '@type': 'Organization',
      name: 'Meet The Mind Technologies',
      url: 'https://www.meethemind.com/',
      logo: { '@type': 'ImageObject', url: 'https://www.meethemind.com/og-image.png' },
    },
  };

  return (
    <>
      <Seo
        title={pageTitle.length <= 60 ? pageTitle : study.title}
        description={describe(study)}
        canonical={path}
        image={image}
        jsonLd={articleSchema}
      />
      <PageHeader title={study.title} subtitle={`${where} | ${study.industry}`} />

      <article className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/case-studies" className="inline-flex items-center text-brand font-medium hover:underline mb-8">
            <ArrowLeft size={16} className="mr-1" /> All case studies
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            {study.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          {study.metric && (
            <div className="mb-10 rounded-lg bg-brand/5 border border-brand/20 px-5 py-4">
              <p className="text-lg font-semibold text-brand-dark">{study.metric}</p>
            </div>
          )}

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-3">The challenge</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{study.challenge}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">What we built</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{study.solution}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Results</h2>
              <ul className="list-disc pl-5 space-y-2">
                {study.results.map((r) => (
                  <li key={r} className="text-gray-700 text-lg">{r}</li>
                ))}
              </ul>
            </section>

            {study.images && study.images.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">See it in action</h2>
                <div className="space-y-8">
                  {study.images.map((img, i) => (
                    <figure key={img.src}>
                      <img
                        src={img.src}
                        alt={img.caption || `${study.title} screenshot ${i + 1}`}
                        className="w-full rounded-md border border-gray-200"
                        loading="lazy"
                      />
                      {img.caption && <figcaption className="text-sm text-gray-500 mt-2">{img.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {related && (
              <p>
                <Link to={related.path} className="text-brand font-semibold hover:underline inline-flex items-center gap-1">
                  {related.label} <ArrowRight size={16} />
                </Link>
              </p>
            )}
          </div>

          {others.length > 0 && (
            <nav className="mt-16 border-t border-gray-200 pt-10" aria-label="More case studies">
              <h2 className="text-xl font-semibold mb-4">More case studies</h2>
              <ul className="space-y-2">
                {others.map((s) => (
                  <li key={s.title}>
                    <Link to={`/case-studies/${caseStudySlug(s.title)}`} className="text-brand hover:underline">
                      {s.title}
                    </Link>
                    <span className="text-gray-500 text-sm"> ({s.industry})</span>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>

      <ContactCTA
        heading="Have a similar problem in your Salesforce org?"
        subheading="Tell us what the systems are and where the data gets stuck. We'll tell you how we'd connect them."
        buttonText="Talk to us about your project"
      />
    </>
  );
};

export default CaseStudyPage;
