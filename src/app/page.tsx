import React from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-foreground/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Paws &amp; Claws Pet Store</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Your one-stop shop for all your pet needs. Quality products for every pet at affordable prices.</p>
            <a 
              href="#products" 
              className="inline-block px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Browse Products
            </a>
          </div>
        </section>
        
        {/* Products Section */}
        <section id="products" className="py-12 bg-background">
          <ProductList />
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-12 bg-foreground/5">
          <ContactForm />
        </section>
      </main>
      
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Paws &amp; Claws Pet Store</h3>
              <p>Your local pet store with everything your furry, feathery, or scaly friend needs.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Store Hours</h3>
              <p>Monday - Friday: 9am - 7pm</p>
              <p>Saturday: 10am - 6pm</p>
              <p>Sunday: 11am - 5pm</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p>Email: aashuthoshbsai@gmail.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-background/20 text-center">
            <p>&copy; {new Date().getFullYear()} Paws &amp; Claws Pet Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
