
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
    const { data, error } = await supabase
      .from('cms_content')
      .select('*');
      
    if (error) {
      toast.error('Failed to fetch content');
      throw error;
    }
    
    return data;
  },
  
  async updateCmsContent(section: string, content: any) {
    const { error } = await supabase
      .from('cms_content')
      .upsert({
        section: section,
        data: content
      }, {
        onConflict: 'section'
      });
      
    if (error) {
      toast.error('Failed to update content');
      throw error;
    }
    
    toast.success('Content updated successfully');
    return true;
  },
  
  // Image Management
  async uploadImage(file: File): Promise<UploadImageResult> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Upload to storage
    const { error: uploadError } = await supabase
      .storage
      .from('cms')
      .upload(filePath, file);
      
    if (uploadError) {
      toast.error('Failed to upload image');
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
  },
  
  async listImages() {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('uploaded_at', { ascending: false });
      
    if (error) {
      toast.error('Failed to load images');
      throw error;
    }
    
    return data;
  },
  
  async deleteImage(id: string, path: string) {
    // Delete from storage
    const { error: storageError } = await supabase
      .storage
      .from('cms')
      .remove([path]);
      
    if (storageError) {
      toast.error('Failed to delete image');
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
    
    toast.success('Image deleted successfully');
    return true;
  }
};
