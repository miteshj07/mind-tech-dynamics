
import React, { useState } from 'react';
import { useCms } from '@/cms/context/CmsContext';
import PageHeader from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/sonner';
import EditContentModal from '@/components/admin/EditContentModal';
import ContentTab from '@/components/admin/ContentTab';
import BlogManager from '@/components/admin/BlogManager';
import LogoutButton from '@/components/auth/LogoutButton';
import AnalyticsTab from '@/components/admin/analytics/AnalyticsTab';

const Admin = () => {
  const { data, updateContent, uploadImage, refreshData } = useCms();
  const [activeTab, setActiveTab] = useState("home");
  const [editing, setEditing] = useState<{
    section: string;
    path: string;
    value: string;
    originalValue: string;
    type?: string;
  } | null>(null);

  const handleEdit = (section: string, path: string, value: any, type?: string) => {
    console.log("Editing:", { section, path, value, type });
    setEditing({
      section,
      path,
      value: typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value),
      originalValue: typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value),
      type
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editing) return;
    
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      // Upload the image and get the result
      const imageResult = await uploadImage(file);
      console.log("Image uploaded successfully:", imageResult);
      
      // Update the editing state with the new URL
      setEditing(prev => {
        if (!prev) return null;
        return {...prev, value: imageResult.publicUrl};
      });
      
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error(`Error uploading image: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleSave = async (currentValue: string) => {
    if (!editing) return;
    
    try {
      // For arrays or objects, parse the JSON
      let value = currentValue;
      if (typeof currentValue === 'string' && (currentValue.startsWith('[') || currentValue.startsWith('{'))) {
        try {
          value = JSON.parse(currentValue);
        } catch (e) {
          console.error("JSON parse error:", e);
          toast.error("Invalid JSON. Please check your formatting.");
          return;
        }
      }
      
      console.log(`Saving content update for ${editing.section}.${editing.path}:`, value);
      await updateContent(editing.section, editing.path, value);
      toast.success("Content updated successfully");
      setEditing(null);
      
      // Refresh data to ensure we have the latest
      await refreshData();
    } catch (err) {
      console.error("Save error:", err);
      toast.error(`Error updating content: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleCancel = () => {
    setEditing(null);
  };

  return (
    <>
      <PageHeader 
        title="Content Management" 
        subtitle="Edit website content and manage CMS data"
      />
      
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Alert className="flex-grow mr-4">
              <AlertTitle>CMS Admin Interface</AlertTitle>
              <AlertDescription>
                This interface allows you to edit content on your website. Changes will be immediately visible on the site.
              </AlertDescription>
            </Alert>
            <LogoutButton />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-10 w-full">
              <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="about">About Us</TabsTrigger>
              <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
              <TabsTrigger value="blog-manager">✍️ Blog Manager</TabsTrigger>
              <TabsTrigger value="blog">Blog Page</TabsTrigger>
              <TabsTrigger value="careers">Careers</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="footer">Footer</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-4">
              <AnalyticsTab />
            </TabsContent>

            <TabsContent value="blog-manager" className="space-y-4">
              <BlogManager />
            </TabsContent>
            
            {/* ContentTab renders each section in the CMS */}
            <ContentTab
              value="home"
              title="Home Page Content"
              data={data}
              sectionKeys={[
                'heroSection', 
                'whyChooseUsSection',
                'servicesSection', 
                'successMetricsSection',
                'testimonialsSection',
                'seoMetadata.home'
              ]}
              handleEdit={handleEdit}
            />
            
            <ContentTab
              value="services"
              title="Services Page Content"
              data={data}
              sectionKeys={['servicesSection', 'seoMetadata.services', 'sharedComponents.contactCTA.services']}
              handleEdit={handleEdit}
            />
            
            <ContentTab
              value="about"
              title="About Us Page Content"
              data={data}
              sectionKeys={['aboutUsSection', 'seoMetadata.aboutUs', 'sharedComponents.contactCTA.aboutUs']}
              handleEdit={handleEdit}
            />
            
            <ContentTab
              value="case-studies"
              title="Case Studies Page Content"
              data={data}
              sectionKeys={['caseStudiesSection', 'seoMetadata.caseStudies', 'sharedComponents.contactCTA.caseStudies']}
              handleEdit={handleEdit}
            />
            
            <ContentTab
              value="blog"
              title="Blog Page Content"
              data={data}
              sectionKeys={['blogSection', 'seoMetadata.blog', 'sharedComponents.contactCTA.blog']}
              handleEdit={handleEdit}
            />
            
            <ContentTab
              value="careers"
              title="Careers Page Content"
              data={data}
              sectionKeys={['careersSection', 'seoMetadata.careers', 'sharedComponents.contactCTA.careers']}
              handleEdit={handleEdit}
            />
            
            <ContentTab
              value="contact"
              title="Contact Page Content"
              data={data}
              sectionKeys={['contactSection', 'seoMetadata.contactUs']}
              handleEdit={handleEdit}
            />
            
            <ContentTab
              value="footer"
              title="Footer Content"
              data={data}
              sectionKeys={['footerSection']}
              handleEdit={handleEdit}
            />
          </Tabs>
        </div>
      </section>
      
      {editing && (
        <EditContentModal
          editing={editing}
          setEditing={setEditing}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleImageChange={handleImageChange}
        />
      )}
    </>
  );
};

export default Admin;
