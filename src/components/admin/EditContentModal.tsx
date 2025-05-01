
import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EditContentModalProps {
  editing: {
    section: string;
    path: string;
    value: string;
    originalValue: string;
    type?: string;
  };
  setEditing: React.Dispatch<React.SetStateAction<{
    section: string;
    path: string;
    value: string;
    originalValue: string;
    type?: string;
  } | null>>;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const EditContentModal: React.FC<EditContentModalProps> = ({
  editing,
  setEditing,
  handleSave,
  handleCancel,
  handleImageChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSave = async () => {
    setIsSaving(true);
    try {
      await handleSave();
      toast.success("Content saved successfully");
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit {editing.path}</h2>
        
        {editing.type === 'image' ? (
          <div className="space-y-4">
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center">
              {editing.value && (
                <img 
                  src={editing.value} 
                  alt="Preview" 
                  className="max-h-[200px] object-contain mb-4" 
                />
              )}
              <Button 
                onClick={handleImageClick} 
                className="flex items-center gap-2"
              >
                <Upload size={16} />
                Upload New Image
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            
            <Input 
              value={editing.value}
              onChange={(e) => setEditing({...editing, value: e.target.value})}
              className="mb-4"
              placeholder="Or enter image URL directly"
            />
          </div>
        ) : (
          editing.value.length > 100 || editing.value.includes('\n') ? (
            <Textarea 
              value={editing.value}
              onChange={(e) => setEditing({...editing, value: e.target.value})}
              className="min-h-[200px] mb-4"
            />
          ) : (
            <Input 
              value={editing.value}
              onChange={(e) => setEditing({...editing, value: e.target.value})}
              className="mb-4"
            />
          )
        )}
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel} disabled={isSaving}>Cancel</Button>
          <Button onClick={onSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditContentModal;
