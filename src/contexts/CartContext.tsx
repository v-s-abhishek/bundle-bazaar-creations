
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Bundle, calculateBundleOriginalPrice } from "@/data/products";
import { toast } from "@/components/ui/use-toast";

interface CartItem {
  type: "product" | "bundle";
  item: Product | Bundle;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Product | Bundle, type: "product" | "bundle") => void;
  removeFromCart: (itemId: string, type: "product" | "bundle") => void;
  updateQuantity: (itemId: string, type: "product" | "bundle", quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("bazaar_cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("bazaar_cart", JSON.stringify(cartItems));
    
    // Update cart count
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
    
    // Update cart total
    const total = cartItems.reduce((sum, item) => {
      if (item.type === "product") {
        return sum + (item.item as Product).price * item.quantity;
      } else {
        const bundle = item.item as Bundle;
        const originalPrice = calculateBundleOriginalPrice(bundle);
        const discountedPrice = originalPrice * (1 - bundle.discount / 100);
        return sum + discountedPrice * item.quantity;
      }
    }, 0);
    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (item: Product | Bundle, type: "product" | "bundle") => {
    setCartItems((prevItems) => {
      // Check if item is already in cart
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.item.id === item.id && cartItem.type === type
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        
        toast({
          title: "Quantity updated",
          description: `${item.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
        });
        
        return updatedItems;
      } else {
        // Item doesn't exist, add it
        toast({
          title: "Added to cart",
          description: `${item.name} added to your cart`,
        });
        
        return [...prevItems, { type, item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string, type: "product" | "bundle") => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => !(item.item.id === itemId && item.type === type)
      );
      
      if (updatedItems.length < prevItems.length) {
        toast({
          title: "Item removed",
          description: "Item removed from your cart",
        });
      }
      
      return updatedItems;
    });
  };

  const updateQuantity = (itemId: string, type: "product" | "bundle", quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId, type);
      return;
    }

    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.item.id === itemId && item.type === type) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
