import express from "express";

import {
  getCustomerDashboard,
  getAdminDashboard,
} from "../controllers/dashboard.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get(
  "/customer",
  authMiddleware,
  roleMiddleware("customer"),
  getCustomerDashboard,
);

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  getAdminDashboard,
);

export default router;
