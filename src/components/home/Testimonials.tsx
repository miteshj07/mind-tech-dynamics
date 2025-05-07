import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useCms } from '@/cms/context/CmsContext';
interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  rating: number;
}
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const {
    data
  } = useCms();
  const {
    testimonialsSection
  } = data;
  const testimonials: Testimonial[] = testimonialsSection.testimonials;
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1);
    }, 8000); // Increased timer to allow reading longer testimonials

    return () => {
      clearInterval(interval);
    };
  }, [testimonials.length]);
  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };
  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };
  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };
  return <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4" dangerouslySetInnerHTML={{
          __html: testimonialsSection.title
        }} />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {testimonialsSection.subtitle}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Slider with updated min-height to auto */}
          <div className="overflow-hidden">
            <div className="relative">
              {testimonials.map((testimonial, index) => <div key={index} className={`absolute w-full transition-all duration-500 ease-in-out ${index === activeIndex ? 'opacity-100 translate-x-0 relative' : index < activeIndex ? 'opacity-0 -translate-x-full absolute' : 'opacity-0 translate-x-full absolute'}`}>
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-12 mb-12">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4 md:mb-6">
                      {[...Array(testimonial.rating || 5)].map((_, i) => <Star key={i} size={20} className="text-brand md:w-7 md:h-7" fill="#50B848" />)}
                    </div>
                    
                    {/* Quote with better handling for long content */}
                    <p className="text-lg md:text-2xl text-gray-800 mb-6 md:mb-8 relative break-words">
                      {testimonial.quote}
                    </p>
                    
                    {/* Author info */}
                    <div className="flex items-center">
                      <div>
                        <h4 className="text-base md:text-xl font-bold text-gray-900">{testimonial.author}</h4>
                        <p className="text-sm md:text-base text-gray-600">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          
          {/* Navigation arrows positioned differently to avoid content overlap */}
          
          
          
          {/* Dots moved below with more margin to avoid overlapping with content */}
          <div className="flex justify-center space-x-2 mt-4">
            {testimonials.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-brand w-6' : 'bg-gray-300'}`} aria-label={`Go to testimonial ${index + 1}`} />)}
          </div>
        </div>
      </div>
    </section>;
};
export default Testimonials;