import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_VENTAS_DAY_BY_STORE = gql`
  query salesDayByStore($store: String!, $date: String!) {
    salesDayByStore(store: $store, date: $date)
  }
`;
const CountDayStore = ({ store }) => {
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
    startPolling(5000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return 'Loading';
  if (error) return `Error ${error.message}`;

  return <span>{data.salesDayByStore}</span>;
};

export default CountDayStore;
