'use client';

import React, { useState } from 'react';
import { productCategories } from '../config/products';

export default function ProductList() {
  const [activeCategory, setActiveCategory] = useState(productCategories[0].id);

  return (
    <section className="w-full max-w-6xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {productCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-foreground text-background'
                : 'bg-background border border-foreground/10 hover:bg-foreground/5'
            }`}
          >
            <span className="mr-2">{category.emoji}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productCategories
          .find((cat) => cat.id === activeCategory)
          ?.products.map((product) => (
            <div
              key={product.id}
              className="border border-foreground/10 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-lg">{product.name}</h3>
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
