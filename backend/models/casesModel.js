import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    images: [
        {
            url: { type: String, required: true},       // cloudinary secure_url
            public_id: {  type: String, required: true} // cloudinary public_id
        }
    ] || [],
    title: { type: String, required: true },
    description: { type: String, required: true },
    
    details: {
        problemBefore: { type: String, required: true },
        problemSolved: { type: String, required: true },
        whatWeAdd: { type: String, required: true },
    }

}, { timestamps: true })

export default mongoose.model("Cases", formSchema)