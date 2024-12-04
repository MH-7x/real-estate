import extractPublicIdFromUrl from "@/lib/ExtractPublicID";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY|| "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    if (!process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary API Secret is missing.');
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return new Response(JSON.stringify({ signature }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function deleteImage(urls: string[]) {
  console.log('comes here');
  
  const publicIDs = extractPublicIdFromUrl(urls);
  console.log('public_id' , publicIDs);
  
  if (publicIDs.length === 0) {
    console.error("Invalid image URL:", publicIDs);
    return false
  }

  try {
    await cloudinary.api.delete_resources(publicIDs, {
      type: 'upload',
      resource_type: 'image',

    } ,(error, result) => {
      if (error) {
        console.error("Error deleting image:", error);
        return false
      }
      console.log("Image deleted:", result);
      return true
    });
 return true
  } catch (error) {
    console.error("Error deleting image:", error);
    return false
  }
}
