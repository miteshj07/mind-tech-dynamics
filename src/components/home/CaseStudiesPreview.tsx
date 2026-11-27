
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { caseStudySlug } from '@/lib/utils';
import { useCms } from '@/cms/context/CmsContext';

interface CaseStudy {
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  tags: string[];
}

const CaseStudyCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            cardRef.current?.classList.add('opacity-100', 'translate-y-0');
          }, 200 * index);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="case-study-card group opacity-0 translate-y-10 transition-all duration-700"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={study.image}
          alt={study.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 w-full">
            <p className="text-brand font-medium text-sm mb-1">{study.client}</p>
            <h3 className="text-white text-xl font-bold">{study.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {study.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-6 line-clamp-3">{study.challenge}</p>
        <Link
          to={`/case-studies/${caseStudySlug(study.title)}`}
          className="inline-flex items-center text-brand font-medium hover:text-brand-dark transition-colors"
        >
          Read Case Study <ArrowRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

const CaseStudiesPreview = () => {
  const { data } = useCms();
  const { caseStudiesSection } = data;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionRef.current?.classList.add('opacity-100', 'translate-y-0');
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const studies: CaseStudy[] = caseStudiesSection?.studies ?? [];

  // Hide the section entirely when there are no studies
  if (studies.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div
          ref={sectionRef}
          className="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <h2 className="heading-lg mb-4">
            Featured <span className="text-brand">Case Studies</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {caseStudiesSection?.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studies.map((study, index) => (
            <CaseStudyCard key={index} study={study} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/case-studies" className="btn-secondary inline-flex items-center">
            View All Case Studies <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesPreview;
