// context/AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const INITIAL_PRODUCTS = [
  { 
    id: '1', 
    name: 'Fresh Organic Apples', 
    price: 120, 
    originalPrice: 150,
    discount: '20% OFF',
    unit: '1 kg', 
    category: 'Fruits',
    image: '🍎', 
    rating: 4.8,
    reviews: '240',
    deliveryTime: '10 MINS',
    description: 'Crisp, sweet, and handpicked organic apples delivered farm-fresh to your doorstep.' 
  },
  { 
    id: '2', 
    name: 'MilkyMist Farm Fresh Milk', 
    price: 68, 
    originalPrice: 75,
    discount: '9% OFF',
    unit: '1 Litre', 
    category: 'Dairy',
    image: '🥛', 
    rating: 4.9,
    reviews: '512',
    deliveryTime: '8 MINS',
    description: 'Pure, pasteurized cow milk rich in calcium and essential nutrients. Sealed for safety.' 
  },
  { 
    id: '3', 
    name: 'Hydroponic Fresh Spinach', 
    price: 35, 
    originalPrice: 50,
    discount: '30% OFF',
    unit: '1 Bunch', 
    category: 'Vegetables',
    image: '🥬', 
    rating: 4.6,
    reviews: '180',
    deliveryTime: '10 MINS',
    description: 'Pesticide-free leafy greens harvested using advanced hydroponic farming.' 
  },
  { 
    id: '4', 
    name: 'Hass Premium Avocados', 
    price: 140, 
    originalPrice: 180,
    discount: '22% OFF',
    unit: '2 Pieces', 
    category: 'Fruits',
    image: '🥑', 
    rating: 4.7,
    reviews: '95',
    deliveryTime: '12 MINS',
    description: 'Creamy, nutrient-dense avocados perfect for healthy breakfast toasts and salads.' 
  },
  { 
    id: '5', 
    name: 'Wildflower Raw Honey', 
    price: 350, 
    originalPrice: 420,
    discount: '15% OFF',
    unit: '500g', 
    category: 'Pantry',
    image: '🍯', 
    rating: 4.9,
    reviews: '320',
    deliveryTime: '15 MINS',
    description: '100% pure, unfiltered wildflower honey packed with natural immunity boosters.' 
  },
];

export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('Customer');
  const [userProfile, setUserProfile] = useState({
    name: 'Karthik Raja',
    email: 'karthik.raja@freshmart.com',
    phone: '+91 98765 43210',
    address: 'Flat 4B, Green Meadows, Anna Nagar, Chennai'
  });
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const toggleFavorite = (product) => {
    setFavorites((prevFavs) => {
      const exists = prevFavs.some((item) => item.id === product.id);
      if (exists) {
        return prevFavs.filter((item) => item.id !== product.id);
      }
      return [...prevFavs, product];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        userProfile,
        setUserProfile,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartTotal,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};