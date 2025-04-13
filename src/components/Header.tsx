'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { auth, signOut } from '../config/firebase';
import AuthForms from './AuthForms';
import Cart from './Cart';

export default function Header() {
  const { user, toggleCart, totalItems } = useCart();
  const [showAuth, setShowAuth] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleAuth = () => {
    setShowAuth(!showAuth);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className="w-full py-4 border-b border-foreground/10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl mr-2">🐾</span>
          <h1 className="text-xl font-bold">Paws &amp; Claws Pet Store</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="#products" className="hover:underline hover:underline-offset-4">
            Products
          </Link>
          <Link href="#contact" className="hover:underline hover:underline-offset-4">
            Contact
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Hello, {user.email.split('@')[0]}</span>
              <button 
                onClick={handleSignOut}
                className="text-sm hover:underline hover:underline-offset-4"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={toggleAuth}
              className="text-sm hover:underline hover:underline-offset-4"
            >
              Sign In
            </button>
          )}
          
          <button 
            onClick={toggleCart}
            className="relative p-2 hover:bg-foreground/5 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-foreground text-background text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
        
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleCart}
            className="relative p-2 mr-2 hover:bg-foreground/5 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-foreground text-background text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          
          <button 
            onClick={toggleMobileMenu}
            className="p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden py-4 px-4 border-t border-foreground/10">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="#products" 
              className="hover:underline hover:underline-offset-4"
              onClick={() => setShowMobileMenu(false)}
            >
              Products
            </Link>
            <Link 
              href="#contact" 
              className="hover:underline hover:underline-offset-4"
              onClick={() => setShowMobileMenu(false)}
            >
              Contact
            </Link>
            
            {user ? (
              <div className="flex flex-col space-y-2">
                <span className="text-sm">Hello, {user.email.split('@')[0]}</span>
                <button 
                  onClick={handleSignOut}
                  className="text-sm hover:underline hover:underline-offset-4 text-left"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  toggleAuth();
                  setShowMobileMenu(false);
                }}
                className="text-sm hover:underline hover:underline-offset-4 text-left"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      )}
      
      {/* Auth modal */}
      {showAuth && !user && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={toggleAuth}
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-background rounded-lg shadow-xl max-w-md w-full">
              <div className="absolute top-4 right-4">
                <button 
                  onClick={toggleAuth}
                  className="p-2 hover:bg-foreground/5 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <AuthForms />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Cart component */}
      <Cart />
    </header>
  );
}
