
const express = require('express');
const Order = require('../models/order');
const { auth, isAdmin } = require('../middleware/auth');
const { sendOrderNotification } = require('../utils/whatsapp');

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Create new order (Checkout)
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    const { items, totalAmount, notes } = req.body;

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty. Please add items to cart.'
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid total amount'
      });
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      customerName: req.user.name,
      customerPhone: req.user.phone,
      customerEmail: req.user.email,
      notes: notes || '',
      status: 'pending'
    });

    await order.save();
    await order.populate('items.product');

    // Send WhatsApp notification to admin
    const orderDetails = {
      orderId: order._id.toString(),
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerEmail: order.customerEmail,
      items: order.items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: order.totalAmount,
      notes: order.notes
    };

    // Send notification asynchronously (don't wait for it)
    sendOrderNotification(orderDetails).catch(err => {
      console.error('WhatsApp notification error:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! Admin has been notified via WhatsApp and will contact you soon.',
      order
    });

    console.log(`✅ Order created: #${order._id} by ${req.user.email}`);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   GET /api/orders/my-orders
 * @desc    Get current user's orders
 * @access  Private
 */
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Fetch user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   GET /api/orders
 * @desc    Get all orders (Admin only)
 * @access  Private/Admin
 */
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const { status, limit } = req.query;
    let query = {};

    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }

    let ordersQuery = Order.find(query)
      .populate('user', 'name email phone')
      .populate('items.product')
      .sort({ createdAt: -1 });

    // Limit results if specified
    if (limit) {
      ordersQuery = ordersQuery.limit(parseInt(limit));
    }

    const orders = await ordersQuery;

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Fetch all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   GET /api/orders/:id
 * @desc    Get single order by ID
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own orders.'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Fetch order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Update order status (Admin only)
 * @access  Private/Admin
 */
router.patch('/:id/status', auth, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      order
    });

    console.log(`✅ Order ${order._id} status updated to ${status} by ${req.user.email}`);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   DELETE /api/orders/:id
 * @desc    Delete order (Admin only)
 * @access  Private/Admin
 */
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order deleted successfully'
    });

    console.log(`✅ Order ${order._id} deleted by ${req.user.email}`);
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;