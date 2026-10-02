import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const { deliveryAddress } = req.body;

    if (!deliveryAddress?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const cartItem of cart.items) {
      const product = await Product.findById(cartItem.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "One or more products are no longer available",
        });
      }

      if (product.stockQuantity < cartItem.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const subtotal = product.price * cartItem.quantity;

      orderItems.push({
        product: product._id,
        quantity: cartItem.quantity,
        price: product.price,
        subtotal,
      });

      totalAmount += subtotal;
    }

    const order = await Order.create({
      customer: req.user._id,
      deliveryAddress:deliveryAddress.trim(),
      products: orderItems,
      totalAmount,
      status: "Pending",
    });

    for (const cartItem of cart.items) {
      await Product.findByIdAndUpdate(cartItem.product, {
        $inc: {
          stockQuantity: -cartItem.quantity,
        },
      });
    }

    cart.items = [];
    await cart.save();

    const populatedOrder = await Order.findById(order._id)
      .populate("customer", "name email")
      .populate("products.product");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: populatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      customer: req.user._id,
    })
      .populate("products.product")
      .sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email")
      .populate("products.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      order.customer._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("products.product")
      .sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    )
      .populate("customer", "name email")
      .populate("products.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
