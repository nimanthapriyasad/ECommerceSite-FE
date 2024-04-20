import React, { useEffect, useState } from 'react';
// material-ui
import {
  Grid,
  Typography,
  CssBaseline,
  Box,
  Stack,
  Autocomplete,
  TextField,
} from '@mui/material';
import { round } from 'mathjs';
import AnalyticEcommerce from './../../../components/cards/statistics/AnalyticEcommerce';
import HeightBox from '../../../components/HeightBox';
import MainCard from './../../../components/cards/MainCaard';
import ProductInterest from '../../../components/DashboardCharts/ProductInterest';
import { TrafficByDevice } from './../../../components/DashboardCharts/ChartForCategory/index';
import api from '../../../api';

export default function Dashboard(props) {
  var months = [
    { label: 'January', val: 1 },
    { label: 'February', val: 2 },
    { label: 'March', val: 3 },
    { label: 'April', val: 4 },
    { label: 'May', val: 5 },
    { label: 'June', val: 6 },
    { label: 'July', val: 7 },
    { label: 'August', val: 8 },
    { label: 'September', val: 9 },
    { label: 'October', val: 10 },
    { label: 'November', val: 11 },
    { label: 'December', val: 12 },
  ];

  const [year, setYear] = useState('2022');
  const [totalSalesYear, settotalSalesYear] = useState('2022');
  const [interesAnalysisYear, setInteresAnalysisYear] = useState('2022');
  const [categoryYear, setCategoryYear] = useState('2022');
  const [overViewOfMostSalesYear, setOverViewOfMostSalesYear] =
    useState('2022');
  const [totalOrdersYear, settotalOrdersYear] = useState('2022');

  const [years, setYears] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  var [quaterlySales, setQuaterlySales] = useState([
    { quater: 1, sales: 0 },
    { quater: 2, sales: 0 },
    { quater: 3, sales: 0 },
    { quater: 4, sales: 0 },
  ]);
  var [salesReport, setTotalSales] = useState([
    { tatotal_sale: 0 },
    { rejected_sale: 0 },
    { refunded_sales: 0 },
    { shoppickup_sales: 0 },
    { delivery_sales: 0 },
  ]);
  var [ordersReport, setTotalOrders] = useState([
    { total_orders: 0 },
    { placed_orders: 0 },
    { shiped_orders: 0 },
    { delivered_orders: 0 },
    { rejected_orders: 0 },
    { refunded_orders: 0 },
    { store_pickup_orders: 0 },
    { deliver_orders: 0 },
  ]);
  var [totalSalesAccordingToTime, settotalSalesAccordingToTime] = useState([
    {
      category_name: '',
      max: '0',
    },
    {
      title: '',
      max: '0',
    },
    {
      name: '',
      max: '0',
    },
    {
      variant_type: '',
      max: '0',
    },
  ]);

  var [categoryWithMostOrders, setcategoryWithMostOrders] = useState([
    {
      category_name: '',
      orders: '0',
      percentage: 0,
    },
  ]);

  var [orderOverview, setOrderOverview] = useState([
    { month: 1, order_count: 0 },
    { month: 2, order_count: 0 },
    { month: 3, order_count: 0 },
    { month: 4, order_count: 0 },
    { month: 5, order_count: 0 },
    { month: 6, order_count: 0 },
    { month: 7, order_count: 0 },
    { month: 8, order_count: 0 },
    { month: 9, order_count: 0 },
    { month: 10, order_count: 0 },
    { month: 11, order_count: 0 },
    { month: 12, order_count: 0 },
  ]);

  const [category, setCategory] = useState('');
  const [sub_category, setSubCategory] = useState('');

  const [product, setProduct] = useState('');
  const [fromMonth, setFromMonth] = useState(months[0].label);
  const [fromMonthValue, setFromMonthValue] = useState(months[0].val);
  const [toMonth, setToMonth] = useState(months[0].label);
  const [toMonthValue, setToMonthValue] = useState(months[0].val);

  const handleChangetotalOrdersYear = (event) => {
    settotalOrdersYear(event);
  };

  const handleChangeSubCategory = (event) => {
    setSubCategory(event);
  };

  const handleChange = (event) => {
    setYear(event);
  };
  const handleChangeOverViewOfMostSalesYear = (event) => {
    setOverViewOfMostSalesYear(event);
  };
  const handleChangeInteresAnalysisYear = (event) => {
    setInteresAnalysisYear(event);
  };
  const handleChangetotalSalesYear = (event) => {
    settotalSalesYear(event);
  };
  const handleChangeCategoryYear = (event) => {
    setCategoryYear(event);
  };
  const handleChangeFromMonth = (event) => {
    setFromMonth(event);
  };
  const handleChangeToMonth = (event) => {
    setToMonth(event);
  };

  const handleChangeCategory = (event) => {
    setCategory(event);
  };
  const handleChangeProduct = (event) => {
    setProduct(event);
  };
  function calculatePercentageQuaterLysale(quater) {
    const tot =
      parseFloat(quaterlySales[0].sales) +
      parseFloat(quaterlySales[1].sales) +
      parseFloat(quaterlySales[2].sales) +
      parseFloat(quaterlySales[3].sales);

    if (tot != 0) {
      if (quaterlySales[quater].sales == 0) {
        return '0';
      }
      return round((parseFloat(quaterlySales[quater].sales) * 100) / tot);
    }

    return '0';
  }
  async function getAllYears() {
    try {
      const [code, res] = await api.report.getYears();
      const rows = [];
      if (res?.statusCode === 200) {
        res?.data?.years?.forEach((element) => {
          const temp = {
            label: element.year,
            ...element,
          };
          rows.push(temp);
        });
      }

      setYears(rows);
    } catch (error) {}
  }

  async function getSubCategoriesForCategory(categoryId) {
    try {
      const [code, res] = await api.subCategory.getSubCategoriesForCategory(
        categoryId
      );

      const rows = [];

      if (res?.statusCode === 200) {
        res?.data?.subCategories.forEach((element) => {
          const temp = {
            label: element.name,
            ...element,
          };
          rows.push(temp);
        });
      }
      setSubCategory(rows[0].name);
      setSubCategories(rows);
    } catch (error) {}
  }

  async function getAllCategories() {
    try {
      const [code, res] = await api.category.getAllCategories();
      const rows = [];
      var temcategory = [];

      if (res?.statusCode === 200) {
        res?.data.forEach((element) => {
          const arr = {
            category_name: element.category_name,
            orders: '0',
            percentage: '0',
          };
          const temp = {
            label: element.category_name,
            ...element,
          };
          rows.push(temp);
          temcategory.push(arr);
        });
      }

      setcategoryWithMostOrders(temcategory);
      setCategories(rows);
    } catch (error) {}
  }
  async function getProductsForSubCategory(id) {
    try {
      const [code, res] = await api.report.getProductAccordingToSubCategory(id);

      const rows = [];

      if (res?.statusCode === 200) {
        res?.data?.products.forEach((element) => {
          const temp = {
            label: element.title,
            ...element,
          };
          rows.push(temp);
        });
      }
      setProduct(rows[0].title);
      setProducts(rows);
    } catch (error) {
      console.log('error');
    }
  }

  async function getQuaterlySalesReport(year) {
    try {
      const [code, res] = await api.report.getQuaterlySalesReport(year);
      var row = [
        { quater: 1, sales: 0 },
        { quater: 2, sales: 0 },
        { quater: 3, sales: 0 },
        { quater: 4, sales: 0 },
      ];
      if (res?.statusCode === 200) {
        res?.data?.salesReport.forEach((element) => {
          row[element.quater - 1].sales = element.sales;
        });
      } else {
      }

      setQuaterlySales(row);
    } catch (error) {
      console.log('erore');
    }
  }
  async function getSalesReport(year) {
    try {
      const [code, res] = await api.report.getSalesReport(year);

      var row = [
        { tatotal_sale: 0 },
        { rejected_sale: 0 },
        { refunded_sales: 0 },
        { shoppickup_sales: 0 },
        { delivery_sales: 0 },
      ];
      if (res?.statusCode === 200) {
        res?.data?.salesReport.forEach((element) => {
          if (element?.order_status) {
            switch (element?.order_status) {
              case 'DELIVERED':
                row[0].tatotal_sale = element.sales_on_status;
                break;
              case 'REJECTED':
                row[1].rejected_sale = element.sales_on_status;
                break;
              case 'REFUNDED':
                row[2].refunded_sales = element.sales_on_status;
                break;
              default:
                break;
            }
          } else {
            switch (element?.delivery_method) {
              case 'DELIVERY':
                row[4].delivery_sales = element.total_sales;
                break;
              case 'STORE_PICKUP':
                row[3].shoppickup_sales = element.total_sales;
                break;

              default:
                break;
            }
          }
        });
      }

      setTotalSales(row);
    } catch (error) {
      console.log('erore');
    }
  }

  async function getOrdersReport(year) {
    try {
      const [code, res] = await api.report.getOrdersReport(year);

      var row = [
        { total_orders: 0 },
        { placed_orders: 0 },
        { shiped_orders: 0 },
        { delivered_orders: 0 },
        { rejected_orders: 0 },
        { refunded_orders: 0 },
        { store_pickup_orders: 0 },
        { deliver_orders: 0 },
      ];
      if (res?.statusCode === 200) {
        res?.data?.ordersReport.forEach((element) => {
          if (element?.order_status) {
            switch (element?.order_status) {
              case 'DELIVERED':
                row[3].delivered_orders = element.total_orders_on_status;
                break;
              case 'REJECTED':
                row[4].rejected_orders = element.total_orders_on_status;
                break;
              case 'REFUNDED':
                row[5].refunded_orders = element.total_orders_on_status;
                break;
              case 'PLACED':
                row[1].placed_orders = element.total_orders_on_status;
                break;
              case 'SHIPPED':
                row[2].shiped_orders = element.total_orders_on_status;
                break;
              default:
                break;
            }
          } else {
            if (element?.total_orders) {
              row[0].total_orders = element.total_orders;
            } else {
              switch (element?.delivery_method) {
                case 'DELIVERY':
                  row[7].deliver_orders =
                    element.total_orders_on_delevery_method;
                  break;
                case 'STORE_PICKUP':
                  row[6].store_pickup_orders =
                    element.total_orders_on_delevery_method;
                  break;

                default:
                  break;
              }
            }
          }
        });
      }

      setTotalOrders(row);
    } catch (error) {
      console.log('erore');
    }
  }
  async function getTotalSalesAccordingTotime(year, fromMonth, toMonth) {
    try {
      const [code, res] = await api.report.getmostSalesAccordingToTime(
        year,
        fromMonth,
        toMonth
      );

      if (res?.statusCode === 200) {
        if (res?.data?.sales === undefined || res?.data?.sales.length == 0) {
          settotalSalesAccordingToTime([
            {
              category_name: '',
              max: '0',
            },
            {
              title: '',
              max: '0',
            },
            {
              name: '',
              max: '0',
            },
            {
              variant_type: '',
              max: '0',
            },
          ]);
        } else {
          settotalSalesAccordingToTime(res?.data?.sales);
        }
      }
    } catch (error) {
      console.log('error');
    }
  }

  async function getcategorywithmostorders(year) {
    try {
      const [code, res] = await api.report.getcategorywithmostorders(year);
      var row = [];

      if (res?.statusCode === 200) {
        if (
          res?.data?.category === undefined ||
          res?.data?.category.length == 0
        ) {
          setcategoryWithMostOrders([
            {
              category_name: '',
              orders: '0',
              percentage: 0,
            },
          ]);
        } else {
          res?.data?.category.forEach((element) => {
            row.push(element);
          });
          console.log('sumeela', row);
          setcategoryWithMostOrders(row);
        }
      }
    } catch (error) {
      console.log('error');
    }
  }

  async function getOrderOverView(year, category, subcategory, product) {
    try {
      const [code, res] = await api.report.getorderoverview(
        year,
        category,
        subcategory,
        product
      );
      var row = [...orderOverview];

      if (res?.statusCode === 200) {
        if (res?.data?.orders === undefined || res?.data?.orders.length == 0) {
          setOrderOverview([
            { month: 1, order_count: 0 },
            { month: 2, order_count: 0 },
            { month: 3, order_count: 0 },
            { month: 4, order_count: 0 },
            { month: 5, order_count: 0 },
            { month: 6, order_count: 0 },
            { month: 7, order_count: 0 },
            { month: 8, order_count: 0 },
            { month: 9, order_count: 0 },
            { month: 10, order_count: 0 },
            { month: 11, order_count: 0 },
            { month: 12, order_count: 0 },
          ]);
        } else {
          res?.data?.orders.forEach((element) => {
            for (var index = 0; index < orderOverview.length; index++) {
              if (row[index].month == element.month) {
                row[index].order_count = element.order_count;
              }
            }
          });
          setOrderOverview(row);
        }
      }
    } catch (error) {
      console.log('error');
    }
  }
  useEffect(() => {
    getAllYears();
    getAllCategories();
    getQuaterlySalesReport(year);
    getSalesReport(totalSalesYear);
    getOrdersReport(totalOrdersYear);
    getTotalSalesAccordingTotime(
      overViewOfMostSalesYear,
      fromMonthValue,
      toMonthValue
    );
    getcategorywithmostorders(categoryYear);
    getOrderOverView(interesAnalysisYear, category, sub_category, product);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <CssBaseline />
          <Grid container alignItems="center" columnSpacing={2.75}>
            <Grid item>
              <Typography variant="h5">Total Sales Overview</Typography>
            </Grid>

            <Grid item>
              <Box sx={{ minWidth: 150 }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={years}
                  sx={{ width: 130 }}
                  value={totalSalesYear}
                  onChange={(event, value) => {
                    settotalSalesYear(value?.year);
                    if (value) {
                      getSalesReport(value?.year);
                    }
                    handleChangetotalSalesYear(value?.year);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Year" />
                  )}
                />
              </Box>
            </Grid>
          </Grid>

          <HeightBox height={1} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title="Total Sales "
            count={salesReport[0].tatotal_sale}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title="Refunded Sales "
            count={salesReport[2].refunded_sales}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title=" Rejected Sales "
            count={salesReport[1].rejected_sale}
            isLoss
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title=" Storepickup Sales"
            count={salesReport[3].shoppickup_sales}
            isLoss
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title=" Delivery Sales"
            count={salesReport[4].delivery_sales}
            isLoss
            color="warning"
          />
        </Grid>

        <Grid
          item
          md={8}
          sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }}
        />

        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <CssBaseline />
          <Grid container alignItems="center" columnSpacing={2.75}>
            <Grid item>
              <Typography variant="h5">Total Orders Overview</Typography>
            </Grid>

            <Grid item>
              <Box sx={{ minWidth: 150 }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={years}
                  sx={{ width: 130 }}
                  value={totalOrdersYear}
                  onChange={(event, value) => {
                    settotalOrdersYear(value?.year);
                    if (value) {
                      getOrdersReport(value?.year);
                    }
                    handleChangetotalOrdersYear(value?.year);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Year" />
                  )}
                />
              </Box>
            </Grid>
          </Grid>

          <HeightBox height={1} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title="Total Orders "
            count={ordersReport[0].total_orders}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title="Placed orders "
            count={ordersReport[1].placed_orders}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title=" Shiped orders "
            count={ordersReport[2].shiped_orders}
            isLoss
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title="Completed orders"
            count={ordersReport[3].delivered_orders}
            isLoss
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title=" Rejected Orders"
            count={ordersReport[4].rejected_orders}
            isLoss
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title=" Refunded Orders"
            count={ordersReport[5].refunded_orders}
            isLoss
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title=" Storepickup Orders"
            count={ordersReport[6].store_pickup_orders}
            isLoss
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <AnalyticEcommerce
            title=" Delivery Orders"
            count={ordersReport[7].deliver_orders}
            isLoss
            color="warning"
          />
        </Grid>

        <Grid
          item
          md={8}
          sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }}
        />
        <Grid marginTop={6} item xs={12} sx={{ mb: -2.25 }}>
          <CssBaseline />
          <Grid container alignItems="center" columnSpacing={2.75}>
            <Grid item>
              <Typography variant="h5">Quaterly Sales Report for </Typography>
            </Grid>

            <Grid item>
              <Box sx={{ minWidth: 150 }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={years}
                  sx={{ width: 130 }}
                  value={year}
                  onChange={(event, value) => {
                    setYear(value?.year);
                    if (value) {
                      getQuaterlySalesReport(value?.year);
                    }
                    handleChange(value?.year);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Year" />
                  )}
                />
              </Box>
            </Grid>
          </Grid>

          <HeightBox height={1} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Sales of January - March "
            count={quaterlySales[0].sales}
            percentage={calculatePercentageQuaterLysale(0)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Sales of April - June"
            count={quaterlySales[1].sales}
            percentage={calculatePercentageQuaterLysale(1)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Sales of July-september"
            count={quaterlySales[2].sales}
            percentage={calculatePercentageQuaterLysale(2)}
            isLoss
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Sales of October-december"
            count={quaterlySales[3].sales}
            percentage={calculatePercentageQuaterLysale(3)}
            isLoss
            color="warning"
          />
        </Grid>

        <Grid
          item
          md={8}
          sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }}
        />

        <Grid marginTop={6} item xs={12} md={7} lg={8}>
          <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item>
              <Typography variant="h5">Intereset Analysiis </Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Grid item>
                  <Box sx={{ minWidth: 150 }}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={years}
                      sx={{ width: 130 }}
                      value={interesAnalysisYear}
                      onChange={(event, value) => {
                        setYear(value?.year);
                        if (value) {
                          getOrderOverView(
                            value?.year,
                            category,
                            sub_category,
                            product
                          );
                        }
                        handleChangeInteresAnalysisYear(value?.year);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Year" />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ minWidth: 150 }}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={categories}
                      value={category}
                      sx={{ width: 140 }}
                      onChange={(event, value) => {
                        if (value) {
                          getSubCategoriesForCategory(value?.category_id);

                          getOrderOverView(
                            interesAnalysisYear,
                            value?.category_name,
                            sub_category,
                            product
                          );
                        }
                        handleChangeCategory(value?.category_name);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Main Category" />
                      )}
                    />
                  </Box>
                </Grid>

                <Grid item>
                  <Box sx={{ minWidth: 150 }}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={subcategories}
                      value={sub_category}
                      fullWidth={true}
                      onChange={(event, value) => {
                        if (value) {
                          getProductsForSubCategory(value?.sub_category_id);

                          getOrderOverView(
                            interesAnalysisYear,
                            category,
                            value?.name,
                            product
                          );
                        }
                        handleChangeSubCategory(value?.name);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Sub Category" />
                      )}
                    />
                  </Box>
                </Grid>

                <Grid item>
                  <Box sx={{ minWidth: 150 }}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={products}
                      value={product}
                      onChange={(event, value) => {
                        setProduct(value?.title);
                        if (value) {
                          getOrderOverView(
                            interesAnalysisYear,
                            category,
                            sub_category,
                            value?.title
                          );
                        }
                        handleChangeProduct(value?.title);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Product" />
                      )}
                    />
                  </Box>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2 }}>
              <ProductInterest overViewData={orderOverview} />
            </Box>
          </MainCard>
        </Grid>
        <Grid marginTop={6} item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Oder Overview with Category</Typography>
            </Grid>

            <Grid item>
              <Box sx={{ minWidth: 150 }}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={years}
                  sx={{ width: 130 }}
                  value={categoryYear}
                  onChange={(event, value) => {
                    setYear(value?.year);
                    if (value) {
                      getcategorywithmostorders(value?.year);
                    }
                    handleChangeCategoryYear(value?.year);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Year" />
                  )}
                />
              </Box>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <TrafficByDevice charttemp={categoryWithMostOrders} />
          </MainCard>
        </Grid>

        <Grid marginTop={8} item xs={12} sx={{ mb: -2.25 }}>
          <CssBaseline />
          <Grid
            marginBottom={1}
            container
            alignItems="center"
            columnSpacing={3}
          >
            <Grid item>
              <Typography variant="h5">Overview of Most Sales </Typography>
            </Grid>

            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Grid item>
                  <Box sx={{ minWidth: 150 }}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={years}
                      sx={{ width: 130 }}
                      value={overViewOfMostSalesYear}
                      onChange={(event, value) => {
                        setYear(value?.year);
                        if (value) {
                          getTotalSalesAccordingTotime(
                            value?.year,
                            fromMonthValue,
                            toMonthValue
                          );
                        }
                        handleChangeOverViewOfMostSalesYear(value?.year);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Year" />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ minWidth: 150 }}>
                    <Autocomplete
                      disablePortal
                      value={fromMonth}
                      onChange={(event, value) => {
                        setFromMonth(value?.label);
                        setFromMonthValue(value?.val);
                        getTotalSalesAccordingTotime(
                          overViewOfMostSalesYear,
                          value?.val,
                          toMonthValue
                        );
                      }}
                      id="combo-box-demo"
                      options={months}
                      sx={{ width: 170 }}
                      renderInput={(params) => (
                        <TextField {...params} label="From Month" />
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ minWidth: 150 }}>
                    <Autocomplete
                      options={months}
                      value={toMonth}
                      onChange={(event, value) => {
                        setToMonth(value?.label);
                        setToMonthValue(value?.val);
                        getTotalSalesAccordingTotime(
                          overViewOfMostSalesYear,
                          fromMonthValue,
                          value?.val
                        );
                      }}
                      id="combo-box-demo"
                      sx={{ width: 170 }}
                      renderInput={(params) => (
                        <TextField {...params} label="To Month" />
                      )}
                    />
                  </Box>
                </Grid>
              </Stack>
            </Grid>
          </Grid>

          <HeightBox height={1} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Category with most sales"
            count={totalSalesAccordingToTime[0].max}
            percentage={totalSalesAccordingToTime[0].percentage}
            extra={totalSalesAccordingToTime[0].category_name}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Sub category with most sales"
            count={totalSalesAccordingToTime[1].max}
            percentage={totalSalesAccordingToTime[1].percentage}
            extra={totalSalesAccordingToTime[1].title}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Product with most sales"
            count={totalSalesAccordingToTime[2].max}
            percentage={totalSalesAccordingToTime[2].percentage}
            isLoss
            color="primary"
            extra={totalSalesAccordingToTime[2].name}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Product varient with most sales"
            count={totalSalesAccordingToTime[3].max}
            percentage={totalSalesAccordingToTime[3].percentage}
            isLoss
            color="warning"
            extra={totalSalesAccordingToTime[3].variant_type}
          />
        </Grid>

        <Grid
          item
          md={8}
          sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }}
        />
      </Grid>
    </div>
  );
}
