import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    images: [
        {
            url: { type: String, required: true },        // Cloudinary secure_url
            public_id: { type: String, required: true }   // Cloudinary public_id
        }
    ] || [],
    tag: { type: String, required: true },
    title: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },

    readingTime: { type: String, required: true },
    sections: [
        {
            subtitle: { type: String, required: false },
            content: { type: String, required: false }
        }
    ],
    points: [{ type: String }]

}, { timestamps: true });


const Form = mongoose.model("Blogs", formSchema);
export default Form