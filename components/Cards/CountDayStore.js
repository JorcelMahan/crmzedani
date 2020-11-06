import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_VENTAS_DAY_BY_STORE = gql`
  query salesDayByStore($store: String!) {
    salesDayByStore(store: $store)
  }
`;
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

export default CountDayStore;
