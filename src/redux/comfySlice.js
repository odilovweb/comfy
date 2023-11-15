import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: JSON.parse(localStorage.getItem("products"))
    ? JSON.parse(localStorage.getItem("products"))
    : [],
  mode: JSON.parse(localStorage.getItem("mode"))
    ? JSON.parse(localStorage.getItem("mode"))
    : "light",
  user: null,
  orders: JSON.parse(localStorage.getItem("orders"))
    ? JSON.parse(localStorage.getItem("orders"))
    : [],
};

const comfySlice = createSlice({
  name: "comfy",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode === "light"
        ? ((state.mode = "dark"),
          localStorage.setItem("mode", JSON.stringify("dark")))
        : ((state.mode = "light"),
          localStorage.setItem("mode", JSON.stringify("light")));
    },
    settingUser: (state, { payload }) => {
      state.user = payload;
    },
    setProduct: (state, { payload }) => {
      for (let i = 0; i < payload.num; i++) {
        state.products.push(payload.item);
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    removeProduct: (state, { payload }) => {
      state.products = state.products.filter((item) => {
        return item.id !== payload;
      });
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    setCheckout: (state, { payload }) => {
      state.orders.push({
        name: payload.name,
        address: payload.address,
        products: state.products.length,
        cost: payload.cost,
        date: payload.date,
      });
      state.products = [];
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
  },
});
export const {
  setMode,
  setProduct,
  settingUser,
  removeProduct,
  addNumSub,
  setCheckout,
} = comfySlice.actions;
export default comfySlice.reducer;
