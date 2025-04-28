
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  bgClass?: string;
}

const PageHeader = ({ title, subtitle, bgClass = "bg-gray-900" }: PageHeaderProps) => {
  return (
    <div className={`${bgClass} text-white pt-32 pb-20`}>
      <div className="container mx-auto px-4 text-center">
        <h1 className="heading-lg mb-4">{title}</h1>
        {subtitle && <p className="text-xl max-w-3xl mx-auto text-gray-300">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
