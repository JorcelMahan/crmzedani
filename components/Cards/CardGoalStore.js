import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CountDayStore from './CountDayStore';
import CountSalesMonthStore from '../Cards/CountSalesMonthStore';
import CardMedia from '@material-ui/core/CardMedia';
import StoreIcon from '@material-ui/icons/Store';
const useStyles = makeStyles({
  card: {
    // minWidth: 275,
    marginTop: '1rem  ',
    borderRadius: '16px',
    boxShadow: '0px 7px 20px rgba(34, 35, 58, 0.2)',
    background: '#ffffff',
    display: 'flex',
  },
  title: {
    fontSize: '1.2rem',
    color: '#D32F2F',
    textTransform: 'uppercase',
  },
  divGoal: {
    fontSize: '1.2rem',
  },
  monthTitle: {
    textTransform: 'capitalize',
  },
  cover: {
    width: 151,
  },
});

const imageUrlStore = (store) => {
  switch (store) {
    case 'patrick':
      return 'https://res.cloudinary.com/zedani/image/upload/v1604752684/david_jb32ig.jpg';
    case 'miraflores':
      return 'https://res.cloudinary.com/zedani/image/upload/v1605098357/store-miraflores_x09t5l.jpg';
    case 'san miguel':
      return 'https://res.cloudinary.com/zedani/image/upload/v1605098746/tienda-san-miguel_go6c3t.jpg';
    case 'sopocachi':
      return 'https://res.cloudinary.com/zedani/image/upload/v1605098418/store-sopocachi_zinbqg.jpg';
    default:
      return 'https://res.cloudinary.com/zedani/image/upload/v1604752684/david_jb32ig.jpg';
  }
};
const CardGoalStore = ({ user, store, goal }) => {
  const classes = useStyles();
  const urlImage = imageUrlStore(store);
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cover} image={urlImage} />

      <CardContent>
        <Typography
          component='h5'
          variant='h5'
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {store === 'patrick' ? 'David TNT' : store}
        </Typography>
        <div className={classes.divGoal}>
          <Typography variant='h4' className={classes.monthTitle}>
            {new Date().toLocaleString('es-MX', { month: 'long' })}
          </Typography>
          <p>
            Dia: <CountDayStore store={store} />
          </p>
          {/* 
          {(user === 'patrick' ||
            user === 'kathryn' ||
            user === 'laura' ||
            user === 'fabio' ||
            user === store) && (
            <CountSalesMonthStore store={store} goal={goal} />
          )} */}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardGoalStore;
