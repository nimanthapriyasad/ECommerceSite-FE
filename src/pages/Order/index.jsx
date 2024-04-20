import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme, styled, alpha } from '@mui/material/styles';
import NavBar from '../../components/NavBar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import HeightBox from '../../components/HeightBox';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: alpha(theme.palette.common.white, 0.5),
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  }));

  
  const StyledTableRow = styled(TableRow)(() => ({
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(orderID, user, total, date) {
    return { orderID, user, total, date };
  }
  
  const rows = [
    createData('AB34DSA56D26ADNC1232PQ', "Thilna Sandakelum", "$35.99", "23/12/2021"),
    createData('AB34DSA56D26ADNC1232PQ', "Thilna Sandakelum", "$35.99", "23/12/2021"),
    createData('AB34DSA56D26ADNC1232PQ', "Thilna Sandakelum", "$35.99", "23/12/2021"),
    createData('AB34DSA56D26ADNC1232PQ', "Thilna Sandakelum", "$35.99", "23/12/2021"),
  ];

export default function Order() {
  return (
    <ThemeProvider theme={darkTheme}>
        <NavBar/>
        <Box 
            sx={{
                height: "100vh",
                backgroundColor: "#212529",
                color: "#fff",
                paddingTop: 3,
                paddingLeft: 10,
                paddingRight: 10, 
             }} 
            >
                
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography 
                                variant="h4" 
                                gutterBottom 
                                omponent="div"
                                sx={{fontWeight: 500}}
                            >
                                ORDERS
                            </Typography>
                        </Grid>
                        <Grid 
                            item xs={4} 
                            sx={{
                                textAlign: 'right',
                                    
                            }}
                        >
                            <Button 
                                variant="contained" 
                                sx={{ mt: 1, color: '#fff', fontWeight: 600, fontSize: 20   }}
                                color="warning"
                            >
                                + Create Products
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <HeightBox height={30} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                        <TableHead >
                        <TableRow >
                            <StyledTableCell style={{borderBottom: '1px solid white'}}>Order ID</StyledTableCell>
                            <StyledTableCell style={{borderBottom: '1px solid white'}}>User</StyledTableCell>
                            <StyledTableCell style={{borderBottom: '1px solid white'}}>Total</StyledTableCell>
                            <StyledTableCell style={{borderBottom: '1px solid white'}}>Date</StyledTableCell>
                            <StyledTableCell style={{borderBottom: '1px solid white'}}>Delivered</StyledTableCell>
                            <StyledTableCell style={{borderBottom: '1px solid white'}}></StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.orderID}>
                            <StyledTableCell component="th" scope="row" style={{borderBottom: '1px solid white'}}>
                                {row.orderID}
                            </StyledTableCell>
                            <StyledTableCell style={{borderBottom: '1px solid white'}}>{row.user}</StyledTableCell>
                            <StyledTableCell style={{borderBottom: '1px solid white'}}>{row.total}</StyledTableCell>
                            <StyledTableCell style={{borderBottom: '1px solid white'}}>{row.date}</StyledTableCell>
                            <StyledTableCell style={{borderBottom: '1px solid white'}}>
                                <Checkbox size="small" color="success" />
                            </StyledTableCell>
                            <StyledTableCell style={{borderBottom: '1px solid white'}}>
                                <Button 
                                    variant="contained" 
                                    sx={{ color: '#000', fontSize: 10   }}
                                    color="success"
                                >
                                    more info
                                </Button>
                            </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                                                
                
        </Box>
    </ThemeProvider>
  );
}
