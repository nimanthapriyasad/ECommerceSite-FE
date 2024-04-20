import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import NavBar from '../../components/NavBar';



const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  

export default function PlaceOrderPage() {
  return (
    <ThemeProvider theme={darkTheme}>
        <NavBar/>
    <Box 
        sx={{
            paddingTop: 5,
            paddingBottom: 25, 
            paddingLeft: 10,
            paddingRight: 10,
            height: "100vh",
            backgroundColor: "#212529", 
            color: '#fff' 
        }}
    >
    
      
      <Grid container spacing={2}>
        <Grid item xs={8}>
            <Box sx={{paddingTop: 2, paddingBottom: 1}}>
                <Typography 
                    variant='h5' 
                    component="div"
                    sx={{
                        fontWeight: 'bold'
                    }}
                >
                    SHIPPING
                </Typography>
                <Typography 
                    variant='body2' 
                    component="div"
                    sx={{
                        fontWeight: 400,
                        opacity: 0.85
                    }}
                >
                    No.240, Kottawa Road, Makubura - Postal Code - 82450
                </Typography>
            </Box>
            <Divider sx={{ borderBottomWidth: 2.5 }}/>
            <Box sx={{paddingTop: 2, paddingBottom: 1}}>
                <Typography 
                    variant='h5' 
                    component="div"
                    sx={{
                        fontWeight: 'bold'
                    }}
                >
                    PAYMENT METHOD
                </Typography>
                <Typography 
                    variant='body2' 
                    component="div"
                    sx={{
                        fontWeight: 400,
                        opacity: 0.85
                    }}
                >
                    Credit or Debit Card
                </Typography>
            </Box>
            <Divider sx={{ borderBottomWidth: 2.5 }}/>
            <Box sx={{paddingTop: 2, paddingBottom: 1}}>
                <Typography 
                    variant='h5' 
                    component="div"
                    sx={{
                        fontWeight: 'bold'
                    }}
                >
                    ORDER ITEMS
                </Typography>
                <Typography 
                    variant='body2' 
                    component="div"
                    sx={{
                        fontWeight: 400,
                        opacity: 0.85
                    }}
                >
                    Credit or Debit Card
                </Typography>
            </Box>
            <Grid container spacing={2} sx={{paddingTop: 1, paddingBottom: 2}}>
                <Grid item xs={1}>
                    <img src="./images/sampleItem.jpg" alt="itemImage" width={50} style={{borderRadius: 17}} /> 
                </Grid>
                <Grid item xs={2}>
                    Lovely Teady Medium Size
                </Grid>
                <Grid item xs={2}>
                   $12.50 
                </Grid>
                <Grid item xs={2}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    
                    >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                    </Select>
                </FormControl>  
                </Grid>
                <Grid item xs={3}>
                    $12.50 x 1 = $12.50  
                </Grid>
            </Grid>
            <Divider sx={{ borderBottomWidth: 1 }}/>
            
        </Grid>
        <Grid item xs={3}>
            <Box
                sx={{
                    backgroundColor: '#3a3b3c',
                    width: 300,
                    marginTop: 2,
                    marginLeft: 7,
                    marginRight: 7,
                    paddingTop: 2,
                    textAlign: 'center',
                    borderRadius: 5,
                    border: 3
                }}
            >
                <Typography 
                    variant='h5' 
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        opacity: 0.5
                    }}
                >
                    ORDER SUMMARY
                </Typography>
                <Grid container spacing={2} sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 0.5, paddingTop: 0.5}}>
                    <Grid item xs={8}>
                    <Typography 
                        variant='body1' 
                        component="div"
                        sx={{
                            textAlign: 'left',
                            fontSize: 20
                        }}
                    >Items
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography 
                        variant='body1' 
                        component="div"
                        sx={{
                            textAlign: 'right',
                            fontSize: 20
                        }}
                    >$16.50
                    </Typography>
                    </Grid>
                    
                </Grid>
                <Divider variant="middle" />
                <Grid container spacing={2} sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 0.5, paddingTop: 0.5}}>
                    <Grid item xs={8}>
                    <Typography 
                        variant='body1' 
                        component="div"
                        sx={{
                            textAlign: 'left',
                            fontSize: 20
                        }}
                    >Shipping
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography 
                        variant='body1' 
                        component="div"
                        sx={{
                            textAlign: 'right',
                            fontSize: 20
                        }}
                    >$0.00
                    </Typography>
                    </Grid>
                    
                </Grid>
                <Divider variant='middle'/>
                <Grid container spacing={2} sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 0.5, paddingTop: 0.5}}>
                    <Grid item xs={8}>
                    <Typography 
                        variant='body1' 
                        component="div"
                        sx={{
                            textAlign: 'left',
                            fontSize: 20
                        }}
                    >Tax
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography 
                        variant='body1' 
                        component="div"
                        sx={{
                            textAlign: 'right',
                            fontSize: 20
                        }}
                    >$5.50
                    </Typography>
                    </Grid>
                    
                </Grid>
                <Divider variant='middle'   />
                <Grid container spacing={2} sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 0.5, color: '#ffa726', paddingTop: 0.5}}>
                    <Grid item xs={8}>
                    <Typography 
                        variant='body1' 
                        component="div"
                        sx={{
                            textAlign: 'left',
                            fontSize: 20,
                        }}
                    >Total
                    </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <Typography 
                        variant='body1' 
                        component="div"
                        sx={{
                            textAlign: 'right',
                            fontSize: 20
                        }}
                    >$22.00
                    </Typography>
                    </Grid>
                    
                </Grid>
                <Divider variant='middle'   />
                <Button 
                    variant="contained" 
                    type="submit"
                    sx={{ mt: 3, mb: 2, color: '#fff' }}
                    color="warning"
                >
                    Place Order
                </Button>
            </Box>
        </Grid>
        
        
      </Grid>
    
    </Box>
    </ThemeProvider>
  );
}
