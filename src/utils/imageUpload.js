import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

/**
 * Generate a unique identifier for the image
 * @returns {string} A unique ID
 */
export const generateImageId = () => {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
};

/**
 * Upload an image file to Firebase Storage
 * @param {File} file - The image file to upload
 * @param {string} uuid - Optional UUID, if not provided a new one is generated
 * @returns {Promise<string>} The download URL of the uploaded image
 */
export const uploadVehicleImage = async (file, uuid = null) => {
  if (!file) {
    throw new Error("No file provided");
  }

  // Validate file type
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!validTypes.includes(file.type)) {
    throw new Error("Invalid file type. Please upload a JPG, PNG, or WebP image.");
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error("File size too large. Please upload an image smaller than 5MB.");
  }

  // Generate UUID if not provided
  const imageId = uuid || generateImageId();

  // Get file extension
  const extension = file.name.split(".").pop();

  // Create storage reference following your existing pattern: inventory/{uuid}.{ext}
  const storageRef = ref(storage, `inventory/${imageId}.${extension}`);

  try {
    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

/**
 * Validate if a file is a valid image
 * @param {File} file - The file to validate
 * @returns {boolean} Whether the file is valid
 */
export const isValidImageFile = (file) => {
  if (!file) return false;

  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return validTypes.includes(file.type) && file.size <= maxSize;
};
