import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    price: Number,
    harvestDate: Date,
    expiryDate: Date,
    description: String,
  },
  { timestamps: true },
);

export default mongoose.model("Product", ProductSchema);
