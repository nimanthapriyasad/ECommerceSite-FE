import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import NavBar from '../../components/NavBar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function EditUser() {

  return (
    <ThemeProvider theme={darkTheme}>
        <NavBar/>
        <Box 
            sx={{
                height: "100vh",
                backgroundColor: "#212529",
                color: "#fff",
                textAlign: "center",
                paddingTop: 10,
             }} 
            >

        <h2>Edit User</h2>
        <Container
                color="white"
                component="main"
                maxWidth="xs"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CssBaseline />
                <Box
                  sx={{
                    mt: 10,
                    textAlign: "center",
                  }}
                >
                  

                  <Box
                    component="form"
                    noValidate
                    style={{ width: '400px' }}
                  >
                    <div class="form-row" maxWidth="xs">
                    <Input
                        sx={{ mt: 2, color: '#fff', mb: 3 }}
                        type="text"
                        name="name"
                        id="name"
                        variant="standard"
                        fullWidth
                        label="Name"
                        placeholder="Name"
                        autoFocus
                    />
                  
                </div>
                    <div class="form-row" maxWidth="xs">
                      <Input
                        sx={{ mt: 2, color: '#fff', mb: 3 }}
                        type="email"
                        name="email"
                        id="email"
                        variant="standard"
                        fullWidth
                        label="Email"
                        placeholder="Email"
                        autoComplete="email"
                        autoFocus
                      />
                      
                    </div>
                    <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Is Admin?" />
                    </FormGroup>
                    <Button
                      style={{
                        backgroundColor: '#f57c00',
                        color: '#fff'
                      }}
                      type="submit"
                      
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, mb: 2 }}
                    >
                      UPDATE
                    </Button>
                  </Box>
                </Box>
                </Container>
        </Box>

    </ThemeProvider>
  );
}
