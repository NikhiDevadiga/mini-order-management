import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, loading, fetchCart, updateItem, removeItem } = useCart();

  const [error, setError] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdate = async (productId, quantity) => {
    try {
      setError("");

      if (quantity < 1) {
        return;
      }

      await updateItem(productId, quantity);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update cart.");
    }
  };

  const handleRemove = async (productId) => {
    try {
      setError("");

      await removeItem(productId);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to remove product.");
    }
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (!cart || cart.items?.length === 0) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>

      {error && <p>{error}</p>}

      {cart.items.map((item) => (
        <div key={item.product._id}>
          <h2>{item.product.name}</h2>

          <p>Price: ₹{item.product.price}</p>

          <p>
            Quantity:
            <button
              onClick={() => handleUpdate(item.product._id, item.quantity - 1)}
            >
              -
            </button>
            {item.quantity}
            <button
              onClick={() => handleUpdate(item.product._id, item.quantity + 1)}
            >
              +
            </button>
          </p>

          <p>Subtotal: ₹{item.product.price * item.quantity}</p>

          <button onClick={() => handleRemove(item.product._id)}>Remove</button>
        </div>
      ))}

      <hr />

      <h2>Total: ₹{cart.totalAmount}</h2>

      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
