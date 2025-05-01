
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
  const [validationError, setValidationError] = React.useState<string | null>(null);

  // Reset validation error when value changes
  React.useEffect(() => {
    setValidationError(null);
  }, [currentValue]);

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

  const validateJSON = (jsonString: string): boolean => {
    if (jsonString.startsWith('[') || jsonString.startsWith('{')) {
      try {
        JSON.parse(jsonString);
        return true;
      } catch (e) {
        setValidationError("Invalid JSON format. Please check your syntax.");
        return false;
      }
    }
    return true;
  };

  const onSave = async () => {
    // Validate JSON if applicable
    if (!validateJSON(currentValue)) {
      return;
    }

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

  // Determine if we're editing a section title or important field to show a warning
  const isImportantField = editing.path.includes('title') || 
                          editing.path.includes('heading') || 
                          editing.path.includes('name') || 
                          editing.path.endsWith('email') ||
                          editing.path.endsWith('phone');

  return (
    <Dialog open={true} onOpenChange={() => handleCancel()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Edit {editing.path}
            {isImportantField && " (Important Field)"}
          </DialogTitle>
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
          currentValue.length > 100 || currentValue.includes('\n') || currentValue.startsWith('{') || currentValue.startsWith('[') ? (
            <>
              <Textarea 
                value={currentValue}
                onChange={handleValueChange}
                className="min-h-[300px] font-mono text-sm mb-4"
              />
              {validationError && (
                <div className="text-red-500 text-sm mb-4">{validationError}</div>
              )}
              {(currentValue.startsWith('{') || currentValue.startsWith('[')) && (
                <div className="text-amber-600 text-sm mb-4">
                  <p>Editing JSON content. Please maintain valid JSON format.</p>
                </div>
              )}
            </>
          ) : (
            <Input 
              value={currentValue}
              onChange={handleValueChange}
              className="mb-4"
            />
          )
        )}
        
        <div className="flex justify-between space-x-2">
          <div>
            {isImportantField && (
              <div className="text-amber-600 text-sm">
                ⚠️ This is a key field that appears prominently on the site
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel} disabled={isSaving}>Cancel</Button>
            <Button onClick={onSave} disabled={isSaving || !!validationError}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditContentModal;
