import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { gql, useQuery } from '@apollo/client';

const GET_VENTAS = gql`
  query allventas {
    allventas {
      id
      total
      productos {
        quantity
      }
    }
  }
`;
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: '20px',
    border: '1px solid red',
  },

  title: {
    fontSize: '1.2rem',
    color: '#D32F2F',
  },
  pos: {
    marginBottom: '1rem',
  },
});
const Count = ({ ventas }) => {
  let total = 0;
  ventas.forEach((venta) => {
    total += venta.productos.reduce((acc, p) => acc + p.quantity, 0);
  });
  return <span>{total}</span>;
};
export default function GoalWeek() {
  const classes = useStyles();
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_VENTAS
  );
  useEffect(() => {
    startPolling(2000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return 'Loading';
  if (error) return `error: ${error}`;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          Meta del Mes de Agosto
        </Typography>
        <Typography variant='h5' component='h2'>
          <Count ventas={data.allventas} /> de <b> 1000 </b>
        </Typography>

        <Typography variant='body2' component='p'>
          Haz siempre tanto como puedas. Lo que plantes ahora, lo consecharás
          mañana.
        </Typography>
      </CardContent>
    </Card>
  );
}
