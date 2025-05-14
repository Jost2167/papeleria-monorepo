import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";  // ✅

import { loadCartFromStorage, saveCartToStorage } from "./cartStorage";

const preloadedCartState = loadCartFromStorage();

const store = configureStore({
  reducer: {
    cart: cartSlice,
    product: productSlice,
    user: userSlice,  // ✅
  },
  preloadedState: {
    cart: preloadedCartState,
  },
});

store.subscribe(() => {
  saveCartToStorage(store.getState().cart);
});

export default store;
