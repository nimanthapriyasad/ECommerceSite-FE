/* eslint-disable import/no-anonymous-default-export */
import { axiosClient, resolver } from '../client';

export default {
  signInUser(data) {
    return resolver(axiosClient.post('/user/signin', data));
  },
  signUpUser(data) {
    return resolver(axiosClient.post('/user/signup', data));
  },
  resetPassword(email) {
    return resolver(axiosClient.get(`/user/reset-password/${email}`));
  },
  getUser(userId) {
    return resolver(axiosClient.get(`/user/${userId}`));
  },
  getUserOrders(userId) {
   
    return resolver(axiosClient.get(`/user/getuserorders/${userId}`));
  },
};
