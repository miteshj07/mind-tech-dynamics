
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { supabaseService } from '@/services/supabase-service';
import * as cmsDefaultData from '../data';

// Define the shape of our context
interface CmsContextType {
  data: typeof cmsDefaultData;
  isLoading: boolean;
  error: Error | null;
  updateContent: (section: string, path: string, value: any) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  refreshData: () => Promise<void>;
}

// Create the context
const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<typeof cmsDefaultData>(cmsDefaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch CMS content from Supabase
  const fetchCmsContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Attempting to fetch CMS content from Supabase...");
      const cmsContent = await supabaseService.fetchCmsContent();
      console.log("Fetched CMS content:", cmsContent);
        
      // If no content is returned, we'll use the default data
      if (!cmsContent || cmsContent.length === 0) {
        console.log("No CMS content found in Supabase. Initializing with default data...");
        // Initialize the database with our default content
        for (const [section, sectionData] of Object.entries(cmsDefaultData)) {
          console.log(`Initializing section: ${section}`);
          await supabaseService.updateCmsContent(section, sectionData);
        }
        
        // Now try to fetch the content again
        const refreshedContent = await supabaseService.fetchCmsContent();
        console.log("Refreshed CMS content after initialization:", refreshedContent);
        
        if (refreshedContent && refreshedContent.length > 0) {
          // Transform the fetched data to match our expected structure
          const transformedData: any = { ...cmsDefaultData };
          refreshedContent.forEach((item: any) => {
            transformedData[item.section] = item.data;
          });
          setData(transformedData);
          console.log('Initialized CMS content in Supabase and loaded it');
        } else {
          console.error("Failed to initialize CMS content");
          throw new Error("Failed to initialize CMS content");
        }
      } else {
        // Transform the fetched data to match our expected structure
        const transformedData: any = { ...cmsDefaultData };
        cmsContent.forEach((item: any) => {
          transformedData[item.section] = item.data;
        });
        setData(transformedData);
        console.log('Loaded CMS content from Supabase');
      }
    } catch (err) {
      console.error('Error loading CMS content:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      toast.error("Failed to load content. Showing default data instead.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch content on initial load
  useEffect(() => {
    fetchCmsContent();
  }, []);

  // Function to update CMS content (for admin purposes)
  const updateContent = async (section: string, path: string, value: any) => {
    try {
      console.log(`Updating content for ${section}.${path} to:`, value);
      
      // Create a deep copy of the current data
      const newData = JSON.parse(JSON.stringify(data));
      
      // Split the path into an array
      const pathArray = path.split('.');
      
      // Navigate to the correct location in the object
      let sectionData = newData[section];
      let originalSectionData = sectionData; // Keep reference to the top level section data
      const last = pathArray.pop();
      
      if (!last) return;
      
      for (const key of pathArray) {
        if (sectionData[key] === undefined) {
          sectionData[key] = {};
        }
        sectionData = sectionData[key];
      }
      
      // Update the value
      sectionData[last] = value;
      
      // Update the local state first for immediate UI feedback
      setData(newData);
      
      console.log(`Saving section data to Supabase for section: ${section}`);
      console.log("Updated section data:", originalSectionData);
      
      // Save to Supabase - make sure we're sending the entire section data
      await supabaseService.updateCmsContent(section, originalSectionData);
      
      toast.success(`Content updated successfully`);
      console.log(`CMS: Updated ${section}.${path} successfully`);
    } catch (err) {
      console.error("Error updating CMS content:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      toast.error("Failed to update content");
      
      // Refresh data to ensure consistency after error
      await fetchCmsContent();
    }
  };

  // Function to refresh data from the server
  const refreshData = async () => {
    return fetchCmsContent();
  };

  // Function to upload images (to Supabase Storage)
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const result = await supabaseService.uploadImage(file);
      return result.publicUrl;
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error("Failed to upload image");
      throw err;
    }
  };

  return (
    <CmsContext.Provider value={{ data, isLoading, error, updateContent, uploadImage, refreshData }}>
      {children}
    </CmsContext.Provider>
  );
};

// Custom hook for using the CMS context
export const useCms = () => {
  const context = useContext(CmsContext);
  if (context === undefined) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
