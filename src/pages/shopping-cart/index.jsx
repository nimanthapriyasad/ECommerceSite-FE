import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  Select,
  Typography,
  CssBaseline,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import HomeNavBar from '../../components/HomeNavBar';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import Button from '@mui/material/Button';
import HeightBox from '../../components/HeightBox';
import CartItem from '../../components/CartItem';
import NavBar from '../../components/NavBar';

const dummyData = [
  {
    id: '1',
    productName: 'Laptop',
    image: './images/test.jpg',
    specifications: ['Small', '15.6 inch', 'Apple product'],
    price: 1200,
    quantity: 1,
  },
  {
    id: '2',
    productName: 'Laptop',
    image: './images/test.jpg',
    specifications: ['Small', '15.6 inch', 'Apple product'],
    price: 1200,
    quantity: 1,
  },
];

export default function ShoppingCart() {
  const [selectedProducts, setSelectedProducts] = useState(dummyData);
  const cart = useSelector((state) => state?.cart);

  const removeProduct = (item) => {
    setSelectedProducts((prev) => [...prev.filter((i) => i.id !== item)]);
  };

  return (
    <div>
      <CssBaseline />
      <NavBar />
      <HeightBox height={50} />
      <div style={{ paddingLeft: 130, paddingRight: 130 }}>
        <Box 
          sx={{
            backgroundColor: '#fff', 
            width: 965,
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: 2,
            boxShadow: 2
          }}
        >
        <Typography variant="h4" sx={{fontWeight: 500}}>Shopping Cart</Typography>
        </Box>
        <HeightBox height={30} />
        {selectedProducts.length === 0 && (
          <Typography variant="h5" color="secondary">
            Your cart is empty! Add items to cart to proceed
          </Typography>
        )}
        <Stack direction="row" spacing={"auto"} >
          <List>
            <TransitionGroup>
              {cart?.items.map((item) => (
                <Collapse key={item.id}>
                  <CartItem
                    item={item}
                    remove={() => {
                      // Remove this item
                      removeProduct(item.id);
                    }}
                  />
                </Collapse>
              ))}
            </TransitionGroup>
          </List>

          {cart?.items.length > 0 && (
            <Box 
              textAlign={'center'}
              sx={{
                width: 200,
                height: 150,
                // border: 1,
                boxShadow: 12,
                borderRadius: 2,
                backgroundColor: "#e0e0e0"
              }}
            >
              <Typography 
                variant="h5"
                sx={{
                  fontWeight: 600, 
                  backgroundColor: "#f5f5f5", 
                  paddingTop: 2,
                  borderRadius: 2, 
                  paddingBottom: 2
                }}
              >
                Total Amount :
              </Typography>
              <HeightBox height={20} />
              <Typography variant="h4" color="primary" fontWeight="bold">
                {`$ ${cart?.total}`}
              </Typography>
              <HeightBox height={20} />
            </Box>
          )}
        </Stack>
      </div>
    </div>
  );
}
