import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    harvestingDate: {
      type: Date,
    },

    expiryDate: {
      type: Date,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
