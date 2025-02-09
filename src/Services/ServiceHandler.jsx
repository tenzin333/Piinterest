import { createClient } from "@supabase/supabase-js";
// import URLConfig from "../Components/URLConfig";
import ENV from "../supabaseConfig/supaBaseConfig";
export const supabase = createClient(ENV.projectUrl, ENV.anonKey);

const serviceHandler = {
  
  async get(table, params = {}, containsFilters = {}, containedByFilters = {}) {
    try {
        let query = supabase.from(table).select("*"); // Ensure full selection

        // Apply exact match filters if params exist
        if (Object.keys(params).length > 0) {
            query = query.match(params);
        }

        // Apply JSONB contains filter (e.g., { tags: ["monuments", "people"] })
        for (const [key, value] of Object.entries(containsFilters)) {
            query = query.contains(key, value);
        }

        // Apply JSONB containedBy filter
        for (const [key, value] of Object.entries(containedByFilters)) {
            query = query.containedBy(key, value);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Supabase Query Error:", error);
            return null;
        }

        return data;
    } catch (error) {
        console.error("Unexpected Error in get():", error);
        return null;
    }
},


async getWithFilterOnArray(searchedText,visibility,userid){
   try {
        if (!searchedText.trim()) {
          // Return an empty array when searchedText is empty
          return [];
      }

      const data = await supabase
      .rpc('array_text_ilike', { search: `${searchedText}%`,visibility_status:  visibility,user_id: userid});
          return data.data;
   }catch(error){
    return handleError(error);
   }
},

  async listAllBucket() {
    try{
        const { data:response, error } = await supabase
        .storage
        .listBuckets()
        if (error) throw error;
        return response;

    }catch(error){
        return handleError(error);
    }
  
  },

  async post(table, data) {
    try {
      const { data: response, error } = await supabase.from(table).insert(data);
      if (error) throw error;
      return response;
    } catch (error) {
      return handleError(error);
    }
  },

  async upsert (table,data,unique) {
    try {
      const { res, error } = await supabase
      .from(table)
      .upsert(
        data, // Array of rows to insert
        { onConflict: unique } // Conflict resolution on 'column1'
      );
       if(error) throw error;
      return res;
    }catch (error) {
      return handleError(error);
    }
  },
 
  async put(table, params, data) {
    try {
      const { data: response, error } = await supabase.from(table).update(data).match(params);
      if (error) throw error;
      return response;
    } catch (error) {
      return handleError(error);
    }
  },

  async delete(table, params) {
    try {
      const { data, error } = await supabase.from(table).delete().match(params);
      if (error) throw error;
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

//   async getListOfAllImagesUrl(bucket,folderPath) {
//     try {
//         const { data, error } = await supabase.storage.from(bucket).delete().match(params);
//       if (error) throw error;
//       return data;
//     }catch(error){
//         return handleError(error);
//     }
//   },

  //GET ALL IMAGES 
  async getFilesInFolder(bucket, folderPath) {
    try {
      const { data, error } = await supabase.storage.from(bucket).list(folderPath, {
        limit: 100,  // Optional, to limit the number of files returned
      });
  
      if (error) throw error;
  
      return data;
    } catch (error) {
      return handleError(error);
    }
  },

 // Upload image function
async  uploadImage(bucket,file, folderPath,upsert) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(`${folderPath}`, file, { cacheControl: "3600", upsert: upsert });
  
      if (error) throw error;
  
      // const publicUrl = supabase.storage.from(bucket).getPublicUrl(`${folderPath}/${file.name}`).data.publicUrl;
  
      return data;
    } catch (error) {
       return handleError(error);
    }
  },
  
  // Get public URL of an image
  async  getImageUrl(bucket,filePath) {
    try {
      const { data, error } = await supabase.storage.from(bucket).getPublicUrl(filePath);
      if (error) throw error;
      return data.publicUrl;
    } catch (error) {
        return handleError(error);
    }
  },

  async getSignedUrl (bucket,filePath){
    try{
      const { data, error } = await supabase.storage
      .from(bucket) // your private bucket
      .createSignedUrl(filePath,315360000); // URL is valid for 1 hour (3600 seconds)
      if(error) throw error;
      return data.signedUrl;
    }catch(error){
      return handleError(error);
    }
  },
  
  // List all files in a folder
  async  listFilesInFolder(bucket,folderPath = "images") {
    try {
      const { data, error } = await supabase.storage.from(privateI).list(folderPath);
      if (error) throw error;
      
      return data.map(file => {
        return {
          name: file.name,
          url: supabase.storage.from(bucket).getPublicUrl(`${folderPath}/${file.name}`).data.publicUrl
        };
      });
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Delete image from Supabase Storage
  async  deleteImage(bucket,filePath) {
    try {
      const { error } = await supabase.storage.from(bucket).remove([filePath]);
      if (error) throw error;
    } catch (error) {
        return handleError(error);
    }
  }
};

function handleError(error) {
  if (error?.status === 401) {
    console.error("Unauthorized, redirecting to login...");
    localStorage.clear();
    window.location.href = "login";
  } else if (error?.status === 404) {
    console.error("Resource not found:", error.message);
  }
  return Promise.reject(error);
}

export default serviceHandler;
