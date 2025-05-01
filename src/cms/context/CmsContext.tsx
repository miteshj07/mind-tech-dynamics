
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import * as cmsDefaultData from '../data';

// Define the shape of our context
interface CmsContextType {
  data: typeof cmsDefaultData;
  isLoading: boolean;
  error: Error | null;
  updateContent: (section: string, path: string, value: any) => void;
  uploadImage: (file: File) => Promise<string>;
  refreshData: () => Promise<void>;
}

// Create the context
const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState(cmsDefaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch CMS content from Supabase
  const fetchCmsContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data: cmsContent, error: fetchError } = await supabase
        .from('cms_content')
        .select('section, data');
        
      if (fetchError) {
        throw new Error(`Error fetching CMS content: ${fetchError.message}`);
      }

      // Transform the fetched data to match our expected structure
      const transformedData: any = { ...cmsDefaultData };
      
      cmsContent.forEach((item) => {
        transformedData[item.section] = item.data;
      });

      setData(transformedData);
      console.log('Loaded CMS content from Supabase');
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
      // Create a deep copy of the current data
      const newData = JSON.parse(JSON.stringify(data));
      
      // Split the path into an array
      const pathArray = path.split('.');
      
      // Navigate to the correct location in the object
      let current = newData;
      let sectionData = newData[section];
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
      
      // Save to Supabase
      const { error: upsertError } = await supabase
        .from('cms_content')
        .upsert({
          section,
          data: newData[section]
        }, {
          onConflict: 'section'
        });
      
      if (upsertError) {
        throw new Error(`Error updating CMS content: ${upsertError.message}`);
      }
      
      toast.success(`Content updated successfully`);
      console.log(`CMS: Updated ${section}.${path} to:`, value);
    } catch (err) {
      console.error("Error updating CMS content:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      toast.error("Failed to update content");
    }
  };

  // Function to refresh data from the server
  const refreshData = async () => {
    return fetchCmsContent();
  };

  // Function to upload images (to Supabase Storage)
  const uploadImage = async (file: File): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        // Upload to Supabase Storage
        const { error: uploadError, data: uploadData } = await supabase
          .storage
          .from('cms')
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }

        // Get public URL
        const { data: urlData } = supabase
          .storage
          .from('cms')
          .getPublicUrl(filePath);
          
        // Store record in images table
        const { error: dbError } = await supabase
          .from('images')
          .insert({
            path: filePath,
            filename: file.name,
            mimetype: file.type,
            size: file.size
          });
          
        if (dbError) {
          console.error("Error recording image metadata:", dbError);
        }

        console.log("Image uploaded successfully");
        resolve(urlData.publicUrl);
      } catch (err) {
        console.error("Error uploading image:", err);
        toast.error("Failed to upload image");
        reject(err);
      }
    });
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
