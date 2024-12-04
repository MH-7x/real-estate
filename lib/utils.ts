import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Function to resize Cloudinary image URLs
 * @param {string[]} images - Array of Cloudinary image URLs
 * @param {number} width - Desired width of the resized image
 * @param {number} height - Desired height of the resized image
 * @returns {string[]} - Array of resized Cloudinary image URLs
 */
const resizeCloudinaryImages = (
  images: string[],
  width: number,
  height: number
): string[] => {
  return images.map((url) => {
    // Check if the URL is a valid Cloudinary URL
    if (!url.includes("res.cloudinary.com")) return url;

    // Extract the Cloudinary base URL, transformation, and file path
    const parts = url.split("/upload/");
    const baseUrl = parts[0]; // Base URL up to /upload/
    const filePath = parts[1]; // Remaining file path after /upload/

    // Construct the resized URL with width and height transformations
    const transformedUrl = `${baseUrl}/upload/w_${width},h_${height},c_fill,q_auto,f_auto/${filePath}`;

    return transformedUrl;
  });
};

export default resizeCloudinaryImages;
