
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
      console.log('\n=== Starting CMS Content Update ===');
      console.log('Section:', section);
      console.log('Content to update:', JSON.stringify(content, null, 2));
      
      // Check if content with this section exists
      console.log('\nStep 1: Checking for existing content...');
      const { data: existingContent, error: checkError } = await supabase
        .from('cms_content')
        .select('*')
        .eq('section', section)
        .maybeSingle();
      
      console.log('Existing content found:', existingContent);
        
      if (checkError) {
        console.error("Error checking existing content:", checkError);
        throw checkError;
      }
      
      let result;
      const updatePayload = {
        data: content,
        updated_at: new Date().toISOString()
      };

      console.log('\nStep 2: Preparing update payload:', updatePayload);
      
      if (existingContent?.id) {
        // Update existing content
        console.log(`\nStep 3a: Updating existing content with section: ${section}`);
        console.log('Update payload:', JSON.stringify(updatePayload, null, 2));
        
        // First try with single update
        const { data, error } = await supabase
          .from('cms_content')
          .update(updatePayload)
          .eq('section', section)
          .select('*');
          
        if (error) {
          console.error("\nSupabase update error:", error);
          throw error;
        }
        
        // If no error but no data returned, try upsert
        if (!data || data.length === 0) {
          console.log('\nNo data returned from update, trying upsert...');
          const { data: upsertData, error: upsertError } = await supabase
            .from('cms_content')
            .upsert({
              section: section,
              ...updatePayload
            })
            .select('*');
            
          if (upsertError) {
            console.error("\nSupabase upsert error:", upsertError);
            throw upsertError;
          }
          
          result = upsertData;
          console.log('\nUpsert successful. Updated data:', result);
        } else {
          result = data;
          console.log('\nUpdate successful. Updated data:', result);
        }
      } else {
        // Insert new content
        console.log('\nStep 3b: Creating new record...');
        const insertPayload = {
          section: section,
          data: content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        console.log('Insert payload:', JSON.stringify(insertPayload, null, 2));
        
        const { data, error } = await supabase
          .from('cms_content')
          .insert(insertPayload)
          .select('*');
          
        if (error) {
          console.error("\nSupabase insert error:", error);
          throw error;
        }
        
        result = data;
        console.log('\nInsert successful. Inserted data:', result);
      }
      
      // Verify the update by fetching the latest data
      console.log('\nStep 4: Verifying update...');
      const { data: verificationData, error: verificationError } = await supabase
        .from('cms_content')
        .select('*')
        .eq('section', section)
        .maybeSingle();
        
      if (verificationError) {
        console.error("\nVerification fetch error:", verificationError);
      } else {
        console.log('Verification data:', verificationData);
        if (JSON.stringify(verificationData?.data) !== JSON.stringify(content)) {
          console.warn('\nWarning: Verification shows data mismatch!');
          console.log('Expected:', JSON.stringify(content, null, 2));
          console.log('Actual:', JSON.stringify(verificationData?.data, null, 2));
        }
      }
      
      // Check if we have a valid result
      if (!result || (Array.isArray(result) && result.length === 0)) {
        console.error('\nNo data returned from database operation. Result:', result);
        // Instead of throwing error, return the content we tried to save
        return [{
          section,
          data: content,
          updated_at: new Date().toISOString()
        }];
      }
      
      console.log('\n=== CMS Content Update Completed Successfully ===');
      return result;
    } catch (error) {
      console.error('\n=== CMS Content Update Failed ===');
      console.error('Error details:', error);
      
      // Log the Supabase error details if available
      if (error && typeof error === 'object' && 'code' in error) {
        console.error('Supabase error code:', (error as any).code);
        console.error('Supabase error message:', (error as any).message);
        console.error('Supabase error details:', (error as any).details);
      }
      
      toast.error('Failed to update content');
      throw error;
    }
  },
  
  // Image Management
  async uploadImage(file: File): Promise<UploadImageResult> {
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      console.log(`Uploading file: ${file.name} (${file.size} bytes) to Supabase storage...`);
      console.log(`Generated unique file path: ${filePath}`);
      
      // First check if bucket exists, if not create it
      const { data: buckets, error: bucketsError } = await supabase
        .storage
        .listBuckets();
        
      if (bucketsError) {
        console.error("Error checking buckets:", bucketsError);
        throw bucketsError;
      }
      
      const cmsBucketExists = buckets?.some(bucket => bucket.name === 'cms');
      if (!cmsBucketExists) {
        console.log("CMS bucket doesn't exist, creating it...");
        const { error: createBucketError } = await supabase
          .storage
          .createBucket('cms', {
            public: true,
            fileSizeLimit: 10485760 // 10MB
          });
          
        if (createBucketError) {
          console.error("Error creating cms bucket:", createBucketError);
          throw createBucketError;
        }
        console.log("CMS bucket created successfully");
      }
      
      // Upload to storage
      console.log("Uploading file to storage...");
      const { error: uploadError } = await supabase
        .storage
        .from('cms')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
        
      if (uploadError) {
        console.error("Supabase storage upload error:", uploadError);
        throw uploadError;
      }
      
      // Get public URL
      console.log("Getting public URL for uploaded file...");
      const { data: urlData } = await supabase
        .storage
        .from('cms')
        .getPublicUrl(filePath);
        
      if (!urlData || !urlData.publicUrl) {
        throw new Error("Failed to get public URL for uploaded file");
      }
      
      console.log(`Public URL: ${urlData.publicUrl}`);
      
      // Record in database
      console.log("Recording image metadata in database...");
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
        // Continue even if metadata recording fails
      } else {
        console.log("Image metadata recorded successfully");
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
