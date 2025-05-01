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
      
      // Get a reference to the section data
      let sectionData = newData[section];
      if (!sectionData) {
        console.error(`Section ${section} not found in data`);
        toast.error("Failed to update content: Section not found");
        return;
      }
      
      // Keep a reference to the top-level section data for saving later
      const originalSectionData = sectionData;
      
      // Handle array indices in the path
      let current = sectionData;
      const lastKey = pathArray[pathArray.length - 1];
      
      if (pathArray.length > 1) {
        // Navigate to the parent object of the property we want to update
        for (let i = 0; i < pathArray.length - 1; i++) {
          const key = pathArray[i];
          
          // Check if this is an array index notation like items[0]
          const arrayMatch = key.match(/(\w+)\[(\d+)\]/);
          if (arrayMatch) {
            const arrayName = arrayMatch[1];
            const index = parseInt(arrayMatch[2], 10);
            
            if (!current[arrayName] || !Array.isArray(current[arrayName])) {
              console.error(`Array ${arrayName} not found or not an array`);
              toast.error("Failed to update: Invalid path");
              return;
            }
            
            current = current[arrayName][index];
          } else {
            // Regular object property
            if (current[key] === undefined) {
              current[key] = {};
            }
            current = current[key];
          }
          
          if (current === undefined || current === null) {
            console.error(`Path segment ${key} not found in data`);
            toast.error("Failed to update: Path not found");
            return;
          }
        }
      }
      
      // Check if the last part is an array index notation
      const lastArrayMatch = lastKey.match(/(\w+)\[(\d+)\]/);
      if (lastArrayMatch) {
        const arrayName = lastArrayMatch[1];
        const index = parseInt(lastArrayMatch[2], 10);
        
        if (!current[arrayName] || !Array.isArray(current[arrayName])) {
          console.error(`Array ${arrayName} not found or not an array`);
          toast.error("Failed to update: Invalid path");
          return;
        }
        
        current[arrayName][index] = value;
      } else {
        // Update the value at the target path
        current[lastKey] = value;
      }
      
      // Update the local state first for immediate UI feedback
      setData(newData);
      
      console.log(`Saving section data to Supabase for section: ${section}`);
      console.log("Updated section data:", originalSectionData);
      
      // Save to Supabase - make sure we're sending the entire section data
      await supabaseService.updateCmsContent(section, originalSectionData);
      
      toast.success("Content updated successfully");
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
