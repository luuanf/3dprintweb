import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  CATEGORY_BASE_PRICES,
  FIXED_SIZE_CM,
} from '../data/pricing';

const CartContext = createContext();

const STORAGE_KEY = 'logo_cart';

function normalizeCartItem(item) {
  const category = item.category;
  return {
    ...item,
    sizeCm: FIXED_SIZE_CM,
    price: CATEGORY_BASE_PRICES[category] ?? item.price,
  };
}

const NAMES = {
  boneco: 'Mini Boneco',
  pet: 'Mini Pet',
};

function loadCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeCartItem);
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const id = `${action.payload.category}_${Date.now()}`;
      const category = action.payload.category;
      const sizeCm = FIXED_SIZE_CM;
      const price = CATEGORY_BASE_PRICES[category] || 0;
      return [
        ...state,
        {
          id,
          category,
          name: NAMES[category] || category,
          price,
          sizeCm,
          quantity: 1,
          notes: action.payload.notes || '',
        },
      ];
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload);
    case 'UPDATE_QUANTITY':
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
    case 'UPDATE_NOTES':
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, notes: action.payload.notes }
          : item
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (payload) => dispatch({ type: 'ADD_ITEM', payload });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const updateNotes = (id, notes) => dispatch({ type: 'UPDATE_NOTES', payload: { id, notes } });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const formatPrice = (cents) =>
    `R$${(cents / 100).toFixed(2).replace('.', ',')}`;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateNotes,
        clearCart,
        totalItems,
        totalPrice,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
