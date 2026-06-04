"use server";

import { supabaseAdmin } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

export async function toggleBookingStatus(id: string, currentStatus: boolean) {
  await supabaseAdmin
    .from("bookings") 
    .update({ is_done: !currentStatus })
    .eq("id", id);
    
  revalidatePath("/admin");
}

// --- UPDATED DELETE FUNCTION ---
export async function deleteBooking(id: string) {
  try {
    // 1. Fetch the booking first so we know which images belong to it
    const { data: booking, error: fetchError } = await supabaseAdmin
      .from("bookings")
      .select("images")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // 2. If this booking has images, delete them from the storage bucket
    if (booking && booking.images && booking.images.length > 0) {
      
      // We extract just the filename from the end of the public URL
      const filesToRemove = booking.images.map((url: string) => {
        // e.g., URL is "https://.../booking-images/123456-abc.jpg"
        // This splits by the bucket name and grabs the "123456-abc.jpg" part
        const parts = url.split("/booking-images/");
        const fileName = parts[parts.length - 1];
        
        // decodeURIComponent ensures that if there were weird characters, it still matches
        return decodeURIComponent(fileName); 
      });

      if (filesToRemove.length > 0) {
        const { error: storageError } = await supabaseAdmin.storage
          .from("booking-images") // Must match your bucket name!
          .remove(filesToRemove);
          
        if (storageError) {
          console.error("Failed to delete images from bucket:", storageError);
        }
      }
    }

    // 3. Finally, delete the booking row from the database
    const { error: deleteError } = await supabaseAdmin
      .from("bookings")
      .delete()
      .eq("id", id);
      
    if (deleteError) throw deleteError;

    // 4. Refresh the Admin Page
    revalidatePath("/admin");

  } catch (error) {
    console.error("Error deleting booking:", error);
  }
}