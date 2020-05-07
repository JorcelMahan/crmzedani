import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));
const Footer = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant='body1'>Johan</Typography>
      <Typography variant='caption'>Developer with love</Typography>
    </div>
  );
};

export default Footer;
