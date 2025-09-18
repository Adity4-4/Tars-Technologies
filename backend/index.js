import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import getintouchRoutes from "./routes/getintouchRoutes.js"


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/getintouch", getintouchRoutes);

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))