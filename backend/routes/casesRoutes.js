import express from "express";
import casesModel from "../models/casesModel.js";

const router = express.Router();

// save Cases data
router.post("/", async (req, res) => {
    try {
        console.log("Incoming data: ", req.body)

        const { title, description,details,images } = req.body;
        const form = new casesModel({ title, description ,details,images })
        await form.save();

        res.status(201).json({ success: true, message: "Case added successfully" })
    } catch (err) {
        console.error("Error saving form: ", err)
        res.status(500).json({ success: false, error: err.message })
    }
})

// fetch Cases data
router.get("/", async (req, res) => {
    try {
        const forms = await casesModel.find()
        res.json(forms);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
})

// update
router.put("/:id", async (req, res) => {
    try {
        const forms = await casesModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
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
        await casesModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Case deleted successfully" });
    } catch (err) {
        console.error("Error deleting case: ", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// get cases Details
router.get("/:id", async (req, res) => {
  try {
    const singleCase = await casesModel.findById(req.params.id);
    if (!singleCase) return res.status(404).json({ message: "Case not found" });
    res.json(singleCase);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


export default router;