
const express = require('express');
const Product = require('../models/product');
const { auth, isAdmin } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products with optional filters
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'name') sortOption = { name: 1 };

    const products = await Product.find(query).sort(sortOption);

    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Fetch product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create new product (Admin only)
 * @access  Private/Admin
 */
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const { name, description, price, brand, category, images, stock } = req.body;

    // Validation
    if (!name || !description || !price || !brand || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, description, price, brand, category'
      });
    }

    const product = new Product({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      brand: brand.trim(),
      category,
      images: images || [],
      stock: Number(stock) || 0
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });

    console.log(`✅ Product created: ${product.name} by ${req.user.email}`);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update product (Admin only)
 * @access  Private/Admin
 */
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });

    console.log(`✅ Product updated: ${product.name} by ${req.user.email}`);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product (Admin only)
 * @access  Private/Admin
 */
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

    console.log(`✅ Product deleted: ${product.name} by ${req.user.email}`);
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;