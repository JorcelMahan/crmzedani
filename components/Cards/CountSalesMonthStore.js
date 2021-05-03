import React, { useEffect, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import AuthContext from '../../context/auth/AuthContext';
const GET_SALES_MONTH_BY_STORE = gql`
  query salesMonthByStore($store: String!) {
    salesMonthByStore(store: $store)
  }
`;

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
        <b>
          Meta: {data.salesMonthByStore ? data.salesMonthByStore[0] : 0} de{' '}
          {goal}
        </b>
        <br />
        Falta {goal - data.salesMonthByStore[0]}
        <hr />
      </Grid>
      <Grid item xs={6}>
        Zapatos <b>{data.salesMonthByStore ? data.salesMonthByStore[0] : 0}</b>
      </Grid>
      <Grid item xs={6}>
        Accesorios{' '}
        <b>{data.salesMonthByStore ? data.salesMonthByStore[1] : 0}</b>
      </Grid>
      {(user === 'patrick' || user === 'kathryn' || user === 'fabio') && (
        <>
          <Grid item xs={4}>
            Total Efectivo:{' '}
            <b>{data.salesMonthByStore ? data.salesMonthByStore[2] : 0}</b>
          </Grid>
          <Grid item xs={4}>
            Total Tarjeta:{' '}
            <b>{data.salesMonthByStore ? data.salesMonthByStore[3] : 0}</b>
          </Grid>
          <Grid item xs={4}>
            Total Deposito:{' '}
            <b>{data.salesMonthByStore ? data.salesMonthByStore[4] : 0}</b>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CountSalesMonthStore;
