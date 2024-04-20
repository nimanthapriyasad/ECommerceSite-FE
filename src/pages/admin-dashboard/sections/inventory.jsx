import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import api from '../../../api';
import HeightBox from '../../../components/HeightBox';
import moment from 'moment';

export default function Inventory(props) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState();
  const [openProductVariants, setOpenProductVariants] = useState(false);
  const [selectedProductVariants, setSelectedProductVariants] = useState([]);

  async function getAllVariants(productId) {
    try {
      const [code, res] = await api.variant.getVariantsForProduct(productId);

      if (res?.statusCode === 200) {
        setSelectedProductVariants(res?.data?.variants);
      }
    } catch (error) {}
  }

  async function getAllProducts() {
    try {
      const [code, res] = await api.product.getAllProducts();
      if (res?.statusCode === 200) {
        setProducts(res?.data?.products);
      }
    } catch (error) {}
  }

  React.useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5">Inventory</Typography>
      <HeightBox height={20} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/product/add')}
      >
        Add Product
      </Button>
      <HeightBox height={20} />
      {openProductVariants && (
        <React.Fragment>
          <Typography variant="h6">
            Variants for product {selectedProduct?.title}
          </Typography>
          <HeightBox height={10} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="center">In Stock</TableCell>

                  <TableCell align="center">Variant Type</TableCell>
                  <TableCell align="center">Unit Price</TableCell>
                  <TableCell align="center">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProductVariants.map((row) => (
                  <TableRow
                    key={row.variant_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell align="center">
                      {row.quantity_in_stock}
                    </TableCell>

                    <TableCell align="center">{row.variant_type}</TableCell>
                    <TableCell align="center">
                      {'$ ' + row.unit_price}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() =>
                          navigate('/variant/edit/' + row.variant_id)
                        }
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <HeightBox height={50} />
        </React.Fragment>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="center">SKU</TableCell>
              <TableCell align="center">Weight(g)</TableCell>
              <TableCell align="center">Added at</TableCell>
              <TableCell align="center">View</TableCell>
              <TableCell align="center">Add Variant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.product_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="center">{row.sku}</TableCell>
                <TableCell align="center">{row.weight}</TableCell>
                <TableCell align="center">
                  {moment(row.created_at).format('YYYY-MM-DD HH:SS')}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setSelectedProduct(row);
                      getAllVariants(row.product_id);
                      setOpenProductVariants(true);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate('/product/add?product=' + row.product_id)
                    }
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
