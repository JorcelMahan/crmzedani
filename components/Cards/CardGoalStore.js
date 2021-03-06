import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CountDayStore from './CountDayStore';
import CountSalesMonthStore from '../Cards/CountSalesMonthStore';
import SellersList from '../SellersList';
import { Box, Divider, Paper } from '@material-ui/core';

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

  title: {
    textTransform: 'uppercase',
  },

  monthTitle: {
    textTransform: 'capitalize',
  },
  paper: {
    padding: '1.25em'
  }
}));

const CardGoalStore = ({ user, store, goal }) => {
  const classes = useStyles();
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  // paper = className = { fixedHeightPaper }
  return (
    <Paper className={classes.paper}>
      <Typography
        className={classes.title}
        component='h2'
        variant='h6'
        color='primary'
        gutterBottom>
        {store === 'patrick' ? 'Sandder TNT' : store}
      </Typography>
      <Box
        display='flex'
        justifyContent='space-between'
        my={1}
        alignItems='center'>
        <Typography className={classes.monthTitle} component='p' variant='h4'>
          {new Date().toLocaleString('es-MX', { month: 'long' })}
        </Typography>

        <CountDayStore store={store} />
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
      <Box mt={2}>
        <CountSalesMonthStore store={store} goal={goal} />
      </Box>
    </Paper>
  );
};

export default CardGoalStore;
