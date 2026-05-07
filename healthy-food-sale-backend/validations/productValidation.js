import { body, param, validationResult } from "express-validator";

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  next();
};

// Validation rules for creating a product
export const validateCreateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2 })
    .withMessage("Product name must be at least 2 characters"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["vegetable", "fruit"])
    .withMessage("Category must be either 'vegetable' or 'fruit'"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),

  body("harvestDate")
    .optional()
    .isISO8601()
    .withMessage("Harvest date must be a valid date"),

  body("expiryDate")
    .optional()
    .isISO8601()
    .withMessage("Expiry date must be a valid date"),

  handleValidationErrors,
];

// Validation rules for updating a product
export const validateUpdateProduct = [
  param("id").isMongoId().withMessage("Invalid product ID"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Product name must be at least 2 characters"),

  body("category")
    .optional()
    .isIn(["vegetable", "fruit"])
    .withMessage("Category must be either 'vegetable' or 'fruit'"),

  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be non-negative"),

  body("harvestDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid harvest date"),

  body("expiryDate").optional().isISO8601().withMessage("Invalid expiry date"),

  handleValidationErrors,
];

// Validation rules for deleting or fetching a product by ID
export const validateProductId = [
  param("id").isMongoId().withMessage("Invalid product ID"),

  handleValidationErrors,
];
