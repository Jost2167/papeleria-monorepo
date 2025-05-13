export const loadCartFromStorage = () => {
    try {
      const serializedCart = localStorage.getItem("cart");
      if (!serializedCart) return undefined;
      return JSON.parse(serializedCart);
    } catch (e) {
      console.error("Error al leer el carrito desde localStorage", e);
      return undefined;
    }
  };
  
  export const saveCartToStorage = (cartState) => {
    try {
      const serializedCart = JSON.stringify(cartState);
      localStorage.setItem("cart", serializedCart);
    } catch (e) {
      console.error("Error al guardar el carrito en localStorage", e);
    }
  };
  