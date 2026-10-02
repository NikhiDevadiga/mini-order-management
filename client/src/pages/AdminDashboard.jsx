import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/dashboardService";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await getAdminDashboard();

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
      <h1>Admin Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Total Products</h2>
          <p>{dashboard.totalProducts}</p>
        </div>

        <div className="dashboard-card">
          <h2>Total Customers</h2>
          <p>{dashboard.totalCustomers}</p>
        </div>

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

        <div className="dashboard-card">
          <h2>Total Order Value</h2>
          <p>₹{dashboard.totalOrderValue}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
