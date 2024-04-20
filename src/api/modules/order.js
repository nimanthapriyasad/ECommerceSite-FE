/* eslint-disable import/no-anonymous-default-export */
import { axiosClient, resolver } from '../client';

export default {
  getOrdersToStatus(status) {
    return resolver(axiosClient.get(`/order/status/${status}`));
  },
  getOrderProducts(orderId) {
    return resolver(axiosClient.get(`/order/products/${orderId}`));
  },
  shipOrder(data) {
    return resolver(axiosClient.post('/order/ship', data));
  },
  rejectOrder(data) {
    return resolver(axiosClient.post('/order/reject', data));
  },
  completeOrder(data) {
    return resolver(axiosClient.post('/order/complete', data));
  },
  giveRefund(data) {
    return resolver(axiosClient.post('/order/refund', data));
  },
  placeOrder(data) {
    
    return resolver(axiosClient.post('/order/add', data));
  },
};
