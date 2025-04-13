'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-4 border-b border-foreground/10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl mr-2">🐾</span>
          <h1 className="text-xl font-bold">Paws &amp; Claws Pet Store</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="#products" className="hover:underline hover:underline-offset-4">
            Products
          </Link>
          <Link href="#contact" className="hover:underline hover:underline-offset-4">
            Contact
          </Link>
        </nav>
        
        <div className="md:hidden">
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
