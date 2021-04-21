import { useQuery } from '@apollo/client';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';

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
}));

const SALES_EMPLOYEE = gql`
  query salesMonthByEmployee($employee: String!) {
    salesMonthByEmployee(employee: $employee)
  }
`;
const CardSalesEmployee = ({ employee, name }) => {
  const { loading, error, data } = useQuery(SALES_EMPLOYEE, {
    variables: {
      employee,
    },
  });
  const classes = useStyles();
  if (loading) return <CircularProgress />;
  if (error) return `${error.message}`;
  const { salesMonthByEmployee } = data;
  return (
    <Paper elevation={2} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h4'>Ventas {name} </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.monthTitle} variant='h4'>
            Mes: {new Date().toLocaleString('es-MX', { month: 'long' })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color='textSecondary' className={classes.depositContext}>
            <span className={classes.monthTitle}>
              {new Date().toLocaleDateString('es-MX', { weekday: 'long' })} -{' '}
            </span>
            {new Date().toLocaleDateString('es-MX')}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider />
          <Box my={2}>
            <Typography variant='h5'>
              Zapatos: {salesMonthByEmployee[0]}
            </Typography>
            <Typography variant='h5'>
              Accesorios: {salesMonthByEmployee[1]}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CardSalesEmployee;
