import { CART_KEY, TOKEN_KEY, USER_DETAILS } from '../constants';

export function setAuthorizationKey(token) {
  const key = `Bearer ${token}`;
  localStorage.setItem(TOKEN_KEY, key);
}

export function setUserObjectInLocal(user) {
  const userString = JSON.stringify(user);
  localStorage.setItem(USER_DETAILS, userString);
}

export function setCartData(data) {
  const cartString = JSON.stringify(data);
  localStorage.setItem(CART_KEY, cartString);
}
