import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    folder: "hotel-booking",
    transformation: [{ crop: "limit", height: 800, width: 1200 }],
  },
});

const upload = multer({ storage });

export default upload;
