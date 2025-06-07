import React, { createContext, useState, useEffect } from "react";

export const cartContext = createContext();

export const CartContextProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      if (!stored || stored === "undefined") return [];
      return JSON.parse(stored);
    } catch (error) {
      console.error("Failed to parse cartItems from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
  setCart((prev) => {
    const exists = prev.find((item) => item._id === product._id);
    if (exists) {
      alert("Item is already present");
      return prev;
    } else {
      return [...prev, { ...product, quantity: 1 }];
    }
  });
};


  const removeFromCart = (id) => {
    // console.log(id)
    
    setCart((prev) => prev.filter((item) => item._id !== id));
  };
const updateQuantity = (id, amount) => {
  setCart((prev) =>
    prev.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    )
  );
};

  

  const clearCart = () => {
    setCart([]);
  };

  return (
    <cartContext.Provider
      value={{ cart, addToCart, removeFromCart,updateQuantity,clearCart }}
    >
      {children}
    </cartContext.Provider>
  );
};
