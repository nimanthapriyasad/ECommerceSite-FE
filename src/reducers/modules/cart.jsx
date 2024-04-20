import { createSlice, current } from '@reduxjs/toolkit';
import { CART_KEY } from '../../constants';
import { setCartData } from '../../utils/localStorageHelper';

const cartString = localStorage.getItem(CART_KEY);
const cartData = cartString ? JSON.parse(cartString) : null;

const initialState = {
  items: cartData ? cartData.items : [],
  total: cartData ? cartData.total : 0,
  checkoutProduct: null,
};

function calculateTotal(items) {
  let total = 0;
  items.forEach((element) => {
    total += parseFloat(element?.unitPrice) * parseInt(element?.items);
  });
  return total;
}

export const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemExisting = current(state.items).find(
        (item) => item.variantId === action.payload.variantId
      );
      if (itemExisting) {
        const itemIndex = current(state.items).findIndex(
          (item) => item.variantId === action.payload.variantId
        );
        const newItem = {
          ...itemExisting,
          items: itemExisting.items + 1,
        };

        state.items[itemIndex] = newItem;
        state.total = calculateTotal(state.items);
      } else {
        state.items = [...state.items, action.payload];
        state.total = calculateTotal(state.items);
      }
      setCartData({
        items: state.items,
        total: state.total,
      });
    },
    removeFromCart: (state, action) => {
      const itemExistingIndex = current(state.items).findIndex(
        (item) => item.variantId === action.payload.variantId
      );
      let items = [...current(state.items)];
      items.splice(itemExistingIndex, 1);
      state.items = items;
      state.total = calculateTotal(state.items);
      setCartData({
        items: state.items,
        total: state.total,
      });
    },
    goToCheckout: (state, action) => {
      state.checkoutProduct = action.payload;
    },
    clearCart: (state, action) => {
      let items = [...current(state.items)];
      const itemExistingIndex = items.findIndex(
        (item) => item.variantId === action.payload
      );

      items.splice(itemExistingIndex, 1);
      state.items = items;
      state.total = calculateTotal(state.items);
      state.checkoutProduct = null;
      setCartData({
        items: state.items,
        total: state.total,
      });
    },
    changeItemCount: (state, action) => {
      const itemExisting = current(state.items).find(
        (item) => item.variantId === action.payload.variantId
      );
      if (itemExisting) {
        const itemIndex = current(state.items).findIndex(
          (item) => item.variantId === action.payload.variantId
        );
        const newItem = {
          ...itemExisting,
          items: action.payload.newCount,
        };

        state.items[itemIndex] = newItem;
        state.total = calculateTotal(state.items);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  goToCheckout,
  clearCart,
  changeItemCount,
} = cartSlice.actions;

export default cartSlice.reducer;
