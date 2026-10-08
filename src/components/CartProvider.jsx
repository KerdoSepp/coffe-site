import { useEffect, useMemo, useState } from 'react';

import CartContext from '../context/cart-context.js';
import { coffeeProducts } from '../data/Products.js';

const CART_STORAGE_KEY = 'kohtu-coffee-cart';

function loadCartItems() {
  try {
    const storedItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));

    if (!Array.isArray(storedItems)) return [];

    return storedItems.flatMap((item) => {
      const product = coffeeProducts.find(
        (coffee) => coffee.id === item.productId
      );
      const quantity = Number(item.quantity);

      if (
        !product ||
        !item.size ||
        !Number.isFinite(quantity) ||
        quantity <= 0
      ) {
        return [];
      }

      return [{ product, size: item.size, quantity }];
    });
  } catch {
    return [];
  }
}

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCartItems);

  useEffect(() => {
    const storedItems = cartItems.map(({ product, size, quantity }) => ({
      productId: product.id,
      size,
      quantity,
    }));

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedItems));
  }, [cartItems]);

  const addItem = (product, size, quantity) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { product, size, quantity }];
    });
  };

  const updateQuantity = (productId, size, quantity) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const clearCart = () => {
    setCartItems([]);
  };

  const value = useMemo(
    () => ({
      cartItems,
      quantity,
      addItem,
      updateQuantity,
      clearCart,
    }),
    [cartItems, quantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
