import express from "express";
import {
  getAllOrders,
} from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/orders",
  authMiddleware,
  roleMiddleware("admin"),
  getAllOrders
);

export default router;