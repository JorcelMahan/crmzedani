import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { gql, useQuery } from '@apollo/client';
// import Loader from '../Loader';
// import { CardActionArea, CardMedia } from '@material-ui/core';
import AuthContext from '../../context/auth/AuthContext';

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
    salesDayByStore(store: $store)
  }
`;

const GET_SALES_MONTH_BY_STORE = gql`
  query salesMonthByStore($store: String!) {
    salesMonthByStore(store: $store)
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
  divGoal: {
    fontSize: '1.2rem',
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

  return <span>{data.salesDayByStore}</span>;
};

const Goal2 = ({ store, goal, sales }) => {
  let goal2 = 0;
  if (store === 'sopocachi') {
    goal2 = 64;
  } else if (store === 'miraflores') {
    goal2 = 150;
  } else if (store === 'san miguel') {
    goal2 = 72;
  }
  const newGoal = Number(goal) + goal2;
  return (
    <>
      <h4>FELICIDADES</h4>
      <p>
        Meta 2: {sales} de {newGoal}
      </p>
      <p>+ {goal2} pares</p>
      <p>Bono + 100Bs</p>
      <p>Falta: {newGoal - sales}</p>
    </>
  );
};
const CountSalesMonthStore = ({ store, goal }) => {
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_SALES_MONTH_BY_STORE,
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
  return (
    <div>
      {data.salesMonthByStore >= Number(goal) ? (
        <Goal2 store={store} goal={goal} sales={data.salesMonthByStore} />
      ) : (
        <>
          <p>
            Meta 1: {data.salesMonthByStore} de {goal}
          </p>
          <p>Falta: {Number(goal) - data.salesMonthByStore}</p>
        </>
      )}
    </div>
  );
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
    venta.productos.forEach((product) => {
      if (product.tipo !== 'accesorios') {
        total += product.quantity;
      }
    });
  });

  return <span>{total}</span>;
};
export default function GoalWeek() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
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
            <div className={classes.divGoal}>
              <h4>
                Mes:{' '}
                <span>
                  {new Date().toLocaleString('es-MX', { month: 'long' })}
                </span>
              </h4>
              <p>
                Dia: <CountDayStore store='miraflores' />
              </p>

              {(user === 'patrick' ||
                user === 'kathryn' ||
                user === 'laura' ||
                user === 'fabio' ||
                user === 'miraflores') && (
                <CountSalesMonthStore store='miraflores' goal='390' />
              )}
            </div>
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
            <div className={classes.divGoal}>
              <h4>
                Mes:{' '}
                <span>
                  {new Date().toLocaleString('es-MX', { month: 'long' })}
                </span>
              </h4>
              <p>
                Dia: <CountDayStore store='san miguel' />
              </p>
              {(user === 'patrick' ||
                user === 'kathryn' ||
                user === 'laura' ||
                user === 'fabio' ||
                user === 'san miguel') && (
                <CountSalesMonthStore store='san miguel' goal='180' />
              )}
            </div>
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
            <div className={classes.divGoal}>
              <h4>
                Mes:{' '}
                <span>
                  {new Date().toLocaleString('es-MX', { month: 'long' })}
                </span>
              </h4>
              <p>
                Dia: <CountDayStore store='sopocachi' />
              </p>
              {(user === 'patrick' ||
                user === 'kathryn' ||
                user === 'laura' ||
                user === 'fabio' ||
                user === 'sopocachi') && (
                <CountSalesMonthStore store='sopocachi' goal='180' />
              )}
            </div>
          </CardContent>
        </Card>
      </Grid>
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio') && (
        <>
          <Grid item xs={12} sm={3}>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color='textSecondary'
                  gutterBottom
                >
                  David TNT
                </Typography>
                <div className={classes.divGoal}>
                  <h4>
                    Mes:{' '}
                    <span>
                      {new Date().toLocaleString('es-MX', { month: 'long' })}
                    </span>
                  </h4>
                  <p>
                    Dia: <CountDayStore store='patrick' />
                  </p>

                  <CountSalesMonthStore store='patrick' goal='1000' />
                </div>
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
                  <Count month='10' startDay='1' endDay='30' />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  );
}
