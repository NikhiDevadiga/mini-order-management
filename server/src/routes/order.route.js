import express from "express";

import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("customer"), createOrder);

router.get(
  "/my-orders",
  authMiddleware,
  roleMiddleware("customer"),
  getMyOrders,
);

router.get("/:id", authMiddleware, getOrderById);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateOrderStatus,
);

export default router;
