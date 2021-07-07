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
import { Box, Divider, LinearProgress } from '@material-ui/core';

const GET_VENTAS = gql`
  query allventasCurrentMonth {
    allventasCurrentMonth
  }
`;

const GET_SALES_DAY = gql`
  query salesTotalDay {
    salesTotalDay
  }
`
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

const CountTotalSales = () => {
  const { loading, error, data, startPolling, stopPolling } = useQuery(GET_SALES_DAY);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    }
  }, [startPolling, stopPolling])

  if (loading) return 'Loading'
  if (error) return `${error.message}`;

  const { salesTotalDay } = data

  return (
    <Box display='flex' flexDirection='column'>
      <Box display='flex' flexDirection='row' justifyContent='space-between' p={1}>
        <Typography>Zapatos</Typography>
        <Typography><b>{salesTotalDay[0]}</b></Typography>
      </Box>
      <Box display='flex' flexDirection='row' justifyContent='space-between' p={1}>
        <Typography>Accesorios</Typography>
        <Typography><b>{salesTotalDay[1]}</b></Typography>
      </Box>
      <Box display='flex' flexDirection='row' justifyContent='space-between' p={1}>
        <Typography>Gift Card</Typography>
        <Typography><b>{salesTotalDay[2]}</b></Typography>
      </Box>
      <Divider />

      <Box display='flex' flexDirection='row' justifyContent='space-between' p={1}>
        <Typography>Efectivo</Typography>
        <Typography> <b>{salesTotalDay[3]}</b></Typography>
      </Box>
      <Box display='flex' flexDirection='row' justifyContent='space-between' p={1}>
        <Typography>Tarjeta</Typography>
        <Typography><b>{salesTotalDay[4]}</b></Typography>
      </Box>
      <Box display='flex' flexDirection='row' justifyContent='space-between' p={1}>
        <Typography>Deposito</Typography>
        <Typography><b>{salesTotalDay[5]}</b></Typography>
      </Box>
      <Box display='flex' flexDirection='row' justifyContent='space-between' p={1}>
        <Typography>Total </Typography>
        <Typography><b>{salesTotalDay[6]}</b></Typography>
      </Box>


    </Box>
  )
}
const goalMonth = 2658;
const extraGoal = 3000;
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
      <Box my={2} display='flex' flexDirection='column'>
        <b>Meta: {allventasCurrentMonth[0]} de {allventasCurrentMonth[0] < goalMonth ? goalMonth : extraGoal}</b>
        <p>Falta: {(allventasCurrentMonth[0] < goalMonth ? goalMonth : extraGoal) - allventasCurrentMonth[0]}</p>
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
            <LinearProgressWithLabel value={percentage(extraGoal, allventasCurrentMonth[0])} />
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
            <CardGoalStore user={user} store='miraflores' goal={596} />
          </Grid>
        )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio' ||
        user === 'san-miguel') && (
          <Grid item xs={12} md={3} lg={6}>
            <CardGoalStore user={user} store='san-miguel' goal={296} />
          </Grid>
        )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio' ||
        user === 'sopocachi') && (
          <Grid item xs={12} md={3} lg={6}>
            <CardGoalStore user={user} store='sopocachi' goal={105} />
          </Grid>
        )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'fabio' ||
        user === '6-de-marzo') && (
          <Grid item xs={12} md={3} lg={6}>
            <CardGoalStore user={user} store='6-de-marzo' goal={461} />
          </Grid>
        )}
      {(user === 'patrick' ||
        user === 'kathryn' ||
        user === 'laura' ||
        user === 'cochabamba') && (
          <Grid item xs={12} md={3} lg={6}>
            <CardGoalStore user={user} store='cochabamba' goal={200} />
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
            <CardGoalStore user={user} store='patrick' goal={1000} />
          </Grid>
        )}
      {user === 'ventascbba' && (
        <Grid item xs={12} md={3} lg={6}>
          <CardSalesEmployee
            employee='60468e365e39640015e6b6be'
            name='Nelson'
            goal={150}
          />
        </Grid>
      )}
      {user === 'ventaslapaz' && (
        <Grid item xs={12} md={3} lg={6}>
          <CardSalesEmployee
            employee='60468e735e39640015e6b6bf'
            name='Giovanny'
            goal={850}
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
      {
        (user === 'patrick' || user === 'fabio' || user === 'kathryn') && (
          <Grid item xs={12} md={3} lg={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant='h5' color='primary'>
                  <span style={{ textTransform: 'capitalize' }}>
                    {new Date().toLocaleDateString('es-MX', { weekday: 'long' })} - {' '}
                  </span>
                  {new Date().toLocaleDateString('es-MX')}
                </Typography>
                <CountTotalSales />
              </CardContent>
            </Card>
          </Grid>
        )
      }
    </Grid>
  );
}
