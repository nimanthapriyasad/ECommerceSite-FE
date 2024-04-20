import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Button, Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import api from '../../api';
import Divider from '@mui/material/Divider';
import HeightBox from '../HeightBox';

export default function ProductItem(props) {
  const { product } = props;
  const navigate = useNavigate();
  const [productImages, setProductImages] = useState();

  async function getProductImages(productId) {
    try {
      const [code, res] = await api.product.getImages(productId);
      if (res?.statusCode === 200) {
        setProductImages(res?.data?.images);
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    if (product?.product_id) {
      getProductImages(product?.product_id);
    }
  }, [product]);

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        sx={{ width: 270, height: 250, overflow: 'hidden' }}
        image={productImages ? productImages[0]?.image : ''}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h5" color="text.primary">
          {product?.title}
        </Typography>
        <HeightBox height={5} />
        <Typography variant="p" color="text.secondary">
          {`Weight: ${product?.weight}g`}
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions disableSpacing>
        <Button fullWidth onClick={() => navigate(`/${product?.product_id}`)}>
          See more
        </Button>
      </CardActions>
    </Card>
  );
}
