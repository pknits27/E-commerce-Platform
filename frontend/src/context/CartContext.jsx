import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], total: "0.00" });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      setCart({ items: [], total: "0.00" });
      return;
    }
    setLoading(true);
    try {
      const response = await api.get("/cart/");
      setCart(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    await api.post("/cart/items/", { product: productId, quantity });
    await fetchCart();
  };

  const updateQuantity = async (itemId, quantity) => {
    await api.patch(`/cart/items/${itemId}/`, { quantity });
    await fetchCart();
  };

  const removeFromCart = async (itemId) => {
    await api.delete(`/cart/items/${itemId}/delete/`);
    await fetchCart();
  };

  return (
    <CartContext.Provider value={{
      cart, loading, addToCart, updateQuantity, removeFromCart, refreshCart: fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
