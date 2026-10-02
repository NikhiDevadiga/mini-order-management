import express from "express";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cart.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.use(authMiddleware, roleMiddleware("customer"));

router.get("/", getCart);

router.post("/", addToCart);

router.patch("/:productId", updateCartItem);

router.delete("/:productId", removeFromCart);

export default router;
