import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';

export default function Review(props) {
  const {
    cardDetails,
    paymentMethod,
    setComments,
    deliveryMethod,
    setDeliveryMethod,
  } = props;

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [deliveryTime, setDeliveryTime] = useState(5);

  React.useEffect(() => {
    if (user && cart) {
      if (user?.district === 'Colombo') {
        if (
          cart?.checkoutProduct?.quantityInStock < cart?.checkoutProduct?.items
        ) {
          setDeliveryTime(8);
        } else {
          setDeliveryTime(5);
        }
      } else {
        if (
          cart?.checkoutProduct?.quantityInStock < cart?.checkoutProduct?.items
        ) {
          setDeliveryTime(10);
        } else {
          setDeliveryTime(7);
        }
      }
    }
  }, [user, cart]);

  const addresses = [
    user?.addressLine1,
    user?.addressLine2,
    user?.city,
    user?.district,
    user?.postalCode,
  ];

  const payments = [
    { name: 'Card holder', detail: cardDetails?.nameOnCard },
    { name: 'Card number', detail: cardDetails?.cardNumber },
    { name: 'Expiry date', detail: cardDetails?.expiryDate },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <Typography variant="h6" gutterBottom>
        Select your delivery method
      </Typography>
      <Typography color="red">{`Estimated Delivery time : ${deliveryTime} days`}</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={deliveryMethod === 'DELIVERY'}
              onChange={(event, checked) => {
                if (checked) {
                  setDeliveryMethod('DELIVERY');
                } else {
                  setDeliveryMethod('STORE_PICKUP');
                }
              }}
            />
          }
          label="Delivery to house"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={deliveryMethod === 'STORE_PICKUP'}
              onChange={(event, checked) => {
                if (checked) {
                  setDeliveryMethod('STORE_PICKUP');
                } else {
                  setDeliveryMethod('DELIVERY');
                }
              }}
            />
          }
          label="Store pickup"
        />
      </FormGroup>
      <List disablePadding>
        <ListItem key={cart?.checkoutProduct.title} sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={cart?.checkoutProduct.title}
            secondary={cart?.checkoutProduct.items}
          />
          <Typography variant="body2">
            {'$' +
              parseFloat(cart?.checkoutProduct.unitPrice) *
                parseInt(cart?.checkoutProduct.items)}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`$${cart?.total}`}
          </Typography>
        </ListItem>
      </List>
      <TextField
        multiline
        rows={5}
        label="Order comments"
        fullWidth
        onChange={(event) => setComments(event.target.value)}
      />
      <Grid container spacing={2}>
        {deliveryMethod === 'DELIVERY' && (
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Shipping
            </Typography>
            <Typography gutterBottom>
              {user?.firstName + ' ' + user?.lastName}
            </Typography>

            <Typography gutterBottom>{addresses.join(', ')}</Typography>
          </Grid>
        )}
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          {paymentMethod === 'CARD' ? (
            <Grid container>
              {payments.map((payment) => (
                <React.Fragment key={payment.name}>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography gutterBottom>{payment.detail}</Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          ) : (
            <Typography>Pay on Delivery</Typography>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
