import { createSlice } from '@reduxjs/toolkit';

export const venueSlice = createSlice({
  name: "venue",
  initialState: [
    { img: "https://pixabay.com/images/download/room-1900546_640.jpg", name: "Auditorium Hall (Capacity:200)", cost: 1000, quantity: 0 },
    { img: "https://pixabay.com/images/download/meeting-room-2450494_640.jpg", name: "Conference Room (Capacity:50)", cost: 500, quantity: 0 },
    { img: "https://pixabay.com/images/download/board-room-2450323_640.jpg", name: "Small Room (Capacity:20)", cost: 200, quantity: 0 },
  ],
  reducers: {
    incrementQuantity: (state, action) => {
      const item = state[action.payload];
      if (item && !(item.name === "Auditorium Hall (Capacity:200)" && item.quantity >= 3)) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state[action.payload];
      if (item && item.quantity > 0) {
        item.quantity--;
      }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = venueSlice.actions;
export default venueSlice.reducer;
