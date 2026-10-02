import { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../services/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await getCart();

      setCart({
        ...response.data.cart,
        totalAmount: response.data.totalAmount,
      });
    } catch (error) {
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, quantity = 1) => {
    const response = await addToCart(productId, quantity);

    setCart({
      ...response.data.cart,
      totalAmount: response.data.totalAmount,
    });

    return response;
  };

  const updateItem = async (productId, quantity) => {
    const response = await updateCartItem(productId, quantity);

    setCart({
      ...response.data.cart,
      totalAmount: response.data.totalAmount,
    });

    return response;
  };

  const removeItem = async (productId) => {
    const response = await removeFromCart(productId);

    setCart({
      ...response.data.cart,
      totalAmount: response.data.totalAmount,
    });

    return response;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
