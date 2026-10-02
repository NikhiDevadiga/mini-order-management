import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });

      cart = await Cart.findById(cart._id).populate("items.product");
    }

    let totalAmount = 0;

    cart.items.forEach((item) => {
      totalAmount += item.product.price * item.quantity;
    });

    res.status(200).json({
      success: true,
      data: {
        cart,
        totalAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        product: productId,
        quantity: Number(quantity),
      });
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate("items.product");

    let totalAmount = 0;

    updatedCart.items.forEach((item) => {
      totalAmount += item.product.price * item.quantity;
    });

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: {
        cart: updatedCart,
        totalAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Quantity is required",
      });
    }

    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a non-negative integer",
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    if (Number(quantity) <= 0) {
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId,
      );
    } else {
      item.quantity = Number(quantity);
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate("items.product");

    let totalAmount = 0;

    updatedCart.items.forEach((item) => {
      totalAmount += item.product.price * item.quantity;
    });

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: {
        cart: updatedCart,
        totalAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId,
    );

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate("items.product");

    let totalAmount = 0;

    updatedCart.items.forEach((item) => {
      totalAmount += item.product.price * item.quantity;
    });

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      data: {
        cart: updatedCart,
        totalAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};
