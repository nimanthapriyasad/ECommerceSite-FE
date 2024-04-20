import { axiosClient, resolver } from '../client';

export default {
    getYears() {
        return resolver(axiosClient.get('/report/getyears'));
      },

   getAllCategories(){
    return resolver(axiosClient.get('/category/'));
   },
   getSubCategoryAccordingToCategory(category_id){
        return resolver(axiosClient.get(`/report/getsubcategories/${category_id}`))
   },
   getProductAccordingToSubCategory(sub_category_id){
   
    return resolver(axiosClient.get(`/report/getproducts/${sub_category_id}`))
},
getQuaterlySalesReport(year){
    return resolver(axiosClient.get(`/report/quaterlysales/${year}`))
},
getSalesReport(year){
    return resolver(axiosClient.get(`/report/totalsales/${year}`))
},
getOrdersReport(year){
    return resolver(axiosClient.get(`/report/totalorders/${year}`))
},
getmostSalesAccordingToTime(year,fromMonth,toMonth){
    return resolver(axiosClient.get(`/report/totalsalesaccordingtotime/${year}/${fromMonth}/${toMonth}`))
},
getcategorywithmostorders(year){
    return resolver(axiosClient.get(`/report/getcategorywithmostorders/${year}`))
},getorderoverview(year,category,subcategory,product){
    return resolver(axiosClient.get(`/report/getordersoverview/${year}/${category}/${subcategory}/${product}`));
},



}