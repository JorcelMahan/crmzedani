import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CountDayStore from './CountDayStore';
import CountSalesMonthStore from '../Cards/CountSalesMonthStore';
import CardMedia from '@material-ui/core/CardMedia';
import StoreIcon from '@material-ui/icons/Store';
import SellersList from '../SellersList';
import { Avatar, Box, Divider, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginTop: '1rem',
  },
  fixedHeight: {
    height: 440,
  },
  depositContext: {
    flex: 1,
  },
  red: {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
  },

  title: {
    textTransform: 'uppercase',
  },

  monthTitle: {
    textTransform: 'capitalize',
  },
}));

const CardGoalStore = ({ user, store, goal }) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Paper className={fixedHeightPaper}>
      <Typography
        className={classes.title}
        component='h2'
        variant='h6'
        color='primary'
        gutterBottom>
        {store === 'patrick' ? 'Sandder TNT' : store}
      </Typography>
      <Box display='flex' justifyContent='space-between'>
        <Typography className={classes.monthTitle} component='p' variant='h4'>
          {new Date().toLocaleString('es-MX', { month: 'long' })}
        </Typography>
        <Avatar className={classes.red}>
          <CountDayStore store={store} />
        </Avatar>
      </Box>
      <Typography color='textSecondary' className={classes.depositContext}>
        <span className={classes.monthTitle}>
          {new Date().toLocaleDateString('es-MX', { weekday: 'long' })} -{' '}
        </span>
        {new Date().toLocaleDateString('es-MX')}
      </Typography>
      <Divider />
      <Box>
        <SellersList store={store} />
      </Box>
      <Box mt={2} display='flex' justifyContent='space-between'>
        <CountSalesMonthStore store={store} goal={goal} />
      </Box>
    </Paper>
  );
};

export default CardGoalStore;
