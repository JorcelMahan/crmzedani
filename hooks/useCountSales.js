import { gql, useQuery } from '@apollo/client';

const GET_SALES_MONTH_BY_STORE = gql`
  query salesMonthByStore($store: String!) {
    salesMonthByStore(store: $store)
  }
`;

export const useCountSales = (store) => {
  const { data, loading, error } = useQuery(GET_SALES_MONTH_BY_STORE, {
    variables: {
      store,
    },
  });
  if (loading) {
    return 'loading';
  }
  if (error) {
    return error.message;
  }
  return data.salesMonthByStore;
};
