import React, { useEffect, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Grid, LinearProgress, Typography } from '@material-ui/core';
import AuthContext from '../../context/auth/AuthContext';
const GET_SALES_MONTH_BY_STORE = gql`
  query salesMonthByStore($store: String!) {
    salesMonthByStore(store: $store)
  }
`;

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

const CountSalesMonthStore = ({ store, goal }) => {
  const { user } = useContext(AuthContext);
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_SALES_MONTH_BY_STORE,
    {
      variables: {
        store,
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
  if (error) return `Error ${error.message}`;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {
          (data.salesMonthByStore ? data.salesMonthByStore[0] : 0) >= goal && (
            <Box my={2} display='flex' flexDirection='column'>
              <b>🎉🎉🎉¡FELICITACIONES!🎉🎉🎉</b>
              <i>Gracias a su esfuerzo y trabajo en equipo lograron la meta alcanzada, sigan con esa dedicación y entusiasmo</i>
            </Box>
          )
        }
        <b>
          Meta: {data.salesMonthByStore ? data.salesMonthByStore[0] : 0} de {goal}
        </b>
        <br />
        Falta {goal - (data.salesMonthByStore ? data.salesMonthByStore[0] : 0)}
        <hr />
      </Grid>
      <Grid item xs={12}>
        <LinearProgressWithLabel value={percentage(goal, (data.salesMonthByStore ? data.salesMonthByStore[0] : 0))} />
      </Grid>
      <Grid item xs={4}>
        Zapatos <b>{data.salesMonthByStore ? data.salesMonthByStore[0] : 0}</b>
      </Grid>
      <Grid item xs={4}>
        Accesorios{' '}
        <b>{data.salesMonthByStore ? data.salesMonthByStore[1] : 0}</b>
      </Grid>
      <Grid item xs={4}>
        Gift Card{' '}
        <b>{data.salesMonthByStore ? data.salesMonthByStore[2] : 0}</b>
      </Grid>
      {(user === 'patrick' || user === 'kathryn' || user === 'fabio') && (
        <>
          <Grid item xs={4}>
            Total Efectivo:{' '}
            <b>{data.salesMonthByStore ? data.salesMonthByStore[3] : 0}</b>
          </Grid>
          <Grid item xs={4}>
            Total Tarjeta:{' '}
            <b>{data.salesMonthByStore ? data.salesMonthByStore[4] : 0}</b>
          </Grid>
          <Grid item xs={4}>
            Total Deposito:{' '}
            <b>{data.salesMonthByStore ? data.salesMonthByStore[5] : 0}</b>
          </Grid>
          <Grid item xs={4}>
            TOTAL: {' '}
            <b>{data.salesMonthByStore ? data.salesMonthByStore[6] : 0}</b>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CountSalesMonthStore;
