
import React, { useState, useRef } from 'react';
import { useCms } from '@/cms/context/CmsContext';
import PageHeader from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Image, Upload } from 'lucide-react';

const Admin = () => {
  const { data, updateContent, uploadImage } = useCms();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("home");
  const [editing, setEditing] = useState<{
    section: string;
    path: string;
    value: string;
    originalValue: string;
    type?: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (section: string, path: string, value: any, type?: string) => {
    setEditing({
      section,
      path,
      value: typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value),
      originalValue: typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value),
      type
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editing) return;
    
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setEditing({...editing, value: imageUrl});
        toast({
          title: "Image uploaded",
          description: "Image has been uploaded successfully",
        });
      }
    } catch (err) {
      toast({
        title: "Error uploading image",
        description: String(err),
        variant: "destructive"
      });
    }
  };

  const handleSave = () => {
    if (!editing) return;
    
    try {
      // For arrays or objects, parse the JSON
      let value = editing.value;
      if (editing.value.startsWith('[') || editing.value.startsWith('{')) {
        try {
          value = JSON.parse(editing.value);
        } catch (e) {
          toast({
            title: "Invalid JSON",
            description: "Please check your formatting",
            variant: "destructive"
          });
          return;
        }
      }
      
      updateContent(editing.section, editing.path, value);
      toast({
        title: "Content updated",
        description: `Updated ${editing.path} successfully`,
      });
      setEditing(null);
    } catch (err) {
      toast({
        title: "Error updating content",
        description: String(err),
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditing(null);
  };

  // Helper to render editable fields recursively
  const renderEditableFields = (obj: any, section: string, path = '') => {
    if (!obj || typeof obj !== 'object') return null;
    
    return Object.entries(obj).map(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      
      // Skip rendering functions or React components
      if (typeof value === 'function') return null;
      
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
                  {typeof item === 'object' ? (
                    renderEditableFields(item, section, `${currentPath}[${index}]`)
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
            {renderEditableFields(value, section, currentPath)}
          </div>
        );
      } else {
        // Detect if it's likely an image URL
        const isImage = typeof value === 'string' && 
          (value.match(/\.(jpeg|jpg|gif|png)$/) !== null || 
          value.includes('unsplash.com') || 
          value.includes('randomuser.me'));
          
        return (
          <div key={currentPath} className="mb-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">{key}</label>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleEdit(section, currentPath, value, isImage ? 'image' : undefined)}
              >
                {isImage ? 'Change Image' : 'Edit'}
              </Button>
            </div>
            <div className="mt-1 mb-2 p-2 bg-gray-50 rounded-md">
              {isImage ? (
                <div className="relative h-40 bg-gray-100 rounded overflow-hidden">
                  <img 
                    src={value as string} 
                    alt={key} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : typeof value === 'string' && value.length > 100 ? (
                <div className="text-sm text-gray-500">{value.substring(0, 100)}...</div>
              ) : (
                <div className="text-sm text-gray-500">{String(value)}</div>
              )}
            </div>
          </div>
        );
      }
    });
  };

  return (
    <>
      <PageHeader 
        title="Content Management" 
        subtitle="Edit website content and manage CMS data"
      />
      
      <section className="py-10">
        <div className="container mx-auto px-4">
          <Alert className="mb-6">
            <AlertTitle>CMS Admin Interface</AlertTitle>
            <AlertDescription>
              This interface allows you to edit content on your website. Changes will be immediately visible on the site.
            </AlertDescription>
          </Alert>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-7 w-full">
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="about">About Us</TabsTrigger>
              <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="careers">Careers</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="home" className="space-y-4">
              <h2 className="text-xl font-bold">Home Page Content</h2>
              {renderEditableFields(data.heroSection, 'heroSection')}
              {renderEditableFields(data.servicesSection, 'servicesSection')}
            </TabsContent>
            
            <TabsContent value="services" className="space-y-4">
              <h2 className="text-xl font-bold">Services Page Content</h2>
              {renderEditableFields(data.servicesSection, 'servicesSection')}
              {renderEditableFields(data.sharedComponents.contactCTA.services, 'sharedComponents.contactCTA.services')}
            </TabsContent>
            
            <TabsContent value="about" className="space-y-4">
              <h2 className="text-xl font-bold">About Us Page Content</h2>
              {renderEditableFields(data.aboutUsSection, 'aboutUsSection')}
              {renderEditableFields(data.sharedComponents.contactCTA.aboutUs, 'sharedComponents.contactCTA.aboutUs')}
            </TabsContent>
            
            <TabsContent value="case-studies" className="space-y-4">
              <h2 className="text-xl font-bold">Case Studies Page Content</h2>
              {renderEditableFields(data.caseStudiesSection, 'caseStudiesSection')}
              {renderEditableFields(data.sharedComponents.contactCTA.caseStudies, 'sharedComponents.contactCTA.caseStudies')}
            </TabsContent>
            
            <TabsContent value="blog" className="space-y-4">
              <h2 className="text-xl font-bold">Blog Page Content</h2>
              {renderEditableFields(data.blogSection, 'blogSection')}
              {renderEditableFields(data.sharedComponents.contactCTA.blog, 'sharedComponents.contactCTA.blog')}
            </TabsContent>
            
            <TabsContent value="careers" className="space-y-4">
              <h2 className="text-xl font-bold">Careers Page Content</h2>
              {renderEditableFields(data.careersSection, 'careersSection')}
              {renderEditableFields(data.sharedComponents.contactCTA.careers, 'sharedComponents.contactCTA.careers')}
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <h2 className="text-xl font-bold">Contact Page Content</h2>
              {renderEditableFields(data.contactSection, 'contactSection')}
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit {editing.path}</h2>
            
            {editing.type === 'image' ? (
              <div className="space-y-4">
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center">
                  <img 
                    src={editing.value} 
                    alt="Preview" 
                    className="max-h-[200px] object-contain mb-4" 
                  />
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
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
