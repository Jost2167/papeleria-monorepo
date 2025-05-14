import { createSlice } from "@reduxjs/toolkit";

// Recuperamos el usuario guardado en localStorage al cargar la aplicación
const storedUser = localStorage.getItem('user');
const initialState = storedUser
    ? { isLoggedIn: true, ...JSON.parse(storedUser) } // Si existe, restauramos el estado
    : { isLoggedIn: false, name: "", email: "" }; // Si no existe, el usuario no está logueado

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;

      // Guardamos el usuario en localStorage
      localStorage.setItem('user', JSON.stringify({
        name: action.payload.name,
        email: action.payload.email,
      }));
    },
    logOutUser: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";

      // Eliminar usuario de localStorage cuando cierra sesión
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
