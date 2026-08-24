
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { supabaseService, UploadImageResult } from '@/services/supabase-service';
import * as cmsDefaultData from '../data';

// Define the shape of our context
interface CmsContextType {
  data: typeof cmsDefaultData;
  isLoading: boolean;
  error: Error | null;
  updateContent: (section: string, path: string, value: any) => Promise<void>;
  uploadImage: (file: File) => Promise<UploadImageResult>;
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
        console.log("No CMS content found in Supabase. Attempting to seed default data...");
        // Best-effort: try to seed the database with our default content.
        // Under the locked-down RLS policies (see supabase/security-hotfix.sql)
        // cms_content writes are admin-only, so for anonymous visitors these
        // writes are EXPECTED to fail. That is not an error condition for the
        // public site: we simply render the bundled defaults from memory.
        try {
          for (const [section, sectionData] of Object.entries(cmsDefaultData)) {
            await supabaseService.updateCmsContent(section, sectionData, { silent: true });
          }

          // Seeding succeeded (admin session): load what we just wrote.
          const refreshedContent = await supabaseService.fetchCmsContent();

          if (refreshedContent && refreshedContent.length > 0) {
            // Transform the fetched data to match our expected structure
            const transformedData: any = { ...cmsDefaultData };
            refreshedContent.forEach((item: any) => {
              transformedData[item.section] = item.data;
            });
            setData(transformedData);
            console.log('Initialized CMS content in Supabase and loaded it');
          } else {
            setData(cmsDefaultData);
          }
        } catch (seedError) {
          // Expected for anon visitors (RLS blocks the write). Fall back to
          // the bundled defaults — no crash, no error state, no toast.
          console.warn(
            'CMS seed skipped (writes are admin-only under RLS); using bundled defaults.',
            seedError
          );
          setData(cmsDefaultData);
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

  // Helper function to set a value at a specific path in an object
  const setValueAtPath = (obj: any, path: string[], value: any): any => {
    // If we've reached the end of the path, return the value
    if (path.length === 0) return value;
    
    // Clone the object or array to avoid mutating the original
    const result = Array.isArray(obj) ? [...obj] : { ...obj };
    
    // Get the current path segment
    const key = path[0];
    
    // Check for array index pattern like "items[3]"
    const arrayMatch = typeof key === 'string' && key.match(/^(.+)\[(\d+)\]$/);
    
    if (arrayMatch) {
      // Handle array index notation
      const arrayName = arrayMatch[1];
      const index = parseInt(arrayMatch[2], 10);
      
      if (!result[arrayName]) {
        result[arrayName] = [];
      }
      
      // Make sure array has enough elements
      while (result[arrayName].length <= index) {
        result[arrayName].push(null);
      }
      
      // Set value at the specified index
      result[arrayName][index] = setValueAtPath(result[arrayName][index] || {}, path.slice(1), value);
    } else {
      // Handle regular object property
      if (path.length === 1) {
        // Last level, just set the value
        result[key] = value;
      } else {
        // Initialize the next level if needed
        if (result[key] === undefined || result[key] === null) {
          result[key] = {};
        }
        
        // Continue recursion
        result[key] = setValueAtPath(result[key], path.slice(1), value);
      }
    }
    
    return result;
  };

  // Function to update CMS content (for admin purposes)
  const updateContent = async (section: string, path: string, value: any) => {
    try {
      console.log('=== CMS Context: Starting Content Update ===');
      console.log(`Section: ${section}`);
      console.log(`Path: ${path}`);
      console.log('New Value:', value);
      
      // Create a deep copy of the current data
      const newData = JSON.parse(JSON.stringify(data));
      console.log('Current Data State:', newData);
      
      // If the section doesn't exist in our data, create it
      if (!newData[section]) {
        console.log(`Creating new section: ${section}`);
        newData[section] = {};
      }
      
      // Split the path into an array and handle array indices
      const pathParts = path.split('.').map(part => {
        // Check for array notation like items[0]
        const arrayMatch = part.match(/^(.+)\[(\d+)\]$/);
        if (arrayMatch) {
          return arrayMatch[1] + '[' + arrayMatch[2] + ']';
        }
        return part;
      });
      
      console.log('Path parts:', pathParts);
      
      // Update the value at the specified path
      newData[section] = setValueAtPath(newData[section], pathParts, value);
      console.log('Updated section data:', newData[section]);
      
      // Save to Supabase
      console.log('Saving to Supabase...');
      const result = await supabaseService.updateCmsContent(section, newData[section]);
      
      if (!result) {
        console.error('No result returned from Supabase update');
        throw new Error('Failed to update content in database');
      }
      
      console.log('Supabase update successful:', result);
      
      // Update local state
      console.log('Updating local state...');
      setData(newData);
      
      console.log('=== CMS Context: Content Update Completed Successfully ===');
    } catch (err) {
      console.error('=== CMS Context: Content Update Failed ===');
      console.error('Error details:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      toast.error("Failed to update content");
      throw err;
    }
  };

  // Function to refresh data from the server
  const refreshData = async () => {
    return fetchCmsContent();
  };

  // Function to upload images (to Supabase Storage)
  const uploadImage = async (file: File): Promise<UploadImageResult> => {
    try {
      console.log("Starting image upload for file:", file.name);
      const result = await supabaseService.uploadImage(file);
      console.log("Image upload successful:", result);
      
      // Return the public URL directly as a string
      return result;
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
