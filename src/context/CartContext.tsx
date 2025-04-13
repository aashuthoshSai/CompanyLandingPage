'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Product } from '../config/products';
import toast, { Toaster } from 'react-hot-toast';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<boolean>;
  isCartOpen: boolean;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
  user: any;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsubscribe: () => void = () => {};

    const syncCartWithFirestore = async () => {
      if (user) {
        const cartRef = doc(db, 'carts', user.uid);
        
        unsubscribe = onSnapshot(cartRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.items) {
              setCartItems(data.items);
            }
          }
        }, (error) => {
          console.error("Error fetching cart:", error);
        });
      } else {
        setCartItems([]);
      }
    };

    if (!isLoading) {
      syncCartWithFirestore();
    }

    return () => unsubscribe();
  }, [user, isLoading]);

  const updateFirestoreCart = async (items: CartItem[]) => {
    if (user) {
      try {
        const cartRef = doc(db, 'carts', user.uid);
        const cartDoc = await getDoc(cartRef);
        
        if (cartDoc.exists()) {
          await updateDoc(cartRef, {
            items,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(cartRef, {
            userId: user.uid,
            userEmail: user.email,
            items,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (error) {
        console.error('Error updating cart in Firestore:', error);
      }
    }
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }
      
      updateFirestoreCart(newItems);
      
      toast.success(`Added ${product.name} to cart`);
      
      return newItems;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      const newItems = prevItems.filter((item) => item.id !== productId);
      
      updateFirestoreCart(newItems);
      
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from cart`);
      }
      
      return newItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      
      updateFirestoreCart(newItems);
      
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    
    if (user) {
      try {
        const cartRef = doc(db, 'carts', user.uid);
        updateDoc(cartRef, {
          items: [],
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error('Error clearing cart in Firestore:', error);
      }
    }
  };

  const checkout = async () => {
    if (!user) {
      toast.error('Please sign in to checkout');
      return false;
    }
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return false;
    }
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
          items: cartItems,
          totalPrice,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process checkout');
      }
      
      clearCart();
      setIsCartOpen(false);
      toast.success('Order placed successfully!');
      return true;
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Failed to process checkout');
      return false;
    }
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <>
      <CartContext.Provider
        value={{
          cartItems,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart,
          checkout,
          isCartOpen,
          toggleCart,
          totalItems,
          totalPrice,
          user,
        }}
      >
        {children}
        <Toaster position="top-right" />
      </CartContext.Provider>
    </>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
