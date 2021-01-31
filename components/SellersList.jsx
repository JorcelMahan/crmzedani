import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
const EMPLOYEES_STORE = gql`
  query employeeStore($store: String!) {
    employeeStore(store: $store) {
      id
      name
    }
  }
`;
const SALES_DAY_EMPLOYEE = gql`
  query salesDayByStoreAndEmployee($store: String, $employee: String) {
    salesDayByStoreAndEmployee(store: $store, employee: $employee)
  }
`;
const SALES_MONTH_EMPLOYEE = gql`
  query salesMonthByStoreAndEmployee($store: String, $employee: String) {
    salesMonthByStoreAndEmployee(store: $store, employee: $employee)
  }
`;
const Seller = ({ emp, store }) => {
  const { loading, error, data, stopPolling, startPolling } = useQuery(
    SALES_DAY_EMPLOYEE,
    {
      variables: {
        store,
        employee: emp.id,
      },
    }
  );
  const {
    loading: loading2,
    error: error2,
    data: data2,
    startPolling: startPolling2,
    stopPolling: stopPolling2,
  } = useQuery(SALES_MONTH_EMPLOYEE, {
    variables: {
      store,
      employee: emp.id,
    },
  });
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  useEffect(() => {
    startPolling2(1000);
    return () => {
      stopPolling2();
    };
  }, [startPolling2, stopPolling2]);
  if (loading || loading2) return "Loading";
  if (error || error2) return `ERROR`;
  const { salesDayByStoreAndEmployee } = data;
  const { salesMonthByStoreAndEmployee } = data2;

  return (
    <div>
      {emp.name} = Z:{salesDayByStoreAndEmployee[0]} - A:
      {salesDayByStoreAndEmployee[1]} - ZM: {salesMonthByStoreAndEmployee[0]} -
      AM: {salesMonthByStoreAndEmployee[1]}
    </div>
  );
};

const SellersList = ({ store }) => {
  const { data, loading, error } = useQuery(EMPLOYEES_STORE, {
    variables: {
      store,
    },
  });
  if (loading) return "Loading";
  if (error) return `${error.message}`;
  return (
    <div>
      {data.employeeStore.map((emp) => (
        <Seller key={emp.id} emp={emp} store={store} />
      ))}
    </div>
  );
};

export default SellersList;
