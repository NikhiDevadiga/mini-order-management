import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  getPaymentByOrder,
} from "../controllers/payment.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/create-order",
  authMiddleware,
  roleMiddleware("customer"),
  createRazorpayOrder,
);

router.post(
  "/verify",
  authMiddleware,
  roleMiddleware("customer"),
  verifyRazorpayPayment,
);

router.get("/:orderId", authMiddleware, getPaymentByOrder);

export default router;
