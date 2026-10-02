import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../services/orderService";

const statuses = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllOrders();

      setOrders(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      setError("");
      setSuccess("");

      await updateOrderStatus(orderId, status);

      setSuccess("Order status updated successfully.");

      fetchOrders();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to update order status.",
      );
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h1>Admin Orders</h1>

      {error && <p className="error-message">{error}</p>}

      {success && <p className="success-message">{success}</p>}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <h2>Order #{order._id}</h2>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="order-info">
                <p>
                  <strong>Customer:</strong> {order.customer?.name}
                </p>

                <p>
                  <strong>Email:</strong> {order.customer?.email}
                </p>

                <p>
                  <strong>Address:</strong> {order.deliveryAddress}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>

              <h3>Products</h3>

              {order.products.map((item) => (
                <div className="order-product" key={item._id}>
                  <div>
                    <strong>{item.product?.name}</strong>
                  </div>

                  <div className="order-product-details">
                    <span>Qty: {item.quantity}</span>

                    <span>Price: ₹{item.price}</span>

                    <span>Subtotal: ₹{item.subtotal}</span>
                  </div>
                </div>
              ))}

              <div className="order-footer">
                <strong>Total: ₹{order.totalAmount}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
