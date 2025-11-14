import express from 'express'
import multer from 'multer'
import streamifier from 'streamifier'
import cloudinary from '../utils/cloudinary.js'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

// Upload image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })

    const buffer = req.file.buffer

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'tars_images' }, (error, result) => {
          if (result) resolve(result)
          else reject(error)
        })
        streamifier.createReadStream(buffer).pipe(stream)
      })
    }

    const result = await streamUpload(buffer)
    res.status(201).json({ success: true, data: result })
  } catch (err) {
    console.error('Upload error', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

// Get image info by public_id
router.get('/:public_id', async (req, res) => {
  try {
    const { public_id } = req.params
    const result = await cloudinary.api.resource(public_id)
    res.json({ success: true, data: result })
  } catch (err) {
    console.error('Get image error', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

// Delete image by public_id
router.delete('/:public_id', async (req, res) => {
  try {
    const { public_id } = req.params
    const result = await cloudinary.uploader.destroy(public_id)
    res.json({ success: true, data: result })
  } catch (err) {
    console.error('Delete image error', err)
    res.status(500).json({ success: false, error: err.message })
  }
})

// Get all images from Cloudinary (list)
router.get('/', async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'tars_images/', // only images in your folder
      max_results: 100,
    })
    res.json({ success: true, data: result.resources })
  } catch (err) {
    console.error('Get all images error', err)
    res.status(500).json({ success: false, error: err.message })
  }
})


export default router
