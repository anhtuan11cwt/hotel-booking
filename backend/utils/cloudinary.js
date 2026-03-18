import cloudinary from "../config/cloudinary.js";

const extractPublicId = (url) => {
  if (!url) return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.|%2E)/);
  return match ? match[1] : null;
};

export const deleteCloudinaryImage = async (imageUrl) => {
  const publicId = extractPublicId(imageUrl);
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
};

export const deleteCloudinaryImages = async (images) => {
  for (const imageUrl of images) {
    await deleteCloudinaryImage(imageUrl);
  }
};
