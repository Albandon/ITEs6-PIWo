import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

const getInitialCart = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  return [];
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      if (state.find(item => item.id === action.book.id)) return state;
      return [...state, action.book];
    case "REMOVE_FROM_CART":
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, getInitialCart());

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}