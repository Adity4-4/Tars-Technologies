import mongoose from "mongoose";

const clientImageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ClientImage", clientImageSchema);
