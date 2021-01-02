import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardMoney from '../components/Cierre/CardMoney';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
}));

const Cierre = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <CardMoney />
      </div>
    </div>
  );
};

export default Cierre;
