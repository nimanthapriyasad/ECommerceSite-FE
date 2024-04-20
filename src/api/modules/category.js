/* eslint-disable import/no-anonymous-default-export */
import { axiosClient, resolver } from '../client';

export default {
  getAllCategories() {
    return resolver(axiosClient.get('/category'));
  },
  getCategoryDetails(id) {
    return resolver(axiosClient.get(`/category/get/${id}`));
  },
  addCategory(data) {
    return resolver(axiosClient.post('/category/add', data));
  },
};
