import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Logos",
    allowedFormats: ["jpeg", "jpg", "png"],
  },
});

const uploadLogo = multer({ storage });

export default uploadLogo;
