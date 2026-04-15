import { createContext, useEffect, useState } from "react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
};

type CartContextType = {
  cart: CartItem[];
  addItem: (p: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);

      if (exists) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prev, {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1
      }];
    });
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};