import express from "express";
import GetinTouch from "../models/getintouchModel.js"

const router = express.Router();

// Save getintouch data
router.post("/", async (req, res) => {
    try {
        console.log("Incoming data: ", req.body);

        const { name, companyName, email, requirement } = req.body;
        const form = new GetinTouch({ name, companyName, email, requirement });
        await form.save();  

        res.status(201).json({ success: true, message: "Form submitted successfully!" })
    } catch (err) {
        console.error("Error saving form: ", err)
        res.status(500).json({ success: false, error: err.message });
    }
})

// fetch getintouch data
router.get("/", async (req, res) => {
  try {
    const forms = await GetinTouch.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update (PUT)
router.put("/:id", async (req, res) => {
  try {
    const updated = await GetinTouch.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await GetinTouch.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;