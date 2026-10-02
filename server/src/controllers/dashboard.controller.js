import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getCustomerDashboard = async (req, res, next) => {
  try {
    const customerId = req.user._id;

    const totalOrders = await Order.countDocuments({
      customer: customerId,
    });

    const pendingOrders = await Order.countDocuments({
      customer: customerId,
      status: "Pending",
    });

    const deliveredOrders = await Order.countDocuments({
      customer: customerId,
      status: "Delivered",
    });

    const recentOrders = await Order.find({
      customer: customerId,
    })
      .populate("products.product")
      .sort({ orderDate: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        deliveredOrders,
        recentOrders,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminDashboard = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const deliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });

    const orderValueResult = await Order.aggregate([
      {
        $match: {
          status: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalOrderValue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalOrderValue =
      orderValueResult.length > 0 ? orderValueResult[0].totalOrderValue : 0;

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalCustomers,
        totalOrders,
        pendingOrders,
        deliveredOrders,
        totalOrderValue,
      },
    });
  } catch (error) {
    next(error);
  }
};
