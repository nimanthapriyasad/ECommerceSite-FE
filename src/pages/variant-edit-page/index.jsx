import { CardContent, CssBaseline } from '@mui/material';
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Button, TextField, Stack, Typography, Card } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Formik } from 'formik';
import api from '../../api';
import HeightBox from '../../components/HeightBox';

const variantValidationSchema = yup.object().shape({
  description: yup.string().required().label('Description'),
  variantType: yup.string().required().label('Variant Type'),
  quantityInStock: yup.number().required().label('Quantity in Stock').min(0),
  unitPrice: yup.number().required().label('Unit Price').min(1),
});

export default function VariantEditPage(props) {
  const location = useLocation();
  const [variantUpdating, setVariantUpdating] = useState(false);
  const [product, setProduct] = useState();
  const [variantInitialValues, setVariantInitialValues] = useState({
    productId: '',
    description: '',
    variantType: '',
    quantityInStock: '',
    unitPrice: '',
  });
  const params = location.pathname.split('/');
  const variantId = params[params.length - 1];

  async function getProduct(productId) {
    try {
      const [code, res] = await api.product.getProduct(productId);
      if (res?.statusCode === 200) {
        setProduct(res?.data?.product);
      }
    } catch (error) {}
  }

  async function getVariant(variantId) {
    setVariantUpdating(true);
    try {
      const [code, res] = await api.variant.getVariant(variantId);
      if (res?.statusCode === 200) {
        getProduct(res?.data?.variant?.product_id);
        setVariantInitialValues({
          productId: res?.data?.variant?.product_id,
          description: res?.data?.variant?.description,
          variantType: res?.data?.variant?.variant_type,
          quantityInStock: res?.data?.variant?.quantity_in_stock,
          unitPrice: res?.data?.variant?.unit_price,
        });
      }
    } catch (error) {}
    setVariantUpdating(false);
  }

  async function updateVariant(values) {
    setVariantUpdating(true);
    const data = {
      variantId,
      ...values,
    };
    try {
      const [code, res] = await api.variant.updateVariant(data);
      console.log('Update re: ', res);
    } catch (error) {}
    console.log(values);
    setVariantUpdating(false);
  }

  React.useEffect(() => {
    if (variantId) {
      getVariant(variantId);
    }
  }, [variantId]);

  return (
    <div style={{ maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto' }}>
      <CssBaseline />
      <HeightBox height={40} />
      <Stack direction="row" justifyContent="center">
        <Card sx={{ width: 520 }}>
          <CardContent>
            <Stack direction="column" spacing={2} alignItems="center">
              <Typography variant="h5" color="text.secondary">
                Selected Product
              </Typography>
              <Typography variant="p">{`Product: ${product?.title}`}</Typography>
              <Typography variant="p">{`SKU: ${product?.sku}`}</Typography>
              <Typography variant="p">{`Weight: ${product?.weight}g`}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <React.Fragment>
        <Formik
          validationSchema={variantValidationSchema}
          initialValues={variantInitialValues}
          enableReinitialize={true}
          onSubmit={(values) => {
            updateVariant(values);
          }}
        >
          {(formikProps) => {
            const { values, handleChange, handleSubmit, touched, errors } =
              formikProps;

            return (
              <React.Fragment>
                <HeightBox height={50} />
                <Stack direction="column" spacing={5} alignItems="center">
                  <Typography variant="h5" color="text.secondary">
                    Update Selected Variant
                  </Typography>

                  <TextField
                    value={values.productId}
                    label="Product Id"
                    style={{ width: 500 }}
                  />
                  <TextField
                    value={values.variantType}
                    label="Variant Type"
                    style={{ width: 500 }}
                    onChange={handleChange('variantType')}
                    helperText={errors.variantType}
                    error={touched.variantType && Boolean(errors.variantType)}
                  />
                  <TextField
                    value={values.description}
                    label="Description"
                    rows={10}
                    multiline
                    onChange={handleChange('description')}
                    style={{ width: 500 }}
                    helperText={errors.description}
                    error={touched.description && Boolean(errors.description)}
                  />
                  <TextField
                    value={values.quantityInStock}
                    label="Quanity In Stock"
                    onChange={handleChange('quantityInStock')}
                    style={{ width: 500 }}
                    helperText={errors.quantityInStock}
                    error={
                      touched.quantityInStock && Boolean(errors.quantityInStock)
                    }
                  />
                  <TextField
                    value={values.unitPrice}
                    label="Unit Price($)"
                    onChange={handleChange('unitPrice')}
                    style={{ width: 500 }}
                    helperText={errors.unitPrice}
                    error={touched.unitPrice && Boolean(errors.unitPrice)}
                  />
                  <Button
                    onClick={handleSubmit}
                    style={{ width: 500 }}
                    variant="outlined"
                    disabled={variantUpdating}
                  >
                    {variantUpdating ? <CircularProgress /> : 'Update '}
                  </Button>
                </Stack>
              </React.Fragment>
            );
          }}
        </Formik>
        <HeightBox height={50} />
      </React.Fragment>
    </div>
  );
}
