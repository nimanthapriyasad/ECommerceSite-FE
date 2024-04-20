import React, { useState } from 'react';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { CssBaseline, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import SignNavBar from '../../components/SignNavBar';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Formik } from 'formik';
import HeightBox from '../../components/HeightBox';
import api from '../../api';
import SnackBarComponent from '../../components/SnackBarComponent';
import {
  setAuthorizationKey,
  setUserObjectInLocal,
} from '../../utils/localStorageHelper';
import { loggingRequest } from '../../reducers/modules/user';
import NavBar from '../../components/NavBar';

const validationSchemaOne = Yup.object().shape({
  firstName: Yup.string().required().label('First Name'),
  lastName: Yup.string().required().label('Last Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string()
    .required()
    .min(8)
    .max(15)
    .label('Password')
    .matches(/\d+/, 'Password should contain at least one number')
    .matches(
      /[a-z]+/,
      'Password should contain at least one lowercase character'
    )
    .matches(
      /[A-Z]+/,
      'Password should contain at least one uppercase character'
    )
    .matches(
      /[!@#$%^&*()-+]+/,
      'Password should contain at least one special character'
    ),
  confirmPassword: Yup.string()
    .required()
    .label('Confirm Password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const validationSchemaTwo = Yup.object().shape({
  birthday: Yup.string().required().label('Birthday'),
  phoneNumber: Yup.string().required(),
  addressLine1: Yup.string().required().label('Address Line 1'),
  addressLine2: Yup.string().required().label('Address Line 2'),
  city: Yup.string().required().label('City'),
  postalCode: Yup.string().required().label('Postal Code'),
  district: Yup.string().required().label('District'),
});

export default function SignUp() {
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorOccured, setErrorOccured] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ type: '', message: '' });
  const containerRef = React.useRef(null);
  const [currentForm, setCurrentForm] = useState('ONE');
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    district: '',
    birthday: '',
    city: '',
  });
  const initialValuesFormOne = {
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    email: formValues.email,
    password: formValues.password,
    confirmPassword: formValues.confirmPassword,
  };
  const initialValuesFormTwo = {
    phoneNumber: formValues.phoneNumber,
    addressLine1: formValues.addressLine1,
    addressLine2: formValues.addressLine2,
    postalCode: formValues.postalCode,
    district: formValues.district,
    birthday: formValues.birthday,
    city: formValues.city,
  };

  async function registerUser(values) {
    setLoading(true);

    try {
      const [code, res] = await api.user.signUpUser(values);
      if (res?.statusCode === 201) {
        setAuthorizationKey(res.data.token);
        setUserObjectInLocal(res.data.user);
        dispatch(loggingRequest(res.data.user));
        navigate('/');
      } else {
        setErrorMessage({ type: 'error', message: res?.message });
        setErrorOccured(true);
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage({ type: 'error', message: error?.message });
      setErrorOccured(true);
      setLoading(false);
    }
  }

  const submitForm = (values) => {
    setFormValues({
      ...formValues,
      ...values,
    });
    if (currentForm === 'ONE') {
      setCurrentForm('TWO');
    } else {
      registerUser({ ...formValues, ...values });
    }
  };

  const goToFormOne = () => {
    if (currentForm === 'TWO') {
      setCurrentForm('ONE');
    }
  };

  const handleClickShowPassword = () => {
    setShowPasswordText(!showPasswordText);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const FormOne = React.forwardRef((props, ref) => {
    return (
      <div ref={ref} {...props}>
        <Formik
          initialValues={initialValuesFormOne}
          onSubmit={submitForm}
          validationSchema={validationSchemaOne}
        >
          {(formikProps) => {
            const { values, handleChange, handleSubmit, errors, touched } =
              formikProps;

            return (
              <Box sx={{
                boxShadow: 12,
                width: 500,
                padding: 3,
                borderRadius: 2,

              }}>

                <Stack direction="column" spacing={2}>
                  <Typography 
                    component="h1" 
                    variant="h4"
                    sx={{
                      fontWeight: 500
                    }}
                  >
                    Register With Us ,
                  </Typography>
                  <HeightBox height={10} />
                  <TextField
                    fullWidth
                    label="First Name"
                    type="text"
                    value={values.firstName}
                    error={errors.firstName}
                    helperText={touched.firstName ? errors.firstName : ''}
                    onChange={handleChange('firstName')}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    type="text"
                    value={values.lastName}
                    error={errors.lastName}
                    helperText={touched.lastName ? errors.lastName : ''}
                    onChange={handleChange('lastName')}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={values.email}
                    error={errors.email}
                    helperText={touched.email ? errors.email : ''}
                    onChange={handleChange('email')}
                    variant="outlined"
                  />

                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPasswordText ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    error={errors.password}
                    helperText={touched.password ? errors.password : ''}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPasswordText ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    required
                    fullWidth
                    error={errors.confirmPassword}
                    helperText={
                      touched.confirmPassword ? errors.confirmPassword : ''
                    }
                    label="Confirm Password"
                    type={showPasswordText ? 'text' : 'password'}
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPasswordText ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Next
                  </Button>
                  <Grid container justifyContent="center">
                    <Grid item>
                      Already have an account? &nbsp;
                      <Link href="/signin" variant="body2">
                        Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Stack>
       
              </Box>
            );
          }}
        </Formik>
      </div>
      
    );
  });

  const FormTwo = React.forwardRef((props, ref) => {
    return (
      <div ref={ref} {...props}>
        <Formik
          initialValues={initialValuesFormTwo}
          onSubmit={submitForm}
          validationSchema={validationSchemaTwo}
        >
          {(formikProps) => {
            const { values, handleChange, handleSubmit, errors, touched } =
              formikProps;
            return (
              <Box sx={{
                boxShadow: 12,
                width: 500,
                padding: 3,
                borderRadius: 2,

              }}>
              
                <Stack direction="column" spacing={2}>
                  <Typography 
                    component="h1" 
                    variant="h4"
                    sx={{
                      fontWeight: 500
                    }}
                  >
                    Add more details,
                  </Typography>
                  <HeightBox height={10} />
                  <TextField
                    fullWidth
                    label="Birthday"
                    type="date"
                    value={values.birthday}
                    error={errors.birthday}
                    InputLabelProps={{ shrink: true }}
                    helperText={touched.birthday ? errors.birthday : ''}
                    onChange={handleChange('birthday')}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    type="text"
                    value={values.phoneNumber}
                    error={errors.phoneNumber}
                    helperText={touched.phoneNumber ? errors.phoneNumber : ''}
                    onChange={handleChange('phoneNumber')}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    type="text"
                    value={values.addressLine1}
                    error={errors.addressLine1}
                    helperText={touched.addressLine1 ? errors.addressLine1 : ''}
                    onChange={handleChange('addressLine1')}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    type="text"
                    value={values.addressLine2}
                    error={errors.addressLine2}
                    helperText={touched.addressLine2 ? errors.addressLine2 : ''}
                    onChange={handleChange('addressLine2')}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Postal Code"
                    type="text"
                    value={values.postalCode}
                    error={errors.postalCode}
                    helperText={touched.postalCode ? errors.postalCode : ''}
                    onChange={handleChange('postalCode')}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="City"
                    type="text"
                    value={values.city}
                    error={errors.city}
                    helperText={touched.city ? errors.city : ''}
                    onChange={handleChange('city')}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="District"
                    type="text"
                    value={values.district}
                    error={errors.district}
                    helperText={touched.district ? errors.district : ''}
                    onChange={handleChange('district')}
                    variant="outlined"
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? <CircularProgress /> : ' Register'}
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    disabled={isLoading}
                    onClick={goToFormOne}
                  >
                    Back
                  </Button>
                  <Grid container justifyContent="center">
                    <Grid item>
                      Already have an account? &nbsp;
                      <Link href="/signin" variant="body2">
                        Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Stack>
              </Box>
            );
          }}
        </Formik>
      </div>
    );
  });
  return (
    <Box ref={containerRef}>
      <CssBaseline />
      <SnackBarComponent
        open={errorOccured}
        setOpen={setErrorOccured}
        type={errorMessage.type}
        message={errorMessage.message}
      />
      <SignNavBar />
      <HeightBox height={20} />
      <div>
        <Stack
          direction="row"
          spacing={10}
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <img src="./images/SignupImage.png" alt="signupImage" width={600} />
          </div>
          {currentForm === 'ONE' && (
            <Slide in={currentForm === 'ONE'} direction="left">
              <FormOne />
            </Slide>
          )}
          {currentForm === 'TWO' && (
            <Slide in={currentForm === 'TWO'} direction="left">
              <FormTwo />
            </Slide>
          )}
        </Stack>
      </div>
    </Box>
  );
}
