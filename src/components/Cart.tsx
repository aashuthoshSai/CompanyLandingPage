'use client';

import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
    isCartOpen,
    toggleCart,
    totalItems,
    totalPrice,
    user,
  } = useCart();

  const handleCheckout = async () => {
    if (!user) {
      alert('Please sign in to checkout');
      return;
    }
    
    const success = await checkout();
    if (success) {
      alert('Order placed successfully!');
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={toggleCart}
      />
      
      {/* Cart panel */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-background shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-foreground/10">
            <h2 className="text-lg font-bold">Your Cart ({totalItems})</h2>
            <button 
              onClick={toggleCart}
              className="p-2 hover:bg-foreground/5 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Cart items */}
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-foreground/70">
                Your cart is empty
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between border-b border-foreground/10 pb-4">
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-foreground/70">${item.price.toFixed(2)} each</p>
                      
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center border border-foreground/20 rounded-l-md"
                        >
                          -
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center border-t border-b border-foreground/20">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center border border-foreground/20 rounded-r-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-600 hover:text-red-800 mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-foreground/10">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || !user}
                className="w-full py-2 px-4 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!user ? 'Sign in to Checkout' : 'Checkout'}
              </button>
              
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full py-2 px-4 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  Clear Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
