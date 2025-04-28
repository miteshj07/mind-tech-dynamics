
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const calculateTranslate = (factor: number) => {
    const x = (mousePosition.x - 0.5) * factor;
    const y = (mousePosition.y - 0.5) * factor;
    return `translate(${x}px, ${y}px)`;
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand/10 blur-3xl"
          style={{ transform: calculateTranslate(40) }}
        />
        <div 
          className="absolute top-1/2 -left-20 w-72 h-72 rounded-full bg-brand/15 blur-3xl"
          style={{ transform: calculateTranslate(20) }}
        />
        <div 
          className="absolute -bottom-40 right-1/4 w-80 h-80 rounded-full bg-brand/20 blur-3xl"
          style={{ transform: calculateTranslate(30) }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`text-white transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h1 className="heading-xl mb-6">
              Empowering Businesses with <span className="text-brand">Smart Salesforce Solutions</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Unlock new growth with customized CRM experiences tailored to your business needs. Leverage the power of Salesforce with expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="btn-primary text-lg" size="lg">
                <Link to="/contact-us">
                  Book a Free Consultation <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild className="btn-secondary text-lg" size="lg">
                <Link to="/services">
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>

          <div 
            className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transform: calculateTranslate(-15) }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand to-blue-500 rounded-xl blur opacity-30"></div>
              <div className="relative bg-black rounded-xl p-6 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Salesforce Dashboard" 
                  className="w-full h-auto rounded-lg shadow-lg" 
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="text-black font-bold">98%</div>
                  <div className="text-xs text-gray-600">Client Satisfaction</div>
                </div>
                <div className="absolute -top-6 -left-6 bg-brand p-4 rounded-lg shadow-lg">
                  <div className="text-white font-bold">100+</div>
                  <div className="text-xs text-white/80">Clients Worldwide</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
