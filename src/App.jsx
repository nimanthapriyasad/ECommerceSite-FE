import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import ForgotPassword from './pages/forgot-password';
import HomePage from './pages/homepage';
import SignIn from './pages/signIn';
import SignUp from './pages/signup';
import ShoppingCart from './pages/shopping-cart';
import theme from './utils/theme';
import Checkout from './pages/payment';
import AdminDashboard from './pages/admin-dashboard';
import ProductAddPage from './pages/product-add-page';
import VariantEditPage from './pages/variant-edit-page';
import ProductPage from './pages/product-page';
import CollapsibleTable from './pages/user-orders';

function App() {
  const userAuth = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/:id" element={<ProductPage />} exact />
        <Route path="/signin" element={!userAuth?.auth ? <SignIn /> : <Navigate to="/" />} exact />
        <Route path="/signup" element={!userAuth?.auth ? <SignUp /> : <Navigate to="/" />}exact />
        <Route path="/forgot-password" element={<ForgotPassword />} exact />
        <Route path="/forgot-password" element={<ForgotPassword />} exact />
        <Route path="/cart" element={<ShoppingCart />} exact />
        <Route path="/payment" element={<Checkout />} exact />
        <Route path="/user/my-orders" element={userAuth?.auth ? <CollapsibleTable /> : <Navigate to="/" />} exact />
        <Route
          path="/admin/:page"
          element={userAuth?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          exact
        />
        <Route
          path="/product/add/"
          element={userAuth?.isAdmin ? <ProductAddPage /> : <Navigate to="/" />}
        />
        <Route
          path="/variant/edit/:id"
          element={
            userAuth?.isAdmin ? <VariantEditPage /> : <Navigate to="/" />
          }
          exact
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
