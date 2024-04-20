import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './modules/AddressForm';
import PaymentForm from './modules/PaymentForm';
import Review from './modules/Review';
import NavBar from '../../components/NavBar';
import moment from 'moment';
import api from '../../api';
import { clearCart } from '../../reducers/modules/cart';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mrt.lk/">
        DBMS Project
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function Checkout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentValidated, setPaymentValidated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [comments, setComments] = useState('');
  const [cardDetails, setCardDetails] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState('DELIVERY');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return (
          <PaymentForm
            paymentValidated={paymentValidated}
            setPaymentValidated={setPaymentValidated}
            setCardDetails={setCardDetails}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        );
      case 2:
        return (
          <Review
            cardDetails={cardDetails}
            paymentMethod={paymentMethod}
            setComments={setComments}
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  async function createOrder() {
    setLoading(true);
  
    let orderData = {
      userId: user.id,
      orderDate: moment(Date.now()).format('YYYY-MM-DD'),
      itemCount: cart?.checkoutProduct.items,
      variantId: cart?.checkoutProduct?.variantId,
      orderStatus: 'PENDING',
      comments: comments,
      paymentMethod: paymentMethod,
      deliveryMethod: deliveryMethod,
      totalPrice:
        parseFloat(cart?.checkoutProduct.unitPrice) *
        parseInt(cart?.checkoutProduct.items),
    };
    if (cart?.checkoutProduct.items > cart?.checkoutProduct?.quantityInStock) {
      orderData.orderStatus = 'PENDING';
    } else {
      orderData.orderStatus = 'PLACED';
    }
    try {
    
      const [code, res] = await api.order.placeOrder(orderData);
      
      if (res?.statusCode === 201) {
       
        setOrderId(res?.data?.order?.id);
        setActiveStep(activeStep + 1);
        dispatch(clearCart());
      }
    } catch (error) {
      console.log('error')
    }
    setLoading(false);
  }

  const handleNext = () => {
    if (activeStep === 2) {
      createOrder();
    } else if (activeStep === 1) {
      if (paymentMethod !== 'CARD') {
        setActiveStep(activeStep + 1);
      } else if (paymentValidated && paymentMethod === 'CARD') {
        setActiveStep(activeStep + 1);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div>
      <CssBaseline />
      <NavBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: 10, boxShadow: 12 }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{orderId}. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={loading}
                  >
                    {activeStep === steps.length - 1 ? (
                      loading ? (
                        <CircularProgress />
                      ) : (
                        'Place order'
                      )
                    ) : (
                      'Next'
                    )}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </div>
  );
}
