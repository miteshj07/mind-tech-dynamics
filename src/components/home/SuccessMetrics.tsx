
import React, { useEffect, useState, useRef } from 'react';
import { CheckCheck, Award, Users } from 'lucide-react';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  title: string;
  icon: React.ReactNode;
}

const Counter = ({ end, suffix = "", duration = 2000, title, icon }: CounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * end));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, isVisible]);

  return (
    <div 
      ref={counterRef}
      className={`bg-white rounded-xl shadow-lg p-8 text-center transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="text-brand flex justify-center mb-4">
        {icon}
      </div>
      <div className="text-4xl lg:text-5xl font-bold mb-2 flex items-center justify-center">
        <span className="animate-count-up">{count}</span>
        <span>{suffix}</span>
      </div>
      <p className="text-gray-600 text-lg">{title}</p>
    </div>
  );
};

const SuccessMetrics = () => {
  const metrics = [
    {
      value: 100,
      suffix: "+",
      title: "Clients Worldwide",
      icon: <Users size={40} />,
    },
    {
      value: 250,
      suffix: "+",
      title: "Projects Completed",
      icon: <CheckCheck size={40} />,
    },
    {
      value: 98,
      suffix: "%",
      title: "Client Satisfaction",
      icon: <Award size={40} />,
    }
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-6">Driving <span className="text-brand">Real Results</span></h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our track record speaks for itself. We've helped businesses across industries transform their operations with Salesforce.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <Counter
              key={index}
              end={metric.value}
              suffix={metric.suffix}
              title={metric.title}
              icon={metric.icon}
              duration={2000 + index * 300}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessMetrics;
