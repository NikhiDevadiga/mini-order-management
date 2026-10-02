import { useEffect, useState } from "react";
import { getCustomerDashboard } from "../services/dashboardService";

const CustomerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getCustomerDashboard();

        setDashboard(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Customer Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Total Orders</h2>
          <p>{dashboard.totalOrders}</p>
        </div>

        <div className="dashboard-card">
          <h2>Pending Orders</h2>
          <p>{dashboard.pendingOrders}</p>
        </div>

        <div className="dashboard-card">
          <h2>Delivered Orders</h2>
          <p>{dashboard.deliveredOrders}</p>
        </div>
      </div>

      <div className="recent-orders-section">
        <h2>Recent Orders</h2>

        {dashboard.recentOrders.length === 0 ? (
          <p>No recent orders.</p>
        ) : (
          <div className="recent-orders-grid">
            {dashboard.recentOrders.map((order) => (
              <div className="recent-order-card" key={order._id}>
                <div>
                  <strong>Order ID</strong>
                  <p>{order._id}</p>
                </div>

                <div>
                  <strong>Status</strong>
                  <p>{order.status}</p>
                </div>

                <div>
                  <strong>Total</strong>
                  <p>₹{order.totalAmount}</p>
                </div>

                <div>
                  <strong>Date</strong>
                  <p>{new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
