// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./StockSlice";

const store = configureStore({
  reducer: {
    stock: stockReducer, // Add the stock reducer
  },
});

export default store;