import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import {
  Button,
  CssBaseline,
  Grid,
  Stack,
  Typography,
  Card,
} from '@mui/material';
import HeightBox from '../../components/HeightBox';
import CaraouselSlider from '../../components/Carousel';
import api from '../../api';
import ProductItem from '../../components/ProductItem';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [searchedText, setSearchedText] = useState('');

  async function getAllCategories() {
    try {
      const [code, res] = await api.category.getAllCategories();
      if (res?.statusCode === 200) {
        setAllCategories(res?.data);
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    if (searchedText !== '') {
      const items = originalProducts.filter((item) =>
        item?.title.toLowerCase().includes(searchedText.toLowerCase())
      );
      setAllProducts(items);
    } else {
      setAllProducts(originalProducts);
    }
  }, [searchedText]);

  React.useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllSubCategoriesForCategory() {
    try {
      const [code, res] = await api.subCategory.getSubCategoriesForCategory(
        selectedCategory
      );
      if (res?.statusCode === 200) {
        setAllSubCategories(res?.data?.subCategories);
      }
    } catch (error) {}
  }

  async function getProductsForCategory() {
    try {
      const [code, res] = await api.product.getProductsForCategory(
        selectedCategory
      );
      if (res?.statusCode === 200) {
        setAllProducts(res?.data?.products);
      }
    } catch (error) {}
  }

  async function getProductsForSubCategory() {
    try {
      const [code, res] = await api.product.getProductsForSubCategory(
        selectedSubCategory
      );
      if (res?.statusCode === 200) {
        setAllProducts(res?.data?.products);
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    if (selectedSubCategory) {
      getProductsForSubCategory();
    }
  }, [selectedSubCategory]);

  React.useEffect(() => {
    if (selectedCategory) {
      getAllSubCategoriesForCategory();
      getProductsForCategory();
    }
  }, [selectedCategory]);

  async function getAllProducts() {
    try {
      const [code, res] = await api.product.getAllProducts();
      if (res?.statusCode === 200) {
        setAllProducts(res?.data?.products);
        setOriginalProducts(res?.data?.products);
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <CssBaseline />
      <NavBar searchedText={searchedText} setSearchedText={setSearchedText} />
      <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
        <HeightBox height={10} />
        <CaraouselSlider />
        <HeightBox height={30} />
        <Stack direction="row">
          <Card style={{ height: 500 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 400,
                alignItems: 'start',
                padding: 20,
                paddingTop: 0,
                paddingLeft: 0
              }}
            >
              <Box 
                sx={{
                  backgroundColor: '#f5f5f5', 
                  paddingTop: 2, 
                  paddingRight: 18, 
                  paddingLeft: 2,
                  paddingBottom: 1,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                  <FormatListBulletedIcon  />
                  </Grid>
                  <Grid item xs={10}>
                  <Typography variant="h5" sx={{fontWeight: 500,}} >
                    Categories
                  </Typography>
                  </Grid>
                  
                </Grid>
                
              
              </Box>
              <HeightBox height={20} />
              
              {allCategories.map((item) => (
                <Box sx={{paddingLeft: 2}}>
                <Button
                  onClick={() => setSelectedCategory(item?.category_id)}
                  color="secondary"
                >
                  {item?.category_name}
                </Button>
                </Box>
              ))}
              
            </div>
          </Card>
          <Grid container spacing={2} justifyContent="center">
            {allProducts.map((item, i) => (
              <Grid item>
                <ProductItem key={i} product={item} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </div>
      <HeightBox height={30} />
    </div>
  );
}
