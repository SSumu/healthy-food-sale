import Product from "../models/Product.js";

// @desc    Create a new product
// @route   POST /api/products
// @access  Public
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      price,
      quantity,
      harvestingDate,
      expiryDate,
      description,
      image,
    } = req.body;

    // Check if product already exists
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product already exists",
      });
    }

    // Create product
    const product = await Product.create({
      name,
      category,
      price,
      quantity,
      harvestingDate,
      expiryDate,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product not found",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Public
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Public
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
