import React, { useState } from 'react';
import { useCartStore } from '../lib/store';

// Sample products data - will be replaced with backend data
const sampleProducts = [
  {
    id: '1',
    name: 'Bamboo Water Bottle',
    description: 'Eco-friendly bamboo water bottle with stainless steel interior',
    price: 24.99,
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Zero Waste',
    stock: 50,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    description: '100% organic cotton t-shirt, ethically made',
    price: 29.99,
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Sustainable Fashion',
    stock: 100,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Reusable Produce Bags',
    description: 'Set of 5 mesh produce bags for plastic-free shopping',
    price: 15.99,
    image_url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Zero Waste',
    stock: 75,
    created_at: new Date().toISOString()
  }
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = selectedCategory
    ? sampleProducts.filter(product => product.category === selectedCategory)
    : sampleProducts;

  const categories = Array.from(new Set(sampleProducts.map(product => product.category)));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">${product.price}</span>
                <button
                  onClick={() => addItem(product)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}