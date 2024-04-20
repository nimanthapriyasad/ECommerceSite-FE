import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import NavBar from '../../components/NavBar';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const Input = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.light,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '2px 26px 2px 10px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));
  

export default function ProductDetail() {
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
                <Grid item xs={5}>
                <Box >
                    <img src="./images/product.png" alt="productImage" width={500} style={{borderRadius: 30}} />
                </Box>
                </Grid>
                <Grid item xs={7}>
                    <Grid container >
                        <Grid item xs={8} style={{ borderRight: '0.01em solid white', borderBottom: '0.01em solid white' }}>
                            <Typography 
                                variant='h3' 
                                component="div"
                                sx={{
                                    fontWeight: 500
                                }}
                                
                            >
                                LOVELY TEDDY BEAR
                            </Typography>
                            
                            <Box
                                sx={{
                                    width: 200,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                <Rating name="rating" value={3.5} precision={0.5} size="large" readOnly />
                                <Box sx={{ ml: 2 }}>
                                    <Typography 
                                        variant='overline' 
                                        component="div"
                                        sx={{
                                            fontSize: 20
                                        }}
                                    >
                                    3.6(123)
                                    </Typography>
                                    </Box>
                            </Box>
                            
                            
                        </Grid>
                        
                        
                        <Grid item xs={4} sx={{textAlign: 'center'}}>
                            <Grid container spacing={2} sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 0.5, paddingTop: 0.5}}>
                                <Grid item xs={7}>
                                    <Typography 
                                        variant='body1' 
                                        component="div"
                                        sx={{
                                            textAlign: 'left',
                                            fontSize: 18
                                        }}
                                    >Price :
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography 
                                        variant='body1' 
                                        component="div"
                                        sx={{
                                            
                                            fontSize: 18
                                        }}
                                    >$12.50
                                    </Typography>
                                </Grid>
                                
                            </Grid>
                            <Grid container spacing={2} sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 0.5, paddingTop: 0.5}}>
                                <Grid item xs={7}>
                                    <Typography 
                                        variant='body1' 
                                        component="div"
                                        sx={{
                                            textAlign: 'left',
                                            fontSize: 18,
                                            paddingTop: 1,
                                        }}
                                    >Status :
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography 
                                        variant='body1' 
                                        component="div"
                                        sx={{
                                            
                                            fontSize: 18,
                                            color: '#2ED573',
                                            paddingTop: 1,
                                        }}
                                    >In Stock
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 0.5, paddingTop: 0.5}}>
                                <Grid item xs={7}>
                                    <Typography 
                                        variant='body1' 
                                        component="div"
                                        sx={{
                                            textAlign: 'left',
                                            fontSize: 18,
                                            paddingTop: 1,
                                        }}
                                    >Quantity :
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl variant="filled" sx={{ m: 1, minWidth: 60 }} size="small">
                                        <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        input={<Input />}
                                        >
                                        <MenuItem value={10}>1</MenuItem>
                                        <MenuItem value={20}>2</MenuItem>
                                        <MenuItem value={30}>3</MenuItem>
                                        </Select>
                                    </FormControl>  
                                </Grid>
                            </Grid>
                            <Button 
                                variant="contained" 
                                type="submit"
                                sx={{ mt: 1, mb: 1, color: '#fff', width: 200 }}
                                color="warning"
                            >
                                Add to cart
                            </Button>
                        </Grid>
                        
                    </Grid>
                    <Typography 
                        variant='BUTTON' 
                        component="div"
                        sx={{
                            fontWeight: 500,
                            fontSize: 20,
                            paddingTop: 2,
                            paddingBottom: 2
                        }}
                    >
                        DESCRIPTION
                    </Typography>
                    <Typography
                        variant='body1' 
                        component="div"
                        sx={{
                        
                            fontSize: 16,
                            width: 765,
                            textAlign: 'justify',
                            color: '#9D9D9D'
                        }}
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                        but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised 
                        in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
                        with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>
                </Grid>
                
            </Grid>
            <Typography 
                variant='h5' 
                component="div"
                sx={{
                    fontWeight: 500,
                    paddingTop: 2,
                    paddingBottom: 1
                }}
            >
                REVIEWS
            </Typography>
            <Typography 
                variant='subtitle2' 
                component="div"
                sx={{
                    fontSize: 16,
                    opacity: 0.8
                }}
            >
                User123
            </Typography>
            <Typography 
                variant='body1' 
                component="div"
                sx={{
                    fontSize: 14,
                    opacity: 0.8,
                    fontWeight: 300
                }}
            >
                12/08/2022
            </Typography>
            <Box
                sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
                }}
            >
                <Rating name="rating" value={5.0} precision={0.5} size="small" readOnly />
                <Box sx={{ ml: 2 }}>
                    <Typography 
                        variant='overline' 
                        component="div"
                        sx={{
                            fontSize: 15,
                            color: '#9D9D9D',
                        }}
                    >
                        5.0
                    </Typography>
                </Box>
            </Box>
            <Typography
                variant='body1' 
                component="div"
                sx={{   
                    fontSize: 12,
                    textAlign: 'justify',
                    color: '#9D9D9D',
                    paddingRight: 3
                }}
            >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been 
                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley 
                of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised 
                in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently 
                with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography>          
            
        </Box>
    </ThemeProvider>
  );
}
