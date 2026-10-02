import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import errorMiddleware from "./middlewares/errorMiddleware.js";
import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoutes from "./routes/order.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import paymentRoute from "./routes/payment.route.js";
import adminRoute from "./routes/admin.route.js";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],

    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

export default app;
