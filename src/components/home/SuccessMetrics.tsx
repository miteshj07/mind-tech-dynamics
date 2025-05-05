
import React, { useRef, useState, useEffect } from 'react';
import { TrendingUp, Clock, DollarSign, Heart } from 'lucide-react';
import { useCms } from '@/cms/context/CmsContext';
import CountUp from 'react-countup';

const SuccessMetrics = () => {
  const { data } = useCms();
  const { successMetricsSection } = data;
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once triggered, disconnect the observer
          observer.disconnect();
        }
      },
      { threshold: 0.25 } // Trigger when at least 25% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getIconComponent = (iconName: string, size: number = 40) => {
    const icons: {[key: string]: React.ReactNode} = {
      "TrendingUp": <TrendingUp size={size} />,
      "Clock": <Clock size={size} />,
      "DollarSign": <DollarSign size={size} />,
      "Heart": <Heart size={size} />
    };
    
    return icons[iconName] || <TrendingUp size={size} />;
  };

  const parseMetricValue = (value: string) => {
    // Extract the numeric part
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) return { number: 0, suffix: value };
    
    const numericPart = parseFloat(numericMatch[0]);
    const suffix = value.replace(numericMatch[0], '');
    
    return {
      number: numericPart,
      suffix
    };
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4" dangerouslySetInnerHTML={{ __html: successMetricsSection.title }} />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {successMetricsSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {successMetricsSection.metrics.map((metric, index) => {
            const { number, suffix } = parseMetricValue(metric.value);
            
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="text-brand mx-auto mb-4">
                  {getIconComponent(metric.icon, 48)}
                </div>
                <div className="text-4xl font-bold text-brand mb-2">
                  {/* Fallback for when JS is disabled or component hasn't loaded */}
                  <noscript>{metric.value}</noscript>
                  
                  {/* Only render CountUp when section is in view */}
                  {isInView ? (
                    <CountUp
                      start={0}
                      end={number}
                      duration={2}
                      decimals={number % 1 !== 0 ? 1 : 0}
                      suffix={suffix}
                      enableScrollSpy={false}
                      redraw={false}
                    />
                  ) : (
                    <span className="opacity-0">{metric.value}</span>
                  )}
                </div>
                <p className="text-gray-600">{metric.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuccessMetrics;
