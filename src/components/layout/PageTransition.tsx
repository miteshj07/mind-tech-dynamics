
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Set a very short timeout to ensure the DOM has time to update
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <div 
      className={`page-transition transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-70'
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
