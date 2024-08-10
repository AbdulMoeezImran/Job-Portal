import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "CVs",
    allowedFormats: ["pdf"],
  },
});

const uploadCV = multer({ storage });

export default uploadCV;
