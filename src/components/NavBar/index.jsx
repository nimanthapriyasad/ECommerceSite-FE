import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { styled, alpha } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import { Stack, Typography } from '@mui/material';
import { logOutRequest } from '../../reducers/modules/user';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 50,
  backgroundColor: alpha(theme.palette.common.white, 0.99),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.9),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: 200,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: '#000',
  backgroundColor: '#ffb74d',
  borderTopLeftRadius: 25,
  borderBottomLeftRadius: 25,
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'secondary',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(6)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '70ch',
    },
  },
}));

export default function NavBar(props) {
  const { searchedText, setSearchedText } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart);
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!user?.isAdmin && (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate('/user/my-orders');
          }}
        >
          My Orders
        </MenuItem>
      )}
      {user?.isAdmin && (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate('/admin/dashboard');
          }}
        >
          Admin
        </MenuItem>
      )}

      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate('/user/settings');
        }}
      >
        Settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(logOutRequest());
          localStorage.clear();
          navigate('/');
        }}
      >
        Log out
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        backgroundColor: '#212529',
        color: '#fff',
      }}
    >
      <AppBar
        position="static"
        color="transparent"
        sx={{
          paddingLeft: 6,
          paddingRight: 6,
          borderBottom: 1,
          borderColor: '#413F42',
        }}
      >
        <Toolbar sx={{ width: '100%', maxWidth: 1300, mx: 'auto' }}>
          <Typography
            variant="h5"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <img src="./images/logo.png" alt="logo" width={55} />
          </Typography>
        
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search what you want"
              inputProps={{ 'aria-label': 'search' }}
              value={searchedText}
              onChange={(event) => {
                if (event.target.value) {
                  if (location.pathname !== '/') {
                    navigate('/');
                  }
                }
                setSearchedText(event.target.value);
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {user?.isAdmin && (
            <Button
              variant="outlined"
              sx={{ mr: 2 }}
              color="secondary"
              onClick={() => navigate('/admin/dashboard')}
            >
              Admin Dashboard
            </Button>
          )}
          <Typography variant="p">{`$${cart?.total}`}</Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button onClick={() => navigate('/cart')}>
              <Badge badgeContent={cart?.items?.length} color="primary">
                <AiOutlineShoppingCart color="#dc3545" size={25} />
              </Badge>
            </Button>

            {!user?.auth && (
              <>
                <Button color="primary" onClick={() => navigate('/signin')}>
                  Sign in
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Button>
              </>
            )}
            {user?.auth && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt={user?.firstName} src="#" size={25} />
              </IconButton>
            )}
          </Box>
          {renderMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
