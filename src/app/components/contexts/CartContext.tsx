// src/components/contexts/CartContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItemType {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []); // Executa apenas na montagem inicial

  const updateLocalStorage = (items: CartItemType[]) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const addToCart = (item: CartItemType) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        const updatedItems = prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        updateLocalStorage(updatedItems);
        return updatedItems;
      }
      const newItems = [...prevItems, { ...item, quantity: 1 }];
      updateLocalStorage(newItems);
      return newItems;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      updateLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      updateLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
