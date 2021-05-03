import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { gql, useQuery } from '@apollo/client';
import AuthContext from '../../context/auth/AuthContext';
import CardGoalStore from './CardGoalStore';
import CardSalesEmployee from './CardSalesEmployee';
import { Box } from '@material-ui/core';

const GET_VENTAS = gql`
  query allventasCurrentMonth {
    allventasCurrentMonth
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

const Count = ({ user }) => {
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_VENTAS
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return 'Loading';
  if (error) return `error: ${error.message}`;
  const { allventasCurrentMonth } = data;
  return (
    <div>
      <Box my={2}>
        <b>Meta: {allventasCurrentMonth[0]} de 3100</b>
        <br />
        Falta: {3100 - allventasCurrentMonth[0]}
      </Box>
      <Box my={2}>
        <Typography variant='h3' component='h2'>
          <i>Si crees que puedes, ya estás a medio camino</i>
        </Typography>
      </Box>
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio') && (
        <div>
          Zapatos = <b>{allventasCurrentMonth[0]}</b>
          <br /> Accesorios = <b>{allventasCurrentMonth[1]}</b>
        </div>
      )}
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
          <CardGoalStore user={user} store='miraflores' goal={650} />
        </Grid>
      )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio' ||
        user === 'san-miguel') && (
        <Grid item xs={12} md={3} lg={6}>
          <CardGoalStore user={user} store='san-miguel' goal={384} />
        </Grid>
      )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio' ||
        user === 'sopocachi') && (
        <Grid item xs={12} md={3} lg={6}>
          <CardGoalStore user={user} store='sopocachi' goal={231} />
        </Grid>
      )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio' ||
        user === '6-de-marzo') && (
        <Grid item xs={12} md={3} lg={6}>
          <CardGoalStore user={user} store='6-de-marzo' goal={550} />
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
          <CardGoalStore user={user} store='patrick' goal={800} />
        </Grid>
      )}
      {user === 'ventascbba' && (
        <Grid item xs={12} md={3} lg={6}>
          <CardSalesEmployee
            employee='60468e365e39640015e6b6be'
            name='Nelson'
            goal={200}
          />
        </Grid>
      )}
      {user === 'ventaslapaz' && (
        <Grid item xs={12} md={3} lg={6}>
          <CardSalesEmployee
            employee='60468e735e39640015e6b6bf'
            name='Giovanny'
            goal={600}
          />
        </Grid>
      )}
      <Grid item xs={12} md={3} lg={6}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom>
              Mes: {new Date().toLocaleString('es-MX', { month: 'long' })}
            </Typography>
            <Count user={user} />
          </CardContent>
        </Card>
      </Grid>
      {/* {(user === 'patrick' ||
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

              <Count user={user} />
            </CardContent>
          </Card>
        </Grid>
      )} */}
    </Grid>
  );
}
