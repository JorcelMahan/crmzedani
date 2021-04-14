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

const ListZapatosChildren = (props) => {
  const { zapatos, className, ...rest } = props;
  const router = useRouter();
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  // var for pagination

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
                  <TableCell>19</TableCell>
                  <TableCell>20</TableCell>
                  <TableCell>21</TableCell>
                  <TableCell>22</TableCell>
                  <TableCell>23</TableCell>
                  <TableCell>24</TableCell>
                  <TableCell>25</TableCell>
                  <TableCell>26</TableCell>
                  <TableCell>27</TableCell>
                  <TableCell>28</TableCell>
                  <TableCell>29</TableCell>
                  <TableCell>30</TableCell>
                  <TableCell>31</TableCell>
                  <TableCell>32</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Precio</TableCell>

                  {user === 'patrick' && (
                    <>
                      <TableCell>Costo</TableCell>
                      <TableCell>Editar</TableCell>
                    </>
                  )}
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
                      children={true}
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

export default ListZapatosChildren;
