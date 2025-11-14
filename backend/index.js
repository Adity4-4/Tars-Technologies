import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js"
import casesRoutes from "./routes/casesRoutes.js"
import blogsRoutes from "./routes/blogsRoutes.js"
import imageRoutes from "./routes/imageRoutes.js"
import clientRoutes from "./routes/clientImageRoutes.js";
import getintouchRoutes from "./routes/getintouchRoutes.js"


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes)
app.use("/api/cases", casesRoutes)
app.use("/api/blogs", blogsRoutes)
app.use("/api/images", imageRoutes)
app.use("/api/clients", clientRoutes);
app.use("/api/getintouch", getintouchRoutes);


mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))