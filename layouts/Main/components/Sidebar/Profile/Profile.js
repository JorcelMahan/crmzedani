import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import AuthContext from '../../../../../context/auth/AuthContext';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));
const Profile = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography className={classes.name} variant='h4'>
        {user ? user.toUpperCase() : ''}
      </Typography>
    </div>
  );
};

export default Profile;
