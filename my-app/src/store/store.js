import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/Slices/cartSlice';
import userReducer from '../store/Slices/userSlice';

export const store = configureStore({
    reducer: {
        cartlist: cartReducer,
        user: userReducer,
    },
});