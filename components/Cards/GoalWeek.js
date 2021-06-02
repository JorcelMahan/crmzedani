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
import { Box, LinearProgress } from '@material-ui/core';

const GET_VENTAS = gql`
  query allventasCurrentMonth {
    allventasCurrentMonth
  }
`;

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: '1rem'
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

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const percentage = (goal, current) => {
  return ((current * 100) / goal)
}
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
  const goalMonth = 2296;
  return (
    <div>
      <Box my={2} display='flex' flexDirection='column'>
        <b>Meta: {allventasCurrentMonth[0]} de {allventasCurrentMonth[0] < goalMonth ? goalMonth : 2550}</b>
        <p>Falta: {(allventasCurrentMonth[0] < goalMonth ? goalMonth : 2550) - allventasCurrentMonth[0]}</p>
      </Box>
      <Box my={2}>
        <Typography variant='h3' component='h2'>
          <i>"La tragedia no es no alcanzar tus objetivos, la tragedia es no tener objetivos que alcanzar."</i>
        </Typography>
      </Box>

      {/* if goal is reached then new goal */}
      {
        allventasCurrentMonth[0] < goalMonth ? (
          <Box my={1}>
            <LinearProgressWithLabel value={percentage(goalMonth, allventasCurrentMonth[0])} />
          </Box>
        ) : (
          <Box my={1}>
            <LinearProgressWithLabel value={percentage(2550, allventasCurrentMonth[0])} />
          </Box>
        )
      }
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio') && (
          <Box my={1} display='flex' flexDirection='column' flexWrap='wrap'>
            <Typography variant='h5'>Zapatos = <b>{allventasCurrentMonth[0]}</b></Typography>
            <Typography variant='h5'> Accesorios = <b>{allventasCurrentMonth[1]}</b></Typography>
            <Typography variant='h5'> Gift Cards = <b>{allventasCurrentMonth[2]}</b></Typography>
          </Box>
        )}
      {
        (user === 'patrick' || user === 'kathryn' || user === 'fabio') && (
          <Box my={1} display='flex' flexDirection='column' flexWrap='wrap'>
            <p>Total Efectivo = <b>{allventasCurrentMonth[3]}</b></p>
            <p>Total Tarjeta = <b>{allventasCurrentMonth[4]}</b></p>
            <p>Total Deposito = <b>{allventasCurrentMonth[5]}</b></p>
          </Box>
        )
      }
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
            <CardGoalStore user={user} store='miraflores' goal={499} />
          </Grid>
        )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio' ||
        user === 'san-miguel') && (
          <Grid item xs={12} md={3} lg={6}>
            <CardGoalStore user={user} store='san-miguel' goal={284} />
          </Grid>
        )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio' ||
        user === 'sopocachi') && (
          <Grid item xs={12} md={3} lg={6}>
            <CardGoalStore user={user} store='sopocachi' goal={120} />
          </Grid>
        )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio' ||
        user === '6-de-marzo') && (
          <Grid item xs={12} md={3} lg={6}>
            <CardGoalStore user={user} store='6-de-marzo' goal={358} />
          </Grid>
        )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'cochabamba') && (
          <Grid item xs={12} md={3} lg={6}>
            <CardGoalStore user={user} store='cochabamba' goal={185} />
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
            <CardGoalStore user={user} store='patrick' goal={850} />
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
            goal={650}
          />
        </Grid>
      )}
      {
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
      }
    </Grid>
  );
}
