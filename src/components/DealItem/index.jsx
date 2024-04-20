import React, { useState } from 'react';
import { Typography, Stack, Rating } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import DeleteIcon from '@mui/icons-material/Delete';
import HeightBox from '../HeightBox';

export default function DealItem(props) {
  const {item} = props;

  return (
    <div>
      <Stack spacing={0} alignItems = "center">
        <div style={{ width: 177, height: 177, overflow: 'hidden' }}>
          <img src={item.image} style={{width : 177}} />
        </div>
        <div style={{paddingTop : 10}}>
          <Typography variant='h5' style={{width : 177 , textAlign : "center"}}>
            {item.productName}
          </Typography>
        </div>
        <div>
          <Typography variant='h5' style={{width : 177 , textAlign : "center" , color : "#ed6c02" , fontWeight: "bold"}}>
            ${item.dealPrice}
          </Typography>
        </div>
        <div>
          <Typography variant='h7' style={{width : 177 , textDecoration : "line-through" ,  textAlign : "center" , color : "red" , fontWeight: "bold"}}>
            ${item.beforePrice}
          </Typography>
        </div>
        <div>
          <Rating 
            value={item.rating}
            name="Rating"
            readOnly
            precision={0.5}
            size="small"
          />

          <Typography variant='h8'>
            {item.rating} ({item.ratingCount})
          </Typography>

        </div>
        
      </Stack>
    </div>
  );
}
