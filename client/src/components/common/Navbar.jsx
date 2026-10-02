import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <nav>
      <Link to="/products">Products</Link>

      {user && user.role === "customer" && (
        <>
          {" | "}
          <Link to="/dashboard">Dashboard</Link>
          {" | "}
          <Link to="/cart">Cart</Link>
          {" | "}
          <Link to="/my-orders">My Orders</Link>
        </>
      )}

      {user && user.role === "admin" && (
        <>
          {" | "}
          <Link to="/admin/dashboard">Admin Dashboard</Link>
          {" | "}
          <Link to="/admin/products">Admin Products</Link>
          {" | "}
          <Link to="/admin/orders">Admin Orders</Link>
        </>
      )}

      {user ? (
        <>
          {" | "}
          <span>{user.name}</span>
          {" | "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {" | "}
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
