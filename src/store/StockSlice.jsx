// src/redux/stockSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStock: {name:"HDFCBANK BSE",
    symbol:"HDFCBANK.NS",
    currentMarketPrice:1694.3,
    percentChange:"-1.1"}, // Initially no stock is selected
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setSelectedStock(state, action) {
      state.selectedStock = action.payload; // Update the selected stock
    },
  },
});

export const { setSelectedStock } = stockSlice.actions;
export default stockSlice.reducer;