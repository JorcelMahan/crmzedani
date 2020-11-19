import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_SALES_MONTH_BY_STORE = gql`
  query salesMonthByStore($store: String!) {
    salesMonthByStore(store: $store)
  }
`;

const Goal2 = ({ store, goal, sales }) => {
  let goal2 = 0;
  if (store === 'sopocachi') {
    goal2 = 64;
  } else if (store === 'miraflores') {
    goal2 = 150;
  } else if (store === 'san miguel') {
    goal2 = 72;
  }
  const newGoal = Number(goal) + goal2;
  return (
    <>
      <h4>FELICIDADES</h4>
      <p>
        Meta 2: {sales} de {newGoal}
      </p>
      <p>+ {goal2} pares</p>
      <p>Bono + 100Bs</p>
      <p>Falta: {newGoal - sales}</p>
    </>
  );
};

const CountSalesMonthStore = ({ store, goal }) => {
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_SALES_MONTH_BY_STORE,
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

  return (
    <div>
      {/* {data.salesMonthByStore >= Number(goal) ? (
        <Goal2 store={store} goal={goal} sales={data.salesMonthByStore} />
      ) : (
        <>
          <p>
            Meta1: {data.salesMonthByStore} de {goal}
          </p>
          <p>Falta: {Number(goal) - data.salesMonthByStore}</p>
        </>
      )} */}
      <p>Z & M = {data.salesMonthByStore[0]}</p>
      <p>P & A.L = {data.salesMonthByStore[1]}</p>
    </div>
  );
};

export default CountSalesMonthStore;
