
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
      const { data, error } = await supabase
        .from('cms_content')
        .select('*');
        
      if (error) {
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Failed to fetch content:', error);
      toast.error('Failed to fetch content');
      throw error;
    }
  },
  
  async updateCmsContent(section: string, content: any) {
    try {
      const { error } = await supabase
        .from('cms_content')
        .upsert({
          section: section,
          data: content
        }, {
          onConflict: 'section'
        });
        
      if (error) {
        throw error;
      }
      
      return true;
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
      // Upload to storage
      const { error: uploadError } = await supabase
        .storage
        .from('cms')
        .upload(filePath, file);
        
      if (uploadError) {
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
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('uploaded_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Failed to load images:', error);
      toast.error('Failed to load images');
      throw error;
    }
  },
  
  async deleteImage(id: string, path: string) {
    try {
      // Delete from storage
      const { error: storageError } = await supabase
        .storage
        .from('cms')
        .remove([path]);
        
      if (storageError) {
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
      
      return true;
    } catch (error) {
      console.error('Failed to delete image:', error);
      toast.error('Failed to delete image');
      throw error;
    }
  }
};
