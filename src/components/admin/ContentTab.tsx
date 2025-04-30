
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import EditableObject from './EditableObject';

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
      {sectionKeys.map((sectionKey) => (
        <React.Fragment key={sectionKey}>
          <EditableObject
            obj={data[sectionKey]}
            section={sectionKey}
            handleEdit={handleEdit}
          />
        </React.Fragment>
      ))}
    </TabsContent>
  );
};

export default ContentTab;
