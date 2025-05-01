import React, { createContext, useContext, useState, useEffect } from 'react';
import * as cmsData from '../data';

// Define interfaces for our CMS data structure
interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  tags: string[];
}

interface NewsletterSignup {
  title: string;
  description: string;
}

interface BlogSection {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
  featuredPost?: BlogPost;
  newsletterSignup?: NewsletterSignup;
}

interface SeoMetadata {
  home?: {
    title: string;
    description: string;
  };
  blog?: {
    title: string;
    description: string;
  };
  // Other pages can be added as needed
}

interface ContactCTA {
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface SharedComponents {
  contactCTA?: {
    home?: ContactCTA;
    blog?: ContactCTA;
    services?: ContactCTA;
    aboutUs?: ContactCTA;
    caseStudies?: ContactCTA;
    careers?: ContactCTA;
  };
}

// Define the shape of our CMS data
interface CmsData {
  heroSection?: any;
  servicesSection?: any;
  aboutUsSection?: any;
  caseStudiesSection?: any;
  blogSection?: BlogSection;
  careersSection?: any;
  contactSection?: any;
  seoMetadata?: SeoMetadata;
  sharedComponents?: SharedComponents;
}

// Define the shape of our context
interface CmsContextType {
  data: CmsData;
  isLoading: boolean;
  error: Error | null;
  updateContent: (section: string, path: string, value: any) => void;
  uploadImage: (file: File) => Promise<string>;
}

// Create the context
const CmsContext = createContext<CmsContextType | undefined>(undefined);

// Storage key for localStorage
const STORAGE_KEY = 'cms_content_data';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CmsData>(cmsData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
      }
      
      // Simulate API loading time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200);
      
      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Error loading CMS data from localStorage:", err);
      setIsLoading(false);
    }
  }, []);

  // Function to update CMS content (for admin purposes)
  const updateContent = (section: string, path: string, value: any) => {
    try {
      // Create a deep copy of the current data
      const newData = JSON.parse(JSON.stringify(data));
      
      // Split the path into an array
      const pathArray = path.split('.');
      
      // Navigate to the correct location in the object
      let current = newData;
      const last = pathArray.pop();
      
      if (!last) return;
      
      for (const key of pathArray) {
        if (current[key] === undefined) {
          current[key] = {};
        }
        current = current[key];
      }
      
      // Update the value
      current[last] = value;
      
      // Set the new data
      setData(newData);
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      
      console.log(`CMS: Updated ${section}.${path} to:`, value);
    } catch (err) {
      console.error("Error updating CMS content:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  };

  // Function to upload images (in a real implementation, this would upload to a storage service)
  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        
        reader.onload = () => {
          // In a real implementation, we would upload the file to a storage service
          // and return the URL. For this example, we're just returning the data URL.
          const result = reader.result as string;
          
          console.log("Image uploaded successfully");
          resolve(result);
        };
        
        reader.onerror = (error) => {
          reject(error);
        };
        
        reader.readAsDataURL(file);
      } catch (err) {
        reject(err);
      }
    });
  };

  return (
    <CmsContext.Provider value={{ data, isLoading, error, updateContent, uploadImage }}>
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
