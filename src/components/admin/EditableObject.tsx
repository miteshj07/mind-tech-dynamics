
import React from 'react';
import { Button } from '@/components/ui/button';
import EditableField from './EditableField';

interface EditableObjectProps {
  obj: any;
  section: string;
  path?: string;
  handleEdit: (section: string, path: string, value: any, type?: string) => void;
}

const EditableObject: React.FC<EditableObjectProps> = ({
  obj,
  section,
  path = '',
  handleEdit
}) => {
  if (!obj || typeof obj !== 'object') return null;
  
  return Object.entries(obj).map(([key, value]) => {
    const currentPath = path ? `${path}.${key}` : key;
    
    // Skip rendering functions or React components
    if (typeof value === 'function') return null;
    
    // Skip testimonials array from testimonialSection as it's handled separately
    if (section === 'testimonialsSection' && key === 'testimonials') {
      return null;
    }
    
    if (Array.isArray(value)) {
      return (
        <div key={currentPath} className="mb-6 border-l-2 border-gray-200 pl-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-700">{key}</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleEdit(section, currentPath, value)}
            >
              Edit Array
            </Button>
          </div>
          <div className="pl-4">
            {(value as any[]).map((item, index) => (
              <div key={index} className="mb-4 p-2 bg-gray-50 rounded-md">
                {typeof item === 'object' && item !== null ? (
                  <EditableObject
                    obj={item}
                    section={section}
                    path={`${currentPath}[${index}]`}
                    handleEdit={handleEdit}
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">{String(item)}</div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(section, `${currentPath}[${index}]`, item)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <div key={currentPath} className="mb-6 border-l-2 border-gray-200 pl-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">{key}</h3>
          <EditableObject 
            obj={value} 
            section={section} 
            path={currentPath} 
            handleEdit={handleEdit} 
          />
        </div>
      );
    } else {
      return (
        <EditableField
          key={currentPath}
          fieldKey={key}
          fieldValue={value}
          path={path}
          section={section}
          handleEdit={handleEdit}
        />
      );
    }
  });
};

export default EditableObject;
