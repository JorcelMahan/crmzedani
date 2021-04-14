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
  const { zapatos, className, ...rest } = props;
  const router = useRouter();
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { user } = authContext;

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
