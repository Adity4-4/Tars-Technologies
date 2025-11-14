import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    images: [
        {
            url: { type: String, required: true },
            public_id: { type: String, required: true }
        }
    ] || [],
    title: { type: String, required: true },
    description: { type: String, required: true }
})

export default mongoose.model("Product", productSchema)