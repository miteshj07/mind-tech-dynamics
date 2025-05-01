
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

// Types
export interface UploadImageResult {
  publicUrl: string;
  path: string;
}

// Service functions
export const supabaseService = {
  // Content Management
  async fetchCmsContent() {
    try {
      console.log("Fetching CMS content from Supabase...");
      const { data, error } = await supabase
        .from('cms_content')
        .select('*');
        
      if (error) {
        console.error("Supabase error fetching content:", error);
        throw error;
      }
      
      console.log(`Fetched ${data?.length || 0} CMS content items`);
      return data || [];
    } catch (error) {
      console.error('Failed to fetch content:', error);
      toast.error('Failed to fetch content');
      throw error;
    }
  },
  
  async updateCmsContent(section: string, content: any) {
    try {
      console.log(`Updating CMS content for section: ${section}`);
      console.log("Content to update:", content);
      
      // Check if content with this section exists
      const { data: existingContent, error: checkError } = await supabase
        .from('cms_content')
        .select('id')
        .eq('section', section)
        .maybeSingle();
        
      if (checkError) {
        console.error("Error checking existing content:", checkError);
        throw checkError;
      }
      
      let result;
      
      if (existingContent?.id) {
        // Update existing content
        console.log(`Found existing content for section ${section}, updating...`);
        const { data, error } = await supabase
          .from('cms_content')
          .update({ data: content })
          .eq('section', section)
          .select();
          
        if (error) {
          console.error("Supabase error updating content:", error);
          throw error;
        }
        
        result = data;
      } else {
        // Insert new content
        console.log(`No existing content for section ${section}, inserting new record...`);
        const { data, error } = await supabase
          .from('cms_content')
          .insert({ section: section, data: content })
          .select();
          
        if (error) {
          console.error("Supabase error inserting content:", error);
          throw error;
        }
        
        result = data;
      }
      
      console.log(`Successfully updated CMS content for section: ${section}`);
      console.log("Updated data:", result);
      return result;
    } catch (error) {
      console.error('Failed to update content:', error);
      toast.error('Failed to update content');
      throw error;
    }
  },
  
  // Image Management
  async uploadImage(file: File): Promise<UploadImageResult> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    try {
      console.log(`Uploading file: ${file.name} to Supabase storage...`);
      // Upload to storage
      const { error: uploadError } = await supabase
        .storage
        .from('cms')
        .upload(filePath, file);
        
      if (uploadError) {
        console.error("Supabase storage upload error:", uploadError);
        throw uploadError;
      }
      
      // Get public URL
      const { data: urlData } = supabase
        .storage
        .from('cms')
        .getPublicUrl(filePath);
        
      // Record in database
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
      
      console.log(`Successfully uploaded image. Public URL: ${urlData.publicUrl}`);
      
      return {
        publicUrl: urlData.publicUrl,
        path: filePath
      };
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast.error('Failed to upload image');
      throw error;
    }
  },
  
  async listImages() {
    try {
      console.log("Fetching images from Supabase...");
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('uploaded_at', { ascending: false });
        
      if (error) {
        console.error("Supabase error listing images:", error);
        throw error;
      }
      
      console.log(`Fetched ${data?.length || 0} images`);
      return data || [];
    } catch (error) {
      console.error('Failed to load images:', error);
      toast.error('Failed to load images');
      throw error;
    }
  },
  
  async deleteImage(id: string, path: string) {
    try {
      console.log(`Deleting image with ID: ${id}, path: ${path}`);
      // Delete from storage
      const { error: storageError } = await supabase
        .storage
        .from('cms')
        .remove([path]);
        
      if (storageError) {
        console.error("Supabase storage delete error:", storageError);
        throw storageError;
      }
      
      // Delete from database
      const { error: dbError } = await supabase
        .from('images')
        .delete()
        .eq('id', id);
        
      if (dbError) {
        console.error("Error deleting image record:", dbError);
      }
      
      console.log(`Successfully deleted image with ID: ${id}`);
      return true;
    } catch (error) {
      console.error('Failed to delete image:', error);
      toast.error('Failed to delete image');
      throw error;
    }
  }
};
