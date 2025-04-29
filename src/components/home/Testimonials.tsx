import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  rating: number;
  image?: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials: Testimonial[] = [
    {
      quote: "Meet The Mind transformed our Salesforce implementation from a complex challenge to a strategic advantage. Their team's expertise and attention to detail were exceptional.",
      author: "Sarah Johnson",
      position: "CTO",
      company: "TechStart Solutions",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/23.jpg"
    },
    {
      quote: "The customized Salesforce solution developed by Meet The Mind has streamlined our sales processes and provided unprecedented visibility into our pipeline.",
      author: "Michael Chen",
      position: "VP of Sales",
      company: "Global Innovations Inc.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    {
      quote: "Working with Meet The Mind was refreshingly efficient. They understood our unique needs and delivered a tailored solution that increased our team's productivity by 40%.",
      author: "Jessica Martinez",
      position: "Operations Director",
      company: "Elevate Marketing Group",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/45.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">What Our <span className="text-brand">Clients Say</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with Meet The Mind.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Slider */}
          <div className="overflow-hidden">
            <div className="relative min-h-[320px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute w-full transition-all duration-500 ease-in-out ${
                    index === activeIndex 
                      ? 'opacity-100 translate-x-0' 
                      : index < activeIndex 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-12">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4 md:mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="text-brand md:w-7 md:h-7"
                          fill="#50B848"
                        />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <p className="text-lg md:text-2xl text-gray-800 mb-6 md:mb-8 relative">
                      {testimonial.quote}
                    </p>
                    
                    {/* Author info */}
                    <div className="flex items-center gap-3 md:gap-4">
                      {testimonial.image && (
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h4 className="text-base md:text-xl font-bold text-gray-900">{testimonial.author}</h4>
                        <p className="text-sm md:text-base text-gray-600">{testimonial.position}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            className="absolute top-1/2 -left-5 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors text-gray-700 hidden md:block"
            onClick={goToPrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="absolute top-1/2 -right-5 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors text-gray-700 hidden md:block"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-brand w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
