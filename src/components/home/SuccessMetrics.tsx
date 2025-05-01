
import React from 'react';
import { TrendingUp, Clock, DollarSign, Heart } from 'lucide-react';
import { useCms } from '@/cms/context/CmsContext';

const SuccessMetrics = () => {
  const { data } = useCms();
  const { successMetricsSection } = data;

  const getIconComponent = (iconName: string, size: number = 40) => {
    const icons: {[key: string]: React.ReactNode} = {
      "TrendingUp": <TrendingUp size={size} />,
      "Clock": <Clock size={size} />,
      "DollarSign": <DollarSign size={size} />,
      "Heart": <Heart size={size} />
    };
    
    return icons[iconName] || <TrendingUp size={size} />;
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4" dangerouslySetInnerHTML={{ __html: successMetricsSection.title }} />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {successMetricsSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {successMetricsSection.metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="text-brand mx-auto mb-4">
                {getIconComponent(metric.icon, 48)}
              </div>
              <div className="text-4xl font-bold text-brand mb-2">{metric.value}</div>
              <p className="text-gray-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessMetrics;
