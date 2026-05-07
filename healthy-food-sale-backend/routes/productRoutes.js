import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";
import {
  validateCreateProduct,
  validateProductId,
  validateUpdateProduct,
} from "../validations/productValidation.js";

const productRoutes = express.Router();

productRoutes.post("/", protect, validateCreateProduct, createProduct);
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", protect, validateProductId, getProductById);
productRoutes.put("/:id", protect, validateUpdateProduct, updateProduct);
productRoutes.delete("/:id", protect, validateProductId, deleteProduct);

export default productRoutes;
