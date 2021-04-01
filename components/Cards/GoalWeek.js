import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { gql, useQuery } from '@apollo/client';
import AuthContext from '../../context/auth/AuthContext';
import CardGoalStore from './CardGoalStore';

const GET_VENTAS = gql`
  query allventas($month: Int!, $startDay: Int!, $endDay: Int!) {
    allventas(month: $month, startDay: $startDay, endDay: $endDay) {
      id
      total
      productos {
        id
        codigo
        quantity
        estado
        tipo
      }
    }
  }
`;
const GET_VENTAS_BY_RANGE_OF_DATES = gql`
  query salesByRangeOfDate($initial: String!, $finish: String!) {
    salesByRangeOfDate(initial: $initial, finish: $finish)
  }
`;

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
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
  cardGoal2: {
    fontSize: '1.5rem',
  },
});

const Count2 = ({ initial, finish }) => {
  const classes = useStyles();
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_VENTAS_BY_RANGE_OF_DATES,
    {
      variables: {
        initial,
        finish,
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
  if (error) return `Error: ${error}`;
  return (
    <div className={classes.cardGoal2}>
      <div style={{ marginBottom: '2px' }}>
        <i>
          "Trabajar en equipo divide el trabajo y multiplica los resultados"
        </i>
      </div>
      <hr />
      <p style={{ marginTop: '5px' }}>
        Meta: {data.salesByRangeOfDate} de 3600
      </p>
      <p>Falta: {3600 - data.salesByRangeOfDate}</p>
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
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return 'Loading';
  if (error) return `error: ${error.message}`;
  let totalShoes = 0;
  let totalAccesorios = 0;
  data.allventas.forEach((venta) => {
    venta.productos.forEach((product) => {
      if (product.estado !== 'CANCELADO') {
        if (product.tipo !== 'accesorios') {
          totalShoes += product.quantity;
        } else {
          totalAccesorios += product.quantity;
        }
      }
    });
  });

  return (
    <div>
      Z & M = <b>{totalShoes}</b>
      <br />P & A.L = <b>{totalAccesorios}</b>
    </div>
  );
};
export default function GoalWeek() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <Grid container spacing={3} className={classes.root}>
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio' ||
        user === 'miraflores') && (
        <Grid item xs={12} md={3} lg={6}>
          <CardGoalStore user={user} store='miraflores' goal='390 ' />
        </Grid>
      )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio' ||
        user === 'san miguel') && (
        <Grid item xs={12} md={3} lg={6}>
          <CardGoalStore user={user} store='san miguel' goal='180' />
        </Grid>
      )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio' ||
        user === 'sopocachi') && (
        <Grid item xs={12} md={3} lg={6}>
          <CardGoalStore user={user} store='sopocachi' goal='180' />
        </Grid>
      )}
      {/*uss: ventaslapaz*/}
      {/*Contraseña: ventaslapaz1*/}

      {/*Uss: ventascbba*/}
      {/*Pass: ventascbba1*/}

      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio') && (
        <Grid item xs={12} md={3} lg={6}>
          <CardGoalStore user={user} store='patrick' goal='1000' />
        </Grid>
      )}

      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio') && (
        <Grid item xs={12} md={3} lg={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom>
                Mes:
                {new Date().toLocaleString('es-MX', { month: 'long' })}
              </Typography>

              <Count month='3' startDay='1' endDay='30' />
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}
