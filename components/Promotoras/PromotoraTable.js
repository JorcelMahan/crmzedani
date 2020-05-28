
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import AlertDialog from '../AlertDialog';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardContent } from '@material-ui/core';
import clsx from 'clsx';
import Router from 'next/router';
import Button from "@material-ui/core/Button";
import Link from "next/link";
const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const PromotoraTable = (props) => {
  const { promotoras, className, users, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Nombres</TableCell>
                  <TableCell>Apellidos</TableCell>
                  <TableCell>Razon Social</TableCell>
                  <TableCell>nit</TableCell>
                  <TableCell>Habilitacion</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promotoras.map((promotora, i) => (
                  <TableRow
                    key={promotora.id}
                    className={classes.tableRow}
                    hover
                  >
                    <TableCell>{++i}</TableCell>
                    <TableCell>{promotora.nombres}</TableCell>
                    <TableCell>{promotora.apellidos}</TableCell>
                    <TableCell>{promotora.razonSocial}</TableCell>
                    <TableCell>{promotora.nit}</TableCell>
                    <TableCell>{promotora.habilitada ? 'si' : 'no'}</TableCell>
                    <TableCell>

                      <Link href={`/promotoras/promotora?id=${promotora.id}`}>
                        <a>
                          <Button>
                            <Edit />
                          </Button>
                        </a>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <AlertDialog id={promotora.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

export default PromotoraTable;
