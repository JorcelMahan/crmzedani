import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import gql from 'graphql-tag';
import Loader from '../components/Loader';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../context/auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },

  table: {
    textTransform: 'uppercase',
  },
}));

const GET_MONEY_BY_DATE = gql`
  query moneyMonthByStore(
    $store: String
    $initialDate: String
    $finalDate: String
  ) {
    moneyMonthByStore(
      store: $store
      initialDate: $initialDate
      finalDate: $finalDate
    )
  }
`;
const currentDate = new Date()
  .toLocaleString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  .split('/');
const randomDate = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate() - 1
)
  .toLocaleString('es-MX', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  .split('/');
const currDateStr = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;
const randomDateStr = `${randomDate[2]}-${randomDate[1]}-${randomDate[0]}`;

const money = () => {
  const classes = useStyles();
  let { user } = useContext(AuthContext);
  user = user ? user : sessionStorage.getItem('user');
  const [store, setStore] = useState(
    user === 'kathryn' || user === 'fabio' || user === 'laura'
      ? 'patrick'
      : user
  );
  const [initialDate, setDate] = useState(randomDateStr);
  const [finalDate, seFinalDate] = useState(currDateStr);
  const { loading, error, data } = useQuery(GET_MONEY_BY_DATE, {
    variables: {
      store: store,
      initialDate,
      finalDate,
    },
  });
  if (loading) return <Loader />;
  if (error) return `${error.message}`;
  const { moneyMonthByStore } = data;

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant='h2' component='h2'>
          Reporte por fechas{' '}
        </Typography>
        <Box
          my={3}
          display='flex'
          flexWrap='wrap'
          justifyContent='space-around'>
          <TextField
            label='Fecha Inicial'
            type='date'
            value={initialDate}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label='Fecha Final'
            type='date'
            value={finalDate}
            onChange={(e) => seFinalDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {(user == 'patrick' || user === 'kathryn' || user === 'fabio') && (
            <FormControl className={classes.formControl}>
              <InputLabel id='store'>Tienda</InputLabel>
              <Select
                id='store'
                name='store'
                labelId='store'
                value={store}
                onChange={(e) => {
                  setStore(e.target.value);
                }}>
                {[
                  'sopocachi',
                  'san-miguel',
                  'miraflores',
                  '6-de-marzo',
                  'cochabamba',
                  'patrick',
                ].map((e) => (
                  <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Numero de Ventas</TableCell>
                <TableCell align='right'>Zapatos</TableCell>
                <TableCell align='right'>Accesorios</TableCell>
                <TableCell align='right'>Efectivo</TableCell>
                <TableCell align='right'>Tarjeta</TableCell>
                <TableCell align='right'>Deposito</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component='th' scope='row'>
                  {moneyMonthByStore[5]}
                </TableCell>
                <TableCell align='right'>{moneyMonthByStore[0]}</TableCell>
                <TableCell align='right'> {moneyMonthByStore[1]}</TableCell>
                <TableCell align='right'> {moneyMonthByStore[2]}</TableCell>
                <TableCell align='right'> {moneyMonthByStore[3]}</TableCell>
                <TableCell align='right'> {moneyMonthByStore[4]}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default money;
