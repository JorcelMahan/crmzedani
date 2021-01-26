import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ExitToApp from '@material-ui/icons/ExitToApp';
import SidebarNav from './SidebarNav/SidebarNav';
import clsx from 'clsx';
import Profile from './Profile/Profile';
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));
const Sidebar = ({ open, variant, onClose, className }) => {
  const classes = useStyles();
  const pages = [
    {
      title: 'Dashboard',
      href: '/',
      icon: <DashboardIcon />,
    },
    {
      title: 'Promotoras',
      href: '/promotoras',
      icon: <PeopleIcon />,
    },
    {
      title: 'Ventas',
      href: '/ventas',
      icon: <ShoppingBasketIcon />,
    },
    {
      title: 'Cierre del Dia',
      href: '/cierre',
      icon: <DashboardIcon />,
    },
    {
      title: 'Salidas',
      href: '/salidas',
      icon: <ExitToApp />,
    },
  ];
  return (
    <Drawer
      anchor='left'
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}>
      <div className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

export default Sidebar;
