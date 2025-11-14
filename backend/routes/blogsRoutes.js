import express from 'express';
import blogsModel from '../models/blogsModel.js';

const router = express.Router();

// save Blog data
router.post('/', async (req, res) => {
  try {
    console.log('Incoming data: ', req.body);

    const { tag, title, name, date } = req.body;
    const form = new blogsModel({  images: req.body.images || [], tag, title, name, date, readingTime: req.body.readingTime, sections: req.body.sections || [], points: req.body.points || [] });
    await form.save();

    res.status(201).json({ success: true, message: 'Blog added successfully' });
  } catch (err) {
    console.error('Error saving blog: ', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// fetch Blog data
router.get('/', async (req, res) => {
  try {
    const forms = await blogsModel.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const forms = await blogsModel.findByIdAndUpdate(
      req.params.id,
      { $set:req.body },
      { new: true }
    )
    res.json(forms)
  } catch (err) {
    console.error("Error Updating form: ", err)
  }
})

// delete
router.delete("/:id", async (req, res) => {
  try {
    await blogsModel.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: "Blog deleted successfully" })
  } catch (err) {
    console.error("Error deleting blog: ", err)
    res.status(500).json({success: false, error: err.message })
  }
})

// get blogs details
router.get("/:id", async (req, res) => {
  try {
    const singleBlog = await blogsModel.findById(req.params.id)
    if (!singleBlog) return res.status(404).json({message: "Blog not found" })
    res.json(singleBlog)
  } catch (err) {
    res.status(500) 
  }
})

export default router;