
import React from 'react';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';

interface EditableFieldProps {
  fieldKey: string;
  fieldValue: any;
  path: string;
  section: string;
  handleEdit: (section: string, path: string, value: any, type?: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({
  fieldKey,
  fieldValue,
  path,
  section,
  handleEdit
}) => {
  // Detect if it's likely an image URL
  const isImage = typeof fieldValue === 'string' && 
    (fieldValue.match(/\.(jpeg|jpg|gif|png)$/) !== null || 
    fieldValue.includes('unsplash.com') || 
    fieldValue.includes('randomuser.me') ||
    fieldValue.includes('data:image'));

  const currentPath = path ? `${path}.${fieldKey}` : fieldKey;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">{fieldKey}</label>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => handleEdit(section, currentPath, fieldValue, isImage ? 'image' : undefined)}
        >
          {isImage ? (
            <>
              <Image className="mr-1" size={16} />
              Change Image
            </>
          ) : 'Edit'}
        </Button>
      </div>
      <div className="mt-1 mb-2 p-2 bg-gray-50 rounded-md">
        {isImage ? (
          <div className="relative h-40 bg-gray-100 rounded overflow-hidden">
            <img 
              src={fieldValue} 
              alt={fieldKey} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : typeof fieldValue === 'string' && fieldValue.length > 100 ? (
          <div className="text-sm text-gray-500">{fieldValue.substring(0, 100)}...</div>
        ) : (
          <div className="text-sm text-gray-500">{String(fieldValue)}</div>
        )}
      </div>
    </div>
  );
};

export default EditableField;
