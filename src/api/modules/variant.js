/* eslint-disable import/no-anonymous-default-export */
import { axiosClient, resolver } from '../client';

export default {
  addVariant(data) {
    return resolver(axiosClient.post('/variant/add', data));
  },
  getVariantsForProduct(productId) {
    return resolver(axiosClient.get(`/variant/product/${productId}`));
  },
  getVariant(id) {
    return resolver(axiosClient.get(`/variant/${id}`));
  },
  updateVariant(data) {
    return resolver(axiosClient.put('/variant/update', data));
  },
  getProductByVariantId(id) {
    return resolver(axiosClient.get(`/variant/order/product/${id}`));
  },
};
