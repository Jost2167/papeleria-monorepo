import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import { loadCartFromStorage, saveCartToStorage } from "./cartStorage";

// Cargar carrito desde localStorage
const preloadedCartState = loadCartFromStorage();

const store = configureStore({
  reducer: {
    cart: cartSlice,
    product: productSlice,
  },
  preloadedState: {
    cart: preloadedCartState, // Solo pre-cargar el carrito
  },
});

// Guardar carrito cada vez que se actualice
store.subscribe(() => {
  saveCartToStorage(store.getState().cart);
});

export default store;
