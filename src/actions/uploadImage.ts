"use server";

import { getAuthenticatedUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function getExtensionFromMimeType(mimeType: string): string {
  const extensions: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
  };
  return extensions[mimeType] || "bin";
}

export async function uploadImage(formData: FormData): Promise<UploadResult> {
  const { user, error: authError } = await getAuthenticatedUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return { success: false, error: "No file provided" };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      error: "Invalid file type. Allowed: PNG, JPEG, GIF, WebP",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: "File size exceeds 5MB limit" };
  }

  const timestamp = Date.now();
  const uuid = crypto.randomUUID();
  const extension = getExtensionFromMimeType(file.type);
  const filePath = `${user.id}/${timestamp}-${uuid}.${extension}`;

  try {
    const supabase = await createClient();

    const { error: uploadError } = await supabase.storage
      .from("entry-images")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Storage Error:", uploadError);
      return { success: false, error: "Failed to upload image. Please try again." };
    }

    const { data: urlData } = supabase.storage
      .from("entry-images")
      .getPublicUrl(filePath);

    return { success: true, url: urlData.publicUrl };
  } catch (error) {
    console.error("Storage Error:", error);
    return { success: false, error: "Failed to upload image. Please try again." };
  }
}
