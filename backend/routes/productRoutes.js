import express from "express"
import productModel from "../models/productModel.js"

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { images, title, description } = req.body;
    const product = new productModel({ images, title, description });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
})

// Update product
router.put("/:id", async (req, res) => {
  try {
    const { images, title, description } = req.body;
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.title = title || product.title;
    product.description = description || product.description;
    if (images) product.images = images;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
// Delete product
router.delete("/:id", async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


export default router;