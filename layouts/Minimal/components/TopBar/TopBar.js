import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
  },
}));
const TopBar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} color='primary' position='fixed'>
      <Toolbar>Aqui va el logo</Toolbar>
    </AppBar>
  );
};

export default TopBar;
