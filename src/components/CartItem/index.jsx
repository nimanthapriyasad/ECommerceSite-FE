import React, { useState } from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import HeightBox from '../HeightBox';
import {
  changeItemCount,
  goToCheckout,
  removeFromCart,
} from '../../reducers/modules/cart';

export default function CartItem(props) {
  const { item, remove } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [itemCount, setItemCount] = useState(item.items);

  React.useEffect(() => {
    if (itemCount <= 0) {
      setItemCount(1);
      dispatch(
        changeItemCount({
          variantId: item.variantId,
          newCount: 1,
        })
      );
    } else {
      dispatch(
        changeItemCount({
          variantId: item.variantId,
          newCount: itemCount,
        })
      );
    }
  }, [itemCount]);

  function deleteItem() {
    dispatch(removeFromCart(item));
    remove();
  }

  function checkOut() {
    dispatch(goToCheckout(item));
    if (!user?.auth) {
      navigate('/signin');
    } else {
      navigate('/payment');
    }
  }

  return (
    <Box 
      sx={{
        backgroundColor: '#fff',
        borderRadius: 1,
        boxShadow: 2
      }}
      >
      <Stack 
        direction="row" 
        spacing={5} 
        alignItems="center" 
        sx={{ 
          mb: 3, 
          paddingBottom: 2,
          paddingTop: 2,
          paddingLeft: 2, 
        }}
      >
      
      <div style={{ width: 150, height: 150, overflow: 'hidden'  }}>
        <img src={item.mainImage} alt="" style={{ height: 150, width: 150 }} />
      </div>
      
      <Box sx={{width: 150}}>
        <Typography variant="h5">{item.title}</Typography>
      </Box>
    
      <Box sx={{width: 100}}>
        <Typography variant="h5" sx={{fontWeight: 600}}>{'$ ' + item.unitPrice}</Typography>
      </Box>
      <Box sx={{width: 150}}>
      <Stack direction="row" spacing={2}>
        <IconButton
          style={{ height: 50, width: 50 }}
          color="error"
          onClick={() => setItemCount(itemCount - 1)}
        >
          <RemoveIcon />
        </IconButton>
        <div>
          <HeightBox height={10} />
          <Typography variant="h6" fontWeight="bold">
            {itemCount}
          </Typography>
        </div>
        <IconButton
          style={{ height: 50, width: 50 }}
          color="success"
          onClick={() => setItemCount(itemCount + 1)}
        >
          <AddIcon />
        </IconButton>
      </Stack>
      </Box>
      <Box sx={{width: 50}}>
      <IconButton
        style={{ height: 50, width: 50 }}
        color="error"
        onClick={() => deleteItem()}
      >
        <DeleteIcon />
      </IconButton>
      </Box>
      <Box sx={{width: 150}}>
      <Button variant="outlined" onClick={checkOut}>
        Check out
      </Button>
      </Box>
      
      
    </Stack>
    </Box>
  );
}
