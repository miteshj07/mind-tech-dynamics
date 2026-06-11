
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useCms } from '@/cms/context/CmsContext';

const HeroSection = () => {
  const { data } = useCms();
  const { heroSection } = data;
  
  const [isLoaded, setIsLoaded] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Track mouse position for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const calculateTranslate = (factor: number) => {
    const x = (mousePosition.x - 0.5) * factor;
    const y = (mousePosition.y - 0.5) * factor;
    return `translate(${x}px, ${y}px)`;
  };

  return (
    <section 
      ref={parallaxRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-br from-white to-gray-100"
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div 
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-brand/5 blur-3xl"
          style={{ transform: calculateTranslate(40) }}
        />
        <div 
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand/10 blur-3xl"
          style={{ transform: calculateTranslate(20) }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-brand/15 blur-3xl"
          style={{ transform: calculateTranslate(30) }}
        />
        
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-10"
          style={{ 
            transform: `translateY(${scrollY * 0.1}px)` 
          }}
        />
        
        {/* Floating elements */}
        <div 
          className="absolute top-1/4 right-1/4 w-12 h-12 bg-brand opacity-20 rounded-full"
          style={{ 
            transform: `translate(${Math.sin(Date.now() * 0.001) * 20}px, ${Math.cos(Date.now() * 0.001) * 20}px)`,
            animation: 'float 8s ease-in-out infinite' 
          }}
        />
        <div 
          className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-brand/30 rounded-full"
          style={{ animation: 'float 6s ease-in-out infinite 1s' }}
        />
        <div 
          className="absolute top-1/2 left-1/4 w-16 h-16 border border-brand/20 rounded-full"
          style={{ animation: 'float 10s ease-in-out infinite 0.5s' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-gray-800"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center mb-4"
            >
              <Sparkles className="h-5 w-5 text-brand mr-2" />
              <span className="text-brand font-medium">Transform Your Business with Salesforce</span>
            </motion.div>
            
            <motion.h1 
              className="heading-xl mb-6 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="relative">
                <span className="relative z-10 text-brand">{heroSection.headline}</span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-brand/10 rounded-full -z-0"></span>
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {heroSection.subheadline}
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Button asChild className="btn-primary text-lg group" size="lg">
                <Link to="/contact-us" className="group">
                  {heroSection.ctaPrimary}{" "}
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
                </Link>
              </Button>
              <Button asChild className="btn-secondary text-lg" size="lg">
                <Link to="/services">
                  {heroSection.ctaSecondary}
                </Link>
              </Button>
            </motion.div>

            {/* Trust badge strip */}
            <motion.div
              className="flex flex-wrap items-center gap-3 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <a
                href="https://www.salesforce.com/trailblazer/mjain31"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A1E0]/40 bg-[#00A1E0]/5 text-[#00A1E0] text-sm font-semibold hover:bg-[#00A1E0]/10 transition-colors"
              >
                <ShieldCheck size={16} />
                Salesforce Consulting Partner
              </a>
              <a
                href="https://www.salesforce.com/trailblazer/mjain31"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/30 bg-brand/5 text-brand text-sm font-semibold hover:bg-brand/10 transition-colors"
              >
                <Award size={16} />
                Certified Trailblazer
              </a>
              <a
                href="https://www.salesforce.com/trailblazer/mjain31"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/30 bg-brand/5 text-brand text-sm font-semibold hover:bg-brand/10 transition-colors"
              >
                <ShieldCheck size={16} />
                5× Salesforce Certified
              </a>
              <a
                href="https://www.salesforce.com/trailblazer/mjain31"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A1E0]/40 bg-[#00A1E0]/5 text-[#00A1E0] text-sm font-semibold hover:bg-[#00A1E0]/10 transition-colors"
              >
                <Award size={16} />
                Agentblazer Innovator 2025
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
            style={{ transform: calculateTranslate(-15) }}
          >
            <motion.div 
              className="relative z-10"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand/70 to-brand/30 rounded-xl blur-md opacity-70"></div>
                <div className="relative bg-white rounded-xl p-6 shadow-2xl">
                  <img 
                    src={heroSection.image} 
                    alt="Salesforce Dashboard" 
                    className="w-full h-auto rounded-lg shadow-lg" 
                  />
                  
                  <motion.div 
                    className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
                  >
                    <motion.div 
                      className="text-black font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                    >
                      {heroSection.stats.satisfaction}
                    </motion.div>
                    <div className="text-xs text-gray-600">Client Satisfaction</div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -top-6 -left-6 bg-brand p-4 rounded-lg shadow-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
                  >
                    <motion.div 
                      className="text-white font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.7, duration: 0.5 }}
                    >
                      {heroSection.stats.clients}
                    </motion.div>
                    <div className="text-xs text-white/80">Clients Worldwide</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -bottom-10 -left-10 w-20 h-20 border-2 border-dashed border-brand/30 rounded-lg z-0"
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            
            <motion.div
              className="absolute -top-5 right-10 w-12 h-12 border border-brand/20 rounded-full z-0"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
