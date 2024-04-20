import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SIGNIN_IMAGE from '../../assets/signin.png';
import CircularProgress from '@mui/material/CircularProgress';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import api from '../../api';
import SignNavBar from '../../components/SignNavBar';
import { Formik } from 'formik';
import HeightBox from '../../components/HeightBox';
import SnackBarComponent from '../../components/SnackBarComponent';
import { loggingRequest } from '../../reducers/modules/user';
import {
  setAuthorizationKey,
  setUserObjectInLocal,
} from '../../utils/localStorageHelper';
import NavBar from '../../components/NavBar';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string()
    .min(8)
    .max(15)
    .required()
    .label('Password')
    .matches(/\d+/, 'Password should contain at least one number')
    .matches(
      /[a-z]+/,
      'Password should contain at least one lowercase character'
    )
    .matches(
      /[A-Z]+/,
      'Passoword should contain at least one uppercase character'
    )
    .matches(
      /[!@#$%^&*()-+]+/,
      'Password should contain at least one special character'
    ),
});

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarDetails, setSnackBarDetails] = useState({
    type: '',
    message: '',
  });
  const initialValues = {
    email: '',
    password: '',
  };

  async function loginUser(values) {
    setIsLoading(true);
    try {
      const [code, res] = await api.user.signInUser(values);
      if (res?.statusCode === 200) {
        setAuthorizationKey(res.data.token);
        setUserObjectInLocal(res.data.user);
        dispatch(loggingRequest(res.data.user));
        navigate('/');
      } else {
        setSnackBarDetails({ type: 'error', message: res?.message });
        setOpenSnackBar(true);
      }
      setIsLoading(false);
    } catch (error) {
      setSnackBarDetails({
        type: 'Error',
        message: 'Error in logging the user',
      });
      setIsLoading(false);
    }
  }

  return (
    <div>
      <SnackBarComponent
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        type={snackBarDetails.type}
        message={snackBarDetails.message}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={loginUser}
      >
        {(formikProps) => {
          const { values, handleChange, handleSubmit, errors, touched } =
            formikProps;

          return (
            <div style={{ minHeight: '100vh' }}>
              <CssBaseline />
              <div>
                <SignNavBar />
              </div>
              <div>
                <div>
                  <Stack direction="row" spacing={15} justifyContent="center">
                    <div>
                      <Container color="white" component="main" maxWidth="xs">
                        <HeightBox height={80} />
                        <Box sx={{
                          boxShadow: 12,
                          width: 450,
                          padding: 3,
                          borderRadius: 2,

                        }}>
                        <Typography component="h1" variant="h4">
                          Welcome Again ,
                        </Typography>

                        <HeightBox height={20} />
                        <Box style={{ width: '400px' }}>
                          <TextField
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange('email')}
                            helperText={
                              touched.email && errors.email ? errors.email : ''
                            }
                            error={errors.email}
                            fullWidth
                            variant="outlined"
                            label="Email"
                            placeholder="Email"
                          />
                          <HeightBox height={20} />
                          <TextField
                            type="password"
                            value={values.password}
                            name="Password"
                            label="Password"
                            helperText={touched.password ? errors.password : ''}
                            error={errors.password}
                            onChange={handleChange('password')}
                            placeholder="Password"
                            fullWidth
                          />

                          <FormControlLabel
                            sx={{ mt: 2 }}
                            control={
                              <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                          />
                          <Button
                            color="primary"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                          >
                            {isLoading ? <CircularProgress /> : 'LOGIN'}
                          </Button>
                          <Grid container>
                            <Grid item xs>
                              <Link
                                href="#"
                                variant="body2"
                                onClick={() => navigate('/forgot-password')}
                              >
                                Forgot password?
                              </Link>
                            </Grid>
                            <Grid item>
                              Don't have an account?&nbsp;
                              <Link
                                onClick={() => navigate('/signup')}
                                variant="body2"
                                style={{ marginLeft: '10' }}
                              >
                                 Sign up
                              </Link>
                            </Grid>
                          </Grid>
                        </Box>
                        </Box>
                      </Container>
                    </div>
                    <div>
                      <img
                        src={SIGNIN_IMAGE}
                        alt=""
                        style={{ marginTop: 80 }}
                        width={500}
                        height={500}
                      />
                    </div>
                  </Stack>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
