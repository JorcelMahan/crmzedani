import React, { useState } from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import CardBadge from '../../../../components/CardBadge';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  logoText: {
    color: 'white',
    fontSize: '1.5rem',
  },
  defaultLink: {
    color: 'white',
  },
}));
const TopBar = (props) => {
  const { className, onSidebarOpen, closeSession, ...rest } = props;
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <Link href='/'>
          <a className={classes.logoText}>ZEDANI</a>
        </Link>
        <div className={classes.flexGrow} />
        <Hidden>
          <Link href='/checkout'>
            <a className={classes.defaultLink}>
              <CardBadge />
            </a>
          </Link>
          {/* <IconButton color='inherit'>
            <Badge
              badgeContent={notifications.length}
              color='primary'
              variant='dot'
            ></Badge>
          </IconButton> */}
          <IconButton
            className={classes.signOutButton}
            color='inherit'
            onClick={closeSession}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color='inherit' onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
