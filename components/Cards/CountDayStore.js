import { useEffect, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Avatar, makeStyles } from '@material-ui/core';
import AuthContext from '../../context/auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  red: {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
    fontSize: '0.8rem',
  },
  red2: {
    color: theme.palette.white,
    backgroundColor: theme.palette.primary.main,
  },
}));

const GET_VENTAS_DAY_BY_STORE = gql`
  query salesDayByStore($store: String!, $date: String!) {
    salesDayByStore(store: $store, date: $date)
    moneyDayByStore(store: $store, date: $date)
  }
`;
const CountDayStore = ({ store }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const currentDate = new Date()
    .toLocaleString('es-MX', {
      year: 'numeric',
      month: 'numeric',
      day: '2-digit',
    })
    .split('/');
  const currDateStr = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_VENTAS_DAY_BY_STORE,
    {
      variables: {
        store,
        date: currDateStr,
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
    <>
      <Avatar className={classes.red2}>
        <span>{data.salesDayByStore} </span>
      </Avatar>
      {(user === 'patrick' || user === 'kathryn' || user === 'fabio') && (
        <>
          <Avatar className={classes.red}>
            <span>{data.moneyDayByStore[0]} </span>
          </Avatar>
          <Avatar className={classes.red}>
            <span>{data.moneyDayByStore[1]} </span>
          </Avatar>
          <Avatar className={classes.red}>
            <span>{data.moneyDayByStore[2]} </span>
          </Avatar>
        </>
      )}
    </>
  );
};

export default CountDayStore;
