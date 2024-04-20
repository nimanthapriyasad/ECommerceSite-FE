import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import api from '../../api';
import { Stack } from '@mui/material';
import HeightBox from '../HeightBox';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function OrderRejectDialog(props) {
  const { open, setOpen, item, refreshTables } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [deliveryId, setDeliveryId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [product, setProduct] = useState();

  async function getProductDetails() {
    try {
      const [code, res] = await api.variant.getProductByVariantId(
        item?.variant_id
      );
      if (res?.statusCode === 200) {
        setProduct(res?.data?.product);
      }
    } catch (error) {}
  }

  async function getUserDetails() {
    try {
      const [code, res] = await api.user.getUser(item?.user_id);
      if (res?.statusCode === 200) {
        setUserDetails(res?.data?.user);
      } else {
        // Error occured while getting the user
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    if (item) {
      getUserDetails();
      getProductDetails();
    }
  }, [item]);

  async function rejectOrder() {
    if (deliveryId.length === 0) {
      setErrorMessage('Rejection Statements are required');
      return;
    }
    setIsLoading(true);

    const data = {
      orderId: item?.order_id,
    };
    try {
      const [code, res] = await api.order.rejectOrder(data);

      if (res?.statusCode === 201) {
        refreshTables();
        handleClose();
      } else {
        // Error in shipping the order
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Reject Order
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" color="text.secondary">
            Order Details
          </Typography>
          <Stack direction="row" spacing={5} justifyContent="center">
            <Typography gutterBottom>
              {'Order Comments: ' + item?.comments}
            </Typography>
            <Typography gutterBottom>
              {'Item Count: ' + item?.item_count}
            </Typography>
            <Typography gutterBottom>
              {'Payment Method: ' + item?.payment_method}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={5} justifyContent="center">
            <Typography variant="h6" color="secondary">
              {'Total Price: $ ' + item?.total_price}
            </Typography>
          </Stack>
          <HeightBox height={10} />
          <Typography variant="h6" color="text.secondary">
            User Details
          </Typography>
          <HeightBox height={10} />
          <Stack direction="row" spacing={5} justifyContent="center">
            <Typography gutterBottom>
              {'First Name: ' + userDetails?.first_name}
            </Typography>
            <Typography gutterBottom>
              {'Last Name: ' + userDetails?.last_name}
            </Typography>
            <Typography gutterBottom>
              {'Phone Number: ' + userDetails?.phone_number}
            </Typography>
          </Stack>
          <HeightBox height={20} />
          <Stack direction="row" spacing={5} justifyContent="center">
            <Typography gutterBottom>
              {'Address: ' + userDetails?.address}
            </Typography>
            <Typography gutterBottom>{'City: ' + userDetails?.city}</Typography>
          </Stack>
          <HeightBox height={20} />
          <Typography variant="h6" color="text.secondary">
            Products
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Id</TableCell>
                  <TableCell align="center">Product Name</TableCell>
                  <TableCell align="center">Item Count</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key={item?.order_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item?.variant_id}
                  </TableCell>
                  <TableCell align="center">{product?.name}</TableCell>
                  <TableCell align="center">{item?.item_count}</TableCell>

                  <TableCell align="center">
                    {'$ ' + item?.total_price}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <HeightBox height={20} />
          <Typography variant="h6" color="text.secondary">
            Rejection Statements
          </Typography>
          <HeightBox height={20} />
          <TextField
            autoFocus
            label="Add rejection Statements"
            rows={5}
            helperText={errorMessage}
            error={errorMessage.length !== 0}
            onChange={(event) => setDeliveryId(event?.target?.value)}
            variant="outlined"
            style={{ width: 600 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={rejectOrder}
            variant="outlined"
            color="secondary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress /> : 'Reject'}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
