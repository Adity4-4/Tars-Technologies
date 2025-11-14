import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../utils/cloudinary.js";
import ClientImage from "../models/clientImageModel.js";

const router = express.Router(); // ⚠️ This was missing

const storage = multer.memoryStorage();
const upload = multer({ storage });


// Upload image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const buffer = req.file.buffer;

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'tars_images' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(buffer);

    // Save metadata to MongoDB
    const newImage = await ClientImage.create({
      url: result.secure_url,
      public_id: result.public_id,
    });

    res.status(201).json({ success: true, data: newImage });
  } catch (err) {
    console.error('Upload error', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all client images
router.get('/', async (req, res) => {
  try {
    const images = await ClientImage.find().sort({ createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (err) {
    console.error('Get all images error', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

