import React, { useState } from 'react';
import { CssBaseline, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import moment from 'moment';
import HeightBox from '../../../components/HeightBox';
import SnackBarComponent from '../../../components/SnackBarComponent';
import api from '../../../api';
import { ORDER_STATUS } from '../../../constants';
import OrderShipViewDialog from '../../../components/OrderShipDialog';
import OrderRejectDialog from '../../../components/OrderRejectDialog';
import OrderMarkDeliveredDialog from '../../../components/OrderMarkDeliveredDialog';
import OrderRefundDialog from '../../../components/OrderRefundDialog';

export default function AdminOrders(props) {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [placedOrders, setPlacedOrders] = useState([]);
  const [shippedOrders, setShippedOrders] = useState([]);
  const [rejectedOrders, setRejectedOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [refundedOrders, setRefundedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [openShipform, setOpenShipForm] = useState(false);
  const [openRejectFrom, setOpenRejectForm] = useState(false);
  const [openRefundForm, setOpenRefundForm] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openMarkAsDeliveredDialog, setOpenMarkAsDeliveredDialog] =
    useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState({
    type: '',
    message: '',
  });

  async function getPlacedOrders() {
    try {
      const [code, res] = await api.order.getOrdersToStatus(
        ORDER_STATUS.PLACED
      );
      if (res?.statusCode === 200) {
        setPlacedOrders(res?.data?.orders);
      }
    } catch (error) {}
  }

  async function getRefundedOrders() {
    try {
      const [code, res] = await api.order.getOrdersToStatus(
        ORDER_STATUS.REFUNDED
      );
      if (res.statusCode === 200) {
        setRefundedOrders(res?.data?.orders);
      }
    } catch (error) {
      setSnackBarMessage({ type: 'error', message: error?.message });
      setOpenSnackBar(true);
    }
  }

  async function getDeliveredOrders() {
    try {
      const [code, res] = await api.order.getOrdersToStatus(
        ORDER_STATUS.DELIVERED
      );
      if (res.statusCode === 200) {
        setDeliveredOrders(res?.data?.orders);
      }
    } catch (error) {
      setSnackBarMessage({ type: 'error', message: error?.message });
      setOpenSnackBar(true);
    }
  }

  async function getRejectedOrders() {
    try {
      const [code, res] = await api.order.getOrdersToStatus(
        ORDER_STATUS.REJECTED
      );
      if (res.statusCode === 200) {
        setRejectedOrders(res?.data?.orders);
      }
    } catch (error) {
      setSnackBarMessage({ type: 'error', message: error?.message });
      setOpenSnackBar(true);
    }
  }

  async function getPendingOrders() {
    try {
      const [code, res] = await api.order.getOrdersToStatus(
        ORDER_STATUS.PENDING
      );

      if (res.statusCode === 200) {
        setPendingOrders(res?.data?.orders);
      }
    } catch (error) {
      setSnackBarMessage({ type: 'error', message: error?.message });
      setOpenSnackBar(true);
    }
  }

  async function getShippedOrders() {
    try {
      const [code, res] = await api.order.getOrdersToStatus(
        ORDER_STATUS.SHIPPED
      );

      if (res.statusCode === 200) {
        setShippedOrders(res?.data?.orders);
      }
    } catch (error) {
      setSnackBarMessage({ type: 'error', message: error?.message });
      setOpenSnackBar(true);
    }
  }

  function refreshTables() {
    getPendingOrders();
    getShippedOrders();
    getRejectedOrders();
    getDeliveredOrders();
    getRefundedOrders();
    getPlacedOrders();
  }

  React.useEffect(() => {
    refreshTables();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <OrderShipViewDialog
        open={openShipform}
        setOpen={setOpenShipForm}
        item={selectedOrder}
        refreshTables={refreshTables}
      />
      <OrderRejectDialog
        open={openRejectFrom}
        setOpen={setOpenRejectForm}
        item={selectedOrder}
        refreshTables={refreshTables}
      />
      <SnackBarComponent
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        type={snackBarMessage.type}
        messgae={snackBarMessage.message}
      />
      <OrderMarkDeliveredDialog
        open={openMarkAsDeliveredDialog}
        setOpen={setOpenMarkAsDeliveredDialog}
        item={selectedOrder}
        refreshTables={refreshTables}
      />
      <OrderRefundDialog
        open={openRefundForm}
        setOpen={setOpenRefundForm}
        item={selectedOrder}
        refreshTables={refreshTables}
      />
      <CssBaseline />
      <Typography variant="h5">Peding Orders</Typography>
      <HeightBox height={20} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Date</TableCell>
              <TableCell align="center">Item Count</TableCell>
              <TableCell align="center">Comments</TableCell>
              <TableCell align="center">Payment Method</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingOrders.map((row) => (
              <TableRow
                key={row.order_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {moment(row.order_date).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell align="center">{row.item_count}</TableCell>
                <TableCell align="center">{row.comments}</TableCell>
                <TableCell align="center">{row.payment_method}</TableCell>
                <TableCell align="center">{'$ ' + row.total_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <HeightBox height={30} />
      <Typography variant="h5">Placed Orders</Typography>
      <HeightBox height={20} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Date</TableCell>
              <TableCell align="center">Item Count</TableCell>
              <TableCell align="center">Comments</TableCell>
              <TableCell align="center">Payment Method</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Reject</TableCell>
              <TableCell align="center">Ship</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {placedOrders.map((row) => (
              <TableRow
                key={row.order_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {moment(row.order_date).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell align="center">{row.item_count}</TableCell>
                <TableCell align="center">{row.comments}</TableCell>
                <TableCell align="center">{row.payment_method}</TableCell>
                <TableCell align="center">{'$ ' + row.total_price}</TableCell>
                <TableCell align="center">
                  <Button
                    color="error"
                    onClick={() => {
                      setSelectedOrder(row);
                      setOpenRejectForm(true);
                    }}
                  >
                    Reject
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => {
                      setSelectedOrder(row);
                      setOpenShipForm(true);
                    }}
                  >
                    Ship
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <HeightBox height={20} />
      <Typography variant="h5">Shipped Orders</Typography>
      <HeightBox height={20} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Date</TableCell>
              <TableCell align="center">Dispatched Date</TableCell>
              <TableCell align="center">Payment Method</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Mark as Delivered</TableCell>
              <TableCell align="center">Refund</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shippedOrders.map((row) => (
              <TableRow
                key={row.order_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {moment(row.order_date).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell align="center">
                  {moment(row.dispatched_date).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell align="center">{row.payment_method}</TableCell>
                <TableCell align="center">{'$ ' + row.total_price}</TableCell>
                <TableCell align="center">
                  <Button
                    color="success"
                    onClick={() => {
                      setSelectedOrder(row);
                      setOpenMarkAsDeliveredDialog(true);
                    }}
                  >
                    Mark as Delivered
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => {
                      setSelectedOrder(row);
                      setOpenRefundForm(true);
                    }}
                  >
                    Refund
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <HeightBox height={30} />
      <Typography variant="h5">Rejected Orders</Typography>
      <HeightBox height={20} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Date</TableCell>

              <TableCell align="center">Payment Method</TableCell>
              <TableCell align="center">Total</TableCell>

              <TableCell align="center">Refund</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rejectedOrders.map((row) => (
              <TableRow
                key={row.order_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {moment(row.order_date).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell align="center">{row.payment_method}</TableCell>
                <TableCell align="center">{'$ ' + row.total_price}</TableCell>
                <TableCell align="center">
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => {
                      setSelectedOrder(row);
                      setOpenRefundForm(true);
                    }}
                  >
                    Refund
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <HeightBox height={30} />
      <Typography variant="h5">Delivered Orders</Typography>
      <HeightBox height={20} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Date</TableCell>
              <TableCell align="center">Items</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveredOrders.map((row) => (
              <TableRow
                key={row.order_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {moment(row.order_date).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell align="center">{row.item_count}</TableCell>
                <TableCell align="center">{'$ ' + row.total_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <HeightBox height={30} />
      <Typography variant="h5">Refunded Orders</Typography>
      <HeightBox height={20} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Date</TableCell>
              <TableCell align="center">Items</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Refunded Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {refundedOrders.map((row) => (
              <TableRow
                key={row.order_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {moment(row.order_date).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell align="center">{row.item_count}</TableCell>
                <TableCell align="center">{'$ ' + row.total_price}</TableCell>
                {/* This line needs to changed when the backend and db changed */}
                <TableCell align="center">{'$ ' + row?.total_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
