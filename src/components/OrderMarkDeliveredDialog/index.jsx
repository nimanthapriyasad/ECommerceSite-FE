import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import api from '../../api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderMarkDeliveredDialog(props) {
  const { open, setOpen, item, refreshTables } = props;

  async function makeTheOrderAsDelivered() {
    try {
      const data = {
        orderId: item.order_id,
      };
      const [code, res] = await api.order.completeOrder(data);
      if (res?.statusCode === 201) {
        handleClose();
        refreshTables();
      }
    } catch (error) {
      console.log(error);
      // Error in making the order as delivered
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {'Do you want to mark this order as Delivered?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            After making the order as Delivered you cannot refund or cancel it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={makeTheOrderAsDelivered}>Mark as Delivered</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
