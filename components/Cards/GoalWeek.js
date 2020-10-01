import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { gql, useQuery } from '@apollo/client';
import Loader from '../Loader';
import { CardActionArea, CardMedia } from '@material-ui/core';

const GET_TOTAL_SALES_CURRENT_MONTH = gql`
  query totalSalesCurrentMonth {
    totalSalesCurrentMonth
  }
`;

const GET_VENTAS = gql`
  query allventas($month: Int!, $startDay: Int!, $endDay: Int!) {
    allventas(month: $month, startDay: $startDay, endDay: $endDay) {
      id
      total
      productos {
        quantity
      }
    }
  }
`;

const GET_VENTAS_DAY_BY_STORE = gql`
  query salesDayByStore($store: String!) {
    salesDayByStore(store: $store) {
      id
      total
      fechaDeCompra
      productos {
        quantity
      }
    }
  }
`;

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  card: {
    // minWidth: 275,
    marginTop: '1rem  ',
    // border: '1px solid red',
  },

  title: {
    fontSize: '1.2rem',
    color: '#D32F2F',
  },
  pos: {
    marginBottom: '1rem',
  },
  containerMeta: {
    maxWidth: 345,
  },
  mediaMeta: {
    height: 140,
  },
  divContainer: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
});

const CountDayStore = ({ store }) => {
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_VENTAS_DAY_BY_STORE,
    {
      variables: {
        store,
      },
    }
  );
  useEffect(() => {
    startPolling(5000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return 'Loading';
  if (error) return `Error ${error.message}`;
  let total = 0;
  data.salesDayByStore.forEach((venta) => {
    total += venta.productos.reduce((acc, p) => acc + p.quantity, 0);
  });
  return <div>{total}</div>;
};

const Count = ({ month, startDay, endDay }) => {
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_VENTAS,
    {
      variables: {
        month: Number(month),
        startDay: Number(startDay),
        endDay: Number(endDay),
      },
    }
  );

  useEffect(() => {
    startPolling(5000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return 'Loading';
  if (error) return `error: ${error}`;
  let total = 0;
  data.allventas.forEach((venta) => {
    total += venta.productos.reduce((acc, p) => acc + p.quantity, 0);
  });

  return <span>{total}</span>;
};
export default function GoalWeek() {
  const classes = useStyles();
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_TOTAL_SALES_CURRENT_MONTH
  );
  useEffect(() => {
    startPolling(5000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return <Loader />;
  if (error) return <p>Error {error.message}</p>;
  return (
    <>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={3}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                {/* Hoy: {new Date().toDateString()} */}
                Miraflores
              </Typography>
              <Typography variant='h5' component='h2'>
                <CountDayStore store='miraflores' />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                San Miguel
              </Typography>
              <Typography variant='h5' component='h2'>
                <CountDayStore store='san miguel' />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                Sopocachi
              </Typography>
              <Typography variant='h5' component='h2'>
                <CountDayStore store='sopocachi' />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                Mes:
                {new Date().toLocaleString('es-MX', { month: 'long' })}
              </Typography>
              <Typography variant='h5' component='h2'>
                <Count month='9' startDay='1' endDay='31' />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {data.totalSalesCurrentMonth >= 1200 && (
        <div className={classes.divContainer}>
          <Card className={classes.containerMeta}>
            <CardActionArea>
              <CardMedia
                image='https://t3.ftcdn.net/jpg/02/44/50/06/240_F_244500619_Nh1WCn4rggy7vAxmqwyEY9zL5s2PMh2Z.jpg'
                className={classes.mediaMeta}
                title='Congratulations'
              />
            </CardActionArea>
            <CardContent>
              <Typography gutterBottom variant='h1' component='h2'>
                Lo logramos
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                ¡Eso es! Lo hicimos. Tomemonos unos minutos para celebrar y
                continuemos con el mismo entusiasmo.
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
