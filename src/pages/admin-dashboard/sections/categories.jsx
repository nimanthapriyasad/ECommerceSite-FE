/* eslint-disable no-unused-vars */
import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import HeightBox from '../../../components/HeightBox';
import SnackBarComponent from '../../../components/SnackBarComponent';
import Autocomplete from '@mui/material/Autocomplete';
import api from '../../../api';

export default function AdminCategories(props) {
  const [categoryName, setCategoryName] = useState('');
  const [isLoadingCategoryAdd, setIsLoadingCategoryAdd] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState({
    type: '',
    message: '',
  });
  const [allCategories, setAllCategories] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);
  const [isLoadingSubCategoryAdd, setIsLoadingSubCategoryAdd] = useState(false);

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

  async function addSubCategory() {
    if (!selectedParentCategory) {
      setSnackBarMessage({
        type: 'error',
        message: 'Select a parent category to proceed',
      });
      setOpenSnackBar(true);
      return;
    }
    if (!subCategoryName) {
      setSnackBarMessage({
        type: 'error',
        message: 'Add a sub category Name to procced',
      });
      setOpenSnackBar(true);
      return;
    }
    setIsLoadingSubCategoryAdd(true);
    const data = {
      categoryId: selectedParentCategory?.category_id,
      name: subCategoryName,
    };
    try {
      const [code, res] = await api.subCategory.addSubCategory(data);
      if (res?.statusCode === 201) {
        setSnackBarMessage({
          type: 'success',
          message: 'Sub Category Added succesfully!',
        });
        setOpenSnackBar(true);
        setSubCategoryName('');
      }
    } catch (error) {}
    setIsLoadingSubCategoryAdd(false);
  }

  async function addCategory() {
    if (!categoryName) {
      setSnackBarMessage({
        type: 'error',
        message: 'Add a category Name to procced',
      });
      setOpenSnackBar(true);
      return;
    }
    setIsLoadingCategoryAdd(true);
    const data = {
      categoryName: categoryName,
    };
    try {
      const [code, res] = await api.category.addCategory(data);
      if (res?.statusCode === 201) {
        // Category Created succesfully
        getAllCategories();
        setSnackBarMessage({
          type: 'success',
          message: 'Category Added succesfully!',
        });
        setOpenSnackBar(true);
        setCategoryName('');
      }
    } catch (error) {}
    setIsLoadingCategoryAdd(false);
  }

  React.useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <SnackBarComponent
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        type={snackBarMessage.type}
        message={snackBarMessage.message}
      />
      <Typography variant="h5">Add Category</Typography>
      <HeightBox height={20} />
      <TextField
        label="Category Name"
        style={{ width: 500 }}
        value={categoryName}
        onChange={(event) => setCategoryName(event.target.value)}
      />
      <HeightBox height={10} />
      <Button
        color="secondary"
        variant="contained"
        disabled={isLoadingCategoryAdd}
        style={{ width: 500 }}
        onClick={addCategory}
      >
        {isLoadingCategoryAdd ? <CircularProgress /> : 'Add'}
      </Button>
      <HeightBox height={50} />
      <Typography variant="h5">Add Sub Category</Typography>
      <HeightBox height={20} />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={allCategories}
        sx={{ width: 500 }}
        onChange={(event, value) => {
          setSelectedParentCategory(value);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select Main Category" />
        )}
      />
      <HeightBox height={20} />
      <TextField
        label="Sub Category Name"
        style={{ width: 500 }}
        value={subCategoryName}
        onChange={(event) => setSubCategoryName(event.target.value)}
      />
      <HeightBox height={10} />
      <Button
        color="secondary"
        variant="contained"
        disabled={isLoadingCategoryAdd}
        style={{ width: 500 }}
        onClick={addSubCategory}
      >
        {isLoadingSubCategoryAdd ? <CircularProgress /> : 'Add'}
      </Button>
    </div>
  );
}
