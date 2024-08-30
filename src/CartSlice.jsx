// CartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to hold cart items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.name === action.payload.name);
      if (itemIndex >= 0) {
        // If item already exists, increment the quantity
        state.items[itemIndex].quantity += 1;
      } else {
        // Add new item with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.name === action.payload.name);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = action.payload.quantity;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
  },
});

export const { addItem, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
