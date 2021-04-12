import React, { useContext, useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Zapato from './Zapato';
import { Card, CardContent, TableContainer } from '@material-ui/core';

import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AuthContext from '../../context/auth/AuthContext';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  table: {
    minWidth: 500,
  },
  footer: {
    width: '100%',
  },
  // container: {
  //   maxHeight: 440,
  // },
}));

const ListZapatos = (props) => {
  const { zapatos, csvData, className, ...rest } = props;
  const router = useRouter();
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  if (zapatos.length > 0) {
    zapatos.map((zapato) => {
      csvData.push([
        // ++index,
        zapato.almacen,
        zapato.codigo,
        zapato.color,
        zapato.tallas['t19'] ? zapato.tallas['t19'] : 0,
        zapato.tallas['t20'] ? zapato.tallas['t20'] : 0,
        zapato.tallas['t21'] ? zapato.tallas['t21'] : 0,
        zapato.tallas['t22'] ? zapato.tallas['t22'] : 0,
        zapato.tallas['t23'] ? zapato.tallas['t23'] : 0,
        zapato.tallas['t24'] ? zapato.tallas['t24'] : 0,
        zapato.tallas['t25'] ? zapato.tallas['t25'] : 0,
        zapato.tallas['t26'] ? zapato.tallas['t26'] : 0,
        zapato.tallas['t27'] ? zapato.tallas['t27'] : 0,
        zapato.tallas['t28'] ? zapato.tallas['t28'] : 0,
        zapato.tallas['t29'] ? zapato.tallas['t29'] : 0,
        zapato.tallas['t30'] ? zapato.tallas['t30'] : 0,
        zapato.tallas['t31'] ? zapato.tallas['t31'] : 0,
        zapato.tallas['t32'] ? zapato.tallas['t32'] : 0,
        zapato.tallas['t33'] ? zapato.tallas['t33'] : 0,
        zapato.tallas['t34'] ? zapato.tallas['t34'] : 0,
        zapato.tallas['t35'] ? zapato.tallas['t35'] : 0,
        zapato.tallas['t36'] ? zapato.tallas['t36'] : 0,
        zapato.tallas['t37'] ? zapato.tallas['t37'] : 0,
        zapato.tallas['t38'] ? zapato.tallas['t38'] : 0,
        zapato.tallas['t39'] ? zapato.tallas['t39'] : 0,
        zapato.tallas['t40'] ? zapato.tallas['t40'] : 0,
        zapato.tallas['t41'] ? zapato.tallas['t41'] : 0,
        zapato.tallas['t42'] ? zapato.tallas['t42'] : 0,
        zapato.tallas['t43'] ? zapato.tallas['t43'] : 0,
        zapato.tallas['t44'] ? zapato.tallas['t44'] : 0,
        zapato.tallas['t45'] ? zapato.tallas['t45'] : 0,
        zapato.tallas['t46'] ? zapato.tallas['t46'] : 0,
        zapato.stock,
        zapato.precioPublico,
        user === 'patrick' ? zapato.costo : '-',
      ]);
    });
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <>
          <TableContainer className={classes.container}>
            <Table
              className={classes.table}
              stickyHeader
              aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {(user === 'patrick' || user === 'kathryn') &&
                  router.pathname.split('/')[2] === 'zapatos' ? (
                    <TableCell>Tienda </TableCell>
                  ) : (
                    <TableCell>#</TableCell>
                  )}

                  <TableCell>Image</TableCell>
                  <TableCell>Codigo</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>33</TableCell>
                  <TableCell>34</TableCell>
                  <TableCell>35</TableCell>
                  <TableCell>36</TableCell>
                  <TableCell>37</TableCell>
                  <TableCell>38</TableCell>
                  <TableCell>39</TableCell>
                  <TableCell>40</TableCell>
                  <TableCell>41</TableCell>
                  <TableCell>42</TableCell>
                  <TableCell>43</TableCell>
                  <TableCell>44</TableCell>
                  <TableCell>45</TableCell>
                  <TableCell>46</TableCell>
                  <TableCell>Stock</TableCell>
                  {user !== 'elenap' && <TableCell>Precio</TableCell>}

                  {(user === 'patrick' || user === 'kathryn') && (
                    <TableCell>Costo</TableCell>
                  )}
                  {user === 'patrick' && <TableCell>Editar</TableCell>}
                  {(user === router.pathname.substr(11).replace('-', ' ') ||
                    user === 'patrick') && <TableCell>Vender</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {zapatos.map((zapato, index) => {
                  return (
                    <Zapato
                      key={zapato.id}
                      zapato={zapato}
                      i={++index}
                      classes={classes}
                      children={false}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </CardContent>
    </Card>
  );
};

export default ListZapatos;
