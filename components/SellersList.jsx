import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { TableCell, TableContainer } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import PerfectScrollbar from 'react-perfect-scrollbar';
const EMPLOYEES_STORE = gql`
  query employeeStore($store: String!) {
    employeeStore(store: $store) {
      id
      name
    }
  }
`;
const SALES_DAY_EMPLOYEE = gql`
  query salesDayByStoreAndEmployee(
    $store: String
    $employee: String
    $date: String
  ) {
    salesDayByStoreAndEmployee(store: $store, employee: $employee, date: $date)
  }
`;
const SALES_MONTH_EMPLOYEE = gql`
  query salesMonthByStoreAndEmployee($store: String, $employee: String) {
    salesMonthByStoreAndEmployee(store: $store, employee: $employee)
  }
`;
const Seller = ({ emp, store }) => {
  const currentDate = new Date()
    .toLocaleString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/');
  const currDateStr = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;
  const { loading, error, data, stopPolling, startPolling } = useQuery(
    SALES_DAY_EMPLOYEE,
    {
      variables: {
        store,
        employee: emp.id,
        date: currDateStr,
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
  if (loading || loading2)
    return (
      <TableRow>
        <TableCell>Loading</TableCell>
      </TableRow>
    );
  if (error || error2)
    return (
      <TableRow>
        <TableCell>Error</TableCell>
      </TableRow>
    );
  const { salesDayByStoreAndEmployee } = data;
  const { salesMonthByStoreAndEmployee } = data2;

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        {emp.name}
      </TableCell>
      <TableCell align='right'>{salesDayByStoreAndEmployee[0]}</TableCell>
      <TableCell align='right'>{salesDayByStoreAndEmployee[1]}</TableCell>
      <TableCell align='right'>{salesMonthByStoreAndEmployee[0]}</TableCell>
      <TableCell align='right'>{salesMonthByStoreAndEmployee[1]}</TableCell>
    </TableRow>
  );
};

const SellersList = ({ store }) => {
  const { data, loading, error } = useQuery(EMPLOYEES_STORE, {
    variables: {
      store,
    },
  });
  if (loading) return 'Loading';
  if (error) return `${error.message}`;
  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align='right'>D-Z</TableCell>
            <TableCell align='right'>D-A</TableCell>
            <TableCell align='right'>M-Z</TableCell>
            <TableCell align='right'>M-A</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.employeeStore.map((emp) => (
            <Seller key={emp.id} emp={emp} store={store} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SellersList;
