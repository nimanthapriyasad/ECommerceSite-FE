/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import api from '../../api';
import { CssBaseline, Stack, TextField } from '@mui/material';
import HeightBox from '../../components/HeightBox';
import Autocomplete from '@mui/material/Autocomplete';
import * as yup from 'yup';
import * as uuid from 'uuid';
import uploadFileToBlob, {
  isStorageConfigured,
} from '../../utils/uploadFiles.js';
import { Formik } from 'formik';
import SnackBarComponent from '../../components/SnackBarComponent';

const storageConfigured = isStorageConfigured();

const validationSchema = yup.object().shape({
  title: yup.string().required().label('Product Title'),
  weight: yup.number().required().min(1).label('Product Weight'),
  sku: yup.string().required().label('SKU'),
});

const variantValidationSchema = yup.object().shape({
  description: yup.string().required().label('Description'),
  variantType: yup.string().required().label('Variant Type'),
  qunatityInStock: yup.number().required().label('Quantity in Stock').min(0),
  unitPrice: yup.number().required().label('Unit Price').min(1),
});

const Input = styled('input')({
  display: 'none',
});

export default function ProductAddPage(props) {
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = useState([]);
  const [loadingProductAdd, setLoadingProductAdd] = useState(false);
  const [loadingVariantAdd, setLoadingVariantAdd] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title: '',
    weight: '',
    sku: '',
  });
  const [productAdded, setProductAdded] = useState(null);
  const [productAddSuccesfully, setProductAddedSuccesfully] = useState(false);
  const [addedVariants, setAddedVariants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState({
    type: '',
    message: '',
  });
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');

  React.useEffect(() => {
    if (productId && allSubCategories.length > 0) {
      const category = allSubCategories.find(
        (item) => item?.sub_category_id === productAdded?.sub_category_id
      );
      // setSelectedSubCategory(category);
    }
  }, [allSubCategories, productAdded]);

  React.useEffect(() => {
    if (productId && allCategories.length > 0) {
      const category = allCategories.find(
        (item) => item?.category_id === productAdded?.category_id
      );
      setSelectedCategory(category);
    }
  }, [allCategories, productAdded]);

  async function getProduct(productId) {
    setLoadingProductAdd(true);
    try {
      const [code, res] = await api.product.getProduct(productId);
      if (res?.statusCode === 200) {
        getSubCategoriesForCategory(res?.data?.product?.category_id);
        setProductAdded(res?.data?.product);
        setInitialValues(res?.data?.product);
        setProductAddedSuccesfully(true);
      }
    } catch (error) {}
    setLoadingProductAdd(false);
  }

  React.useEffect(() => {
    if (productId) {
      getProduct(productId);
    }
  }, [productId]);

  function resetProductAddForm() {
    setImageFiles([]);
    setProductAdded(null);
    setAddedVariants([]);
    setSelectedCategory('');
    setSelectedSubCategories([]);
    setProductAddedSuccesfully(false);
  }

  async function uploadImages() {
    if (!storageConfigured) {
      setSnackBarMessage({
        type: 'error',
        message: 'eror in uploading the images',
      });
      setOpenSnackBar(true);
      return;
    }
    const allPromises = [];
    const containerName = uuid.v4();
    imageFiles.forEach((element) => {
      const promise = new Promise(async (resolve, reject) => {
        const blobsInContainer = await uploadFileToBlob(element, containerName);
        resolve(blobsInContainer);
      });
      allPromises.push(promise);
    });
    return new Promise((resolve, reject) => {
      Promise.all(allPromises).then((values) => {
        let imageLinks = [];
        var maxLength = 0;
        values.forEach((item) => {
          if (item.length > maxLength) {
            imageLinks = item;
            maxLength = item.length;
          }
        });
        resolve(imageLinks);
      });
    });
  }

  async function createVariant(values, resetForm) {
    setLoadingVariantAdd(true);
    try {
      const [code, res] = await api.variant.addVariant(values);
      if (res?.statusCode === 201) {
        // Variant added succesfully
        resetForm();
        const temp = addedVariants;
        temp.push(res?.data?.variant);
        setAddedVariants(temp);
        setSnackBarMessage({
          type: 'success',
          message: 'Variant added succesfully',
        });
        setOpenSnackBar(true);
      }
    } catch (error) {
      setSnackBarMessage({
        type: 'error',
        message: 'Error occured while adding the variant',
      });
      setOpenSnackBar(true);
      return;
    }
    setLoadingVariantAdd(false);
  }

  async function createProduct(values) {
    if (imageFiles.length === 0) {
      setSnackBarMessage({
        type: 'error',
        message: 'Select images to procced',
      });
      setOpenSnackBar(true);
      return;
    }
    setLoadingProductAdd(true);

    const images = await uploadImages();
    if (!images) {
      setSnackBarMessage({
        type: 'error',
        message: 'Error in uploading the images',
      });
      setOpenSnackBar(true);
      return;
    }
    const subCategoryIds = [];
    selectedSubCategories.forEach((item) => {
      subCategoryIds.push(item.sub_category_id);
    });

    const data = {
      ...values,
      images: images,
      subCategories: subCategoryIds,
    };
    try {
      const [code, res] = await api.product.addProduct(data);
      if (res?.statusCode === 201) {
        // Product created succesfully
        setProductAdded(res?.data?.product);
        setProductAddedSuccesfully(true);
      } else {
        // Error in adding the product
        setSnackBarMessage({
          type: 'error',
          message: 'Error in adding the product',
        });
        setOpenSnackBar(true);
      }
    } catch (error) {
      // Error in adding the product
    }
    setLoadingProductAdd(false);
  }

  async function getSubCategoriesForCategory(categoryId) {
    try {
      const [code, res] = await api.subCategory.getSubCategoriesForCategory(
        categoryId
      );

      const rows = [];

      if (res?.statusCode === 200) {
        res?.data?.subCategories.forEach((element) => {
          const temp = {
            label: element.name,
            ...element,
          };
          rows.push(temp);
        });
      }

      setAllSubCategories(rows);
    } catch (error) {}
  }

  async function getAllCategories() {
    try {
      const [code, res] = await api.category.getAllCategories();
      const rows = [];

      if (res?.statusCode === 200) {
        res?.data.forEach((element) => {
          const temp = {
            label: element.category_name,
            ...element,
          };
          rows.push(temp);
        });
      }
      setAllCategories(rows);
    } catch (error) {}
  }

  React.useEffect(() => {
    getAllCategories();
  }, []);

  const variantInitialValues = {
    productId: productAdded?.id,
    description: '',
    variantType: '',
    qunatityInStock: 0,
    unitPrice: 0,
  };

  const handleChangeImage = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
  };

  return (
    <div
      style={{
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: 50,
      }}
    >
      <CssBaseline />
      <SnackBarComponent
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        type={snackBarMessage.type}
        message={snackBarMessage.message}
      />

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          createProduct(values);
        }}
      >
        {(formikProps) => {
          const { values, handleChange, handleSubmit, touched, errors } =
            formikProps;

          return (
            <React.Fragment>
              <Stack direction="column" spacing={5} alignItems="center">
                <Button
                  onClick={() => navigate('/admin/dashboard')}
                  color="secondary"
                >
                  Got to Admin Dashboard
                </Button>
                <Typography variant="h5">Add Product</Typography>

                <TextField
                  label="Title"
                  variant="outlined"
                  helperText={errors.title}
                  disabled={productAddSuccesfully}
                  error={touched.title && Boolean(errors.title)}
                  style={{ width: 500 }}
                  value={values.title}
                  onChange={handleChange('title')}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Weight in grams"
                  variant="outlined"
                  helperText={errors.weight}
                  disabled={productAddSuccesfully}
                  error={touched.weight && Boolean(errors.weight)}
                  style={{ width: 500 }}
                  value={values.weight}
                  onChange={handleChange('weight')}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="SKU"
                  variant="outlined"
                  helperText={errors.sku}
                  disabled={productAddSuccesfully}
                  error={touched.sku && Boolean(errors.sku)}
                  style={{ width: 500 }}
                  value={values.sku}
                  onChange={handleChange('sku')}
                  InputLabelProps={{ shrink: true }}
                />

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={allCategories}
                  value={selectedCategory}
                  disabled={productAddSuccesfully}
                  sx={{ width: 500 }}
                  onChange={(event, value) => {
                    setSelectedCategory(value);
                    if (value) {
                      getSubCategoriesForCategory(value?.category_id);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Main Category"
                      disabled={productAddSuccesfully}
                    />
                  )}
                />

                <Autocomplete
                  multiple
                  id="combo-box-demo"
                  value={selectedSubCategories}
                  disabled={productAddSuccesfully}
                  getOptionLabel={(option) => option.name}
                  options={allSubCategories}
                  filterSelectedOptions
                  sx={{ width: 500 }}
                  onChange={(event, value) => {
                    setSelectedSubCategories(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sub Categories"
                      placeholder="Sub Categories"
                    />
                  )}
                />

                <React.Fragment>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleChangeImage}
                    />
                    <Button
                      variant="contained"
                      color="success"
                      component="span"
                      disabled={productAddSuccesfully || loadingProductAdd}
                    >
                      Select Images
                    </Button>
                  </label>
                </React.Fragment>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ width: 300 }}
                  onClick={handleSubmit}
                  disabled={productAddSuccesfully || loadingProductAdd}
                >
                  {loadingProductAdd ? <CircularProgress /> : 'Create Product'}
                </Button>
                {productAddSuccesfully && (
                  <Button onClick={resetProductAddForm}>
                    Add Another product
                  </Button>
                )}
              </Stack>
            </React.Fragment>
          );
        }}
      </Formik>

      {productAddSuccesfully && (
        <React.Fragment>
          <HeightBox height={40} />

          <Formik
            validationSchema={variantValidationSchema}
            enableReinitialize={true}
            initialValues={variantInitialValues}
            onSubmit={(values, { resetForm }) => {
              createVariant(values, resetForm);
            }}
          >
            {(formikProps) => {
              const { values, handleChange, handleSubmit, touched, errors } =
                formikProps;

              return (
                <React.Fragment>
                  <Stack direction="column" spacing={5} alignItems="center">
                    <Typography variant="h5">Add Variants</Typography>

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
                      multiline
                      rows={10}
                      onChange={handleChange('description')}
                      style={{ width: 500 }}
                      helperText={errors.description}
                      error={touched.description && Boolean(errors.description)}
                    />
                    <TextField
                      value={values.qunatityInStock}
                      label="Quanity In Stock"
                      onChange={handleChange('qunatityInStock')}
                      style={{ width: 500 }}
                      helperText={errors.qunatityInStock}
                      error={
                        touched.qunatityInStock &&
                        Boolean(errors.qunatityInStock)
                      }
                    />
                    <TextField
                      value={values.unitPrice}
                      label="Unit Price"
                      onChange={handleChange('unitPrice')}
                      style={{ width: 500 }}
                      helperText={errors.unitPrice}
                      error={touched.unitPrice && Boolean(errors.unitPrice)}
                    />
                    <Button
                      onClick={handleSubmit}
                      style={{ width: 500 }}
                      variant="outlined"
                      disabled={loadingVariantAdd}
                    >
                      {loadingVariantAdd ? <CircularProgress /> : 'Add Variant'}
                    </Button>
                  </Stack>
                </React.Fragment>
              );
            }}
          </Formik>
          <HeightBox height={50} />
        </React.Fragment>
      )}
      {addedVariants.length > 0 && (
        <React.Fragment>
          <HeightBox height={20} />
          <Typography variant="h5">Added Variants</Typography>
          <HeightBox height={20} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Variant Type</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Quantity In Stock</TableCell>
                  <TableCell align="center">Unit Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addedVariants.map((row) => (
                  <TableRow
                    key={row?.product_id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row?.variantType}
                    </TableCell>
                    <TableCell align="center"> {row?.description}</TableCell>
                    <TableCell align="center">{row?.qunatityInStock}</TableCell>
                    <TableCell align="center">
                      {'$ ' + row?.unitPrice}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <HeightBox height={50} />
        </React.Fragment>
      )}
    </div>
  );
}
