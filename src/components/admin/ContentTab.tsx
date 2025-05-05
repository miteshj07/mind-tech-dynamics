
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import EditableObject from './EditableObject';
import TestimonialManager from './TestimonialManager';

interface ContentTabProps {
  value: string;
  title: string;
  data: any;
  sectionKeys: string[];
  handleEdit: (section: string, path: string, value: any, type?: string) => void;
}

const ContentTab: React.FC<ContentTabProps> = ({
  value,
  title,
  data,
  sectionKeys,
  handleEdit
}) => {
  return (
    <TabsContent value={value} className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {sectionKeys.map((sectionKey) => {
        // Check if the section exists in data
        if (!data[sectionKey]) {
          return (
            <div key={sectionKey} className="p-4 border border-amber-200 bg-amber-50 rounded-md">
              <p className="text-amber-800">Section <strong>{sectionKey}</strong> was not found in the CMS data.</p>
            </div>
          );
        }
        
        // Special handling for testimonials section
        if (sectionKey === 'testimonialsSection' && data[sectionKey]?.testimonials) {
          return (
            <React.Fragment key={sectionKey}>
              <h3 className="text-lg font-semibold mt-6 mb-2 p-2 bg-gray-100 rounded">
                {sectionKey}
              </h3>
              <EditableObject
                obj={{ 
                  title: data[sectionKey].title, 
                  subtitle: data[sectionKey].subtitle 
                }}
                section={sectionKey}
                handleEdit={handleEdit}
              />
              <TestimonialManager 
                testimonials={data[sectionKey].testimonials} 
                sectionName={sectionKey}
                pathName="testimonials"
              />
            </React.Fragment>
          );
        }
        
        return (
          <React.Fragment key={sectionKey}>
            <h3 className="text-lg font-semibold mt-6 mb-2 p-2 bg-gray-100 rounded">
              {sectionKey}
            </h3>
            <EditableObject
              obj={data[sectionKey]}
              section={sectionKey}
              handleEdit={handleEdit}
            />
          </React.Fragment>
        );
      })}
    </TabsContent>
  );
};

export default ContentTab;
