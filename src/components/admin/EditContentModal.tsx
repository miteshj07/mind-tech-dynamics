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
  handleSave: (currentValue: string) => Promise<void>;
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
  const [currentValue, setCurrentValue] = React.useState(editing.value);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCurrentValue(newValue);
    setEditing({...editing, value: newValue});
  };

  const onSave = async () => {
    setIsSaving(true);
    try {
      await handleSave(currentValue);
      toast.success("Content saved successfully");
      handleCancel();
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => handleCancel()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {editing.path}</DialogTitle>
        </DialogHeader>
        
        {editing.type === 'image' ? (
          <div className="space-y-4">
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center">
              {currentValue && (
                <img 
                  src={currentValue} 
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
              value={currentValue}
              onChange={handleValueChange}
              className="mb-4"
              placeholder="Or enter image URL directly"
            />
          </div>
        ) : (
          currentValue.length > 100 || currentValue.includes('\n') ? (
            <Textarea 
              value={currentValue}
              onChange={handleValueChange}
              className="min-h-[200px] mb-4"
            />
          ) : (
            <Input 
              value={currentValue}
              onChange={handleValueChange}
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
      </DialogContent>
    </Dialog>
  );
};

export default EditContentModal;
