import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import corsOptions from "./config/corsOptions.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`),
);
