import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { ADMIN_SECTIONS } from '../../constants';

export default function MainListItems() {
  const navigate = useNavigate();

  function routeToPage(page) {
    navigate(`/admin/${page}`);
  }
  return (
    <React.Fragment>
      <ListItemButton onClick={() => routeToPage(ADMIN_SECTIONS.DASHBOARD)}>
        <ListItemIcon>
          <DashboardIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => routeToPage(ADMIN_SECTIONS.ORDERS)}>
        <ListItemIcon>
          <ShoppingCartIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>

      <ListItemButton onClick={() => routeToPage(ADMIN_SECTIONS.INVENTORY)}>
        <ListItemIcon>
          <BarChartIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Inventory" />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div" inset>
        Operations
      </ListSubheader>

      <ListItemButton onClick={() => routeToPage(ADMIN_SECTIONS.CATEGORIES)}>
        <ListItemIcon>
          <AssignmentIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
    </React.Fragment>
  );
}
