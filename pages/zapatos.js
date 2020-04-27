import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Edit from '@material-ui/icons/Edit';
import SideBar from '../components/SideBar';
import { useQuery, gql } from '@apollo/client';
import Router from 'next/router';

const GET_ZAPATOS = gql`
  query Zapatos {
    zapatos {
      id
      codigo
      stock
      image
      almacen
      color
      precioPublico
      tallas {
        t27
        t28
        t29
        t30
        t31
        t32
        t33
        t34
        t35
        t36
        t37
        t38
        t39
        t40
        t41
        t42
        t43
        t44
        t45
      }
    }
  }
`;
const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

// const editPromotora = (id) => {
//   Router.push({
//     pathname: '/editPromotora/[id]',
//     query: {
//       id,
//     },
//   });
// };
const Sizes = ({ tallas }) => {
  let sizes = Object.values(tallas);

  return (
    <>
      {sizes.map((s, i) => {
        s = Number(s) ? s : 0;
        return (
          <TableCell key={`${i}-${s}`} align='right'>
            {s}
          </TableCell>
        );
      })}
    </>
  );
};
export default function SimpleTable() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_ZAPATOS);
  if (loading) return 'loading...';
  if (error) return 'error...';
  const { zapatos } = data;

  return (
    <SideBar>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align='right'>Image</TableCell>
              <TableCell align='right'>Codigo</TableCell>
              <TableCell align='right'>Color</TableCell>
              <TableCell align='right'>27</TableCell>
              <TableCell align='right'>28</TableCell>
              <TableCell align='right'>29</TableCell>
              <TableCell align='right'>30</TableCell>
              <TableCell align='right'>31</TableCell>
              <TableCell align='right'>32</TableCell>
              <TableCell align='right'>33</TableCell>
              <TableCell align='right'>34</TableCell>
              <TableCell align='right'>35</TableCell>
              <TableCell align='right'>36</TableCell>
              <TableCell align='right'>37</TableCell>
              <TableCell align='right'>38</TableCell>
              <TableCell align='right'>39</TableCell>
              <TableCell align='right'>40</TableCell>
              <TableCell align='right'>41</TableCell>
              <TableCell align='right'>42</TableCell>
              <TableCell align='right'>43</TableCell>
              <TableCell align='right'>44</TableCell>
              <TableCell align='right'>45</TableCell>
              <TableCell align='right'>Stock</TableCell>
              <TableCell align='right'>Editar</TableCell>
              <TableCell align='right'>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {zapatos.map((zapato, i) => (
              <TableRow key={zapato.id}>
                <TableCell component='th' scope='row'>
                  {++i}
                </TableCell>
                <TableCell align='right'>
                  <Avatar
                    alt={zapato.codigo}
                    variant='square'
                    src={zapato.image}
                  />
                </TableCell>
                <TableCell align='right'>{zapato.codigo}</TableCell>
                <TableCell align='right'>{zapato.color}</TableCell>
                <Sizes tallas={zapato.tallas} />
                <TableCell align='right'>{zapato.stock}</TableCell>
                <TableCell align='right'>
                  <Edit />
                </TableCell>
                <TableCell align='right'>DELETE</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </SideBar>
  );
}
