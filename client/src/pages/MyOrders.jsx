import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getMyOrders();

        setOrders(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div>
        <h1>My Orders</h1>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="my-orders-page">
      <h1>My Orders</h1>

      {error && <p className="error-message">{error}</p>}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="my-orders-list">
          {orders.map((order) => (
            <div className="my-order-card" key={order._id}>
              <div className="my-order-header">
                <h2>
                  Order ID:
                  <span>{order._id}</span>
                </h2>

                <span className="order-status">{order.status}</span>
              </div>

              <div className="my-order-info">
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleString()}
                </p>

                <p>
                  <strong>Delivery Address:</strong> {order.deliveryAddress}
                </p>
              </div>

              <h3>Products</h3>

              <div className="my-order-products">
                {order.products.map((item) => (
                  <div className="my-order-product" key={item._id}>
                    <strong>{item.product?.name}</strong>

                    <div className="product-values">
                      <span>Quantity: {item.quantity}</span>

                      <span>Price: ₹{item.price}</span>

                      <span>Subtotal: ₹{item.subtotal}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-order-total">Total: ₹{order.totalAmount}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
