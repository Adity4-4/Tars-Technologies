import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    requirement: { type: String, required: true },
    remark: { type: String, default: "" },
}, { timestamps: true });


export default mongoose.model("GetinTouch", formSchema)