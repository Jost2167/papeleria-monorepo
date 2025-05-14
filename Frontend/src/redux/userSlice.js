import { createSlice } from "@reduxjs/toolkit";

// Recuperamos el usuario guardado en localStorage al cargar la aplicación
const storedUser = localStorage.getItem('user');
const initialState = storedUser
  ? { isLoggedIn: true, ...JSON.parse(storedUser) } // Restauramos el estado si existe
  : { isLoggedIn: false, name: "", email: "", role: "" }; // Estado inicial sin login

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role; // ✅ Añadimos el role

      // Guardamos el usuario con su rol en localStorage
      localStorage.setItem('user', JSON.stringify({
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
      }));
    },
    logOutUser: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.role = "";

      // Eliminar usuario de localStorage
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
