import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Edit from '@material-ui/icons/Edit';
import SideBar from '../components/SideBar';
import AlertDialog from '../components/AlertDialog';
import { useQuery, gql } from '@apollo/client';
//navigation
import NavigationPromotora from '../components/NavigationPromotora';
import Router from 'next/router';
const GET_PROMOTORAS = gql`
  {
    promotoras {
      id
      nombres
      apellidos
      razonSocial
      nit
      habilitada
    }
  }
`;
const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

const editPromotora = (id) => {
  Router.push({
    pathname: '/editPromotora/[id]',
    query: {
      id,
    },
  });
};

export default function SimpleTable() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_PROMOTORAS);
  if (loading) return 'loading...';
  if (error) return 'error...';
  return (
    <SideBar>
      <NavigationPromotora />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell align='right'>Apellidos</TableCell>
              <TableCell align='right'>Razon Social</TableCell>
              <TableCell align='right'>nit</TableCell>
              <TableCell align='right'>Habilitacion</TableCell>
              <TableCell align='right'>Editar</TableCell>
              <TableCell align='right'>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.promotoras.map((promotora, i) => (
                <TableRow key={promotora.id}>
                  <TableCell>{++i}</TableCell>
                  <TableCell component='th' scope='row'>
                    {promotora.nombres}
                  </TableCell>
                  <TableCell align='right'>{promotora.apellidos}</TableCell>
                  <TableCell align='right'>{promotora.razonSocial}</TableCell>
                  <TableCell align='right'>{promotora.nit}</TableCell>
                  <TableCell align='right'>
                    {promotora.habilitada ? 'si' : 'no'}
                  </TableCell>
                  <TableCell align='right'>
                    <Edit onClick={() => editPromotora(promotora.id)} />
                  </TableCell>
                  <TableCell align='right'>
                    <AlertDialog id={promotora.id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SideBar>
  );
}
