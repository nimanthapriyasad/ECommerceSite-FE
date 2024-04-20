import  React,{ useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { CssBaseline } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NavBar from '../../components/NavBar';
import HeightBox from '../../components/HeightBox';
import api from '../../api';



function Row(props) {

  const { row } = props;
 
  const [open, setOpen] = React.useState(false);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon color="primary" /> : <KeyboardArrowDownIcon  color="primary"/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="right">{formatDate(row.order_date) }</TableCell>
        <TableCell align="right">{row.item_count}</TableCell>
        <TableCell align="right">{row.total_price}</TableCell>
        <TableCell align="right">{row.order_status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Dispatched Date</TableCell>
                    <TableCell>Delivery Method</TableCell>
                    <TableCell align="right">Delivery Id</TableCell>
                    <TableCell align="right">Payment Method </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow key={row.order_id}>
                      <TableCell component="th" scope="row">
                        {formatDate(row.dispatched_date) }
                      </TableCell>
                      <TableCell>{row.delivery_method}</TableCell>
                      <TableCell align="right">{row.delivery_id}</TableCell>
                      <TableCell align="right">
                        {row.payment_method}
                      </TableCell>
                    </TableRow>
                
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};



export default function CollapsibleTable() {

    const user = useSelector((state) => state.user);
    const [data,setData]= useState([]);

    async function getUserOrders(userId){
        try {
            const [code, res] = await api.user.getUserOrders(userId);
            
    
  
            if (res?.statusCode === 200) {
                setData(res?.data?.userOrders);
               
            }
            console.log('data',data);
        } catch (error) {
            
        }
    }

   useEffect(()=>{
       
        getUserOrders(user.id);

      
    },[])
  return (
    <Box>
      <CssBaseline />
      <NavBar />
      <HeightBox height={50} />
      <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
        <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Ordered Item</TableCell>
                    <TableCell align="right">Ordered Date</TableCell>
                    <TableCell align="right">Item Count</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                    <TableCell align="right">Order Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                
                    <Row key={row.order_id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
    </Box>
   
  );
}
