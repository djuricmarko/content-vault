"use client";

import { useState, useRef, useCallback } from "react";
import { uploadImage } from "@/actions/uploadImage";

interface UseImageUploadOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: string) => void;
}

export function useImageUpload(options?: UseImageUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const triggerUpload = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImage(formData);

      if (result.success && result.url) {
        options?.onSuccess?.(result.url);
      } else {
        const errorMessage = result.error ?? "Failed to upload image";
        setError(errorMessage);
        options?.onError?.(errorMessage);
      }

      setIsUploading(false);

      // Reset file input to allow re-selecting same file
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [options]
  );

  return {
    isUploading,
    error,
    inputRef,
    triggerUpload,
    handleFileChange,
  };
}
