import { configureStore } from '@reduxjs/toolkit';
import user from './modules/user';
import cart from './modules/cart';

export const store = configureStore({
  reducer: {
    user,
    cart,
  },
});

export default store;
