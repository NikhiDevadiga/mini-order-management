import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", authMiddleware, roleMiddleware("admin"), createProduct);

router.put("/:id", authMiddleware, roleMiddleware("admin"), updateProduct);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteProduct);

export default router;
