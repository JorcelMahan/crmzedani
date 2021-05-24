import React, { useContext } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Edit from '@material-ui/icons/Edit';
import ModalZapato from './ModalZapato';
// import Link from 'next/link';
import AuthContext from '../../context/auth/AuthContext';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const Sizes = ({ tallas, children }) => {
  const {
    t19,
    t20,
    t21,
    t22,
    t23,
    t24,
    t25,
    t26,
    t27,
    t28,
    t29,
    t30,
    t31,
    t32,
    t33,
    t34,
    t35,
    t36,
    t37,
    t38,
    t39,
    t40,
    t41,
    t42,
    t43,
    t44,
    t45,
    t46,
  } = tallas;
  let sizes;

  if (children) {
    sizes = [
      t19,
      t20,
      t21,
      t22,
      t23,
      t24,
      t25,
      t26,
      t27,
      t28,
      t29,
      t30,
      t31,
      t32,
    ];
  } else {
    sizes = [
      t33,
      t34,
      t35,
      t36,
      t37,
      t38,
      t39,
      t40,
      t41,
      t42,
      t43,
      t44,
      t45,
      t46,
    ];
  }

  return (
    <>
      {sizes.map((s, i) => {
        s = Number(s) ? s : 0;
        return (
          <TableCell key={`${i}-${s}`}>
            {s === 0 ? (
              <span style={{ color: 'red' }}>{s}</span>
            ) : (
              <span style={{ color: 'blue' }}>{s}</span>
            )}
          </TableCell>
        );
      })}
    </>
  );
};

const useStyles = makeStyles(() => ({
  tableRow: {
    backgroundColor: 'white',
  },
  tableRowStockZero: {
    backgroundColor: '#FCF7F8',
  },
}));

const Zapato = ({ zapato, i, children }) => {
  const {
    codigo,
    image,
    color,
    stock,
    tallas,
    id,
    almacen,
    precioPublico,
    costo,
  } = zapato;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const router = useRouter();
  const classes = useStyles();
  return (
    <TableRow
      hover
      className={clsx(
        stock === 0 ? classes.tableRowStockZero : classes.tableRow
      )}>
      <TableCell>
        {(user === 'patrick' || user === 'kathryn' || user === 'fabio' || user === 'central') &&
          router.pathname.split('/')[2] === 'zapatos'
          ? almacen
          : i}
      </TableCell>
      <TableCell>
        <Avatar alt={codigo} variant='square' src={image} />
      </TableCell>
      <TableCell>{codigo}</TableCell>
      <TableCell>{color}</TableCell>
      <Sizes tallas={tallas} children={children} />
      <TableCell>{stock}</TableCell>
      {user !== 'elenap' && <TableCell>{precioPublico}</TableCell>}

      {(user === 'patrick' || user === 'kathryn') && (
        <TableCell>{costo}</TableCell>
      )}
      {user === 'patrick' && (
        <TableCell>
          <Button
            onClick={() => {
              router.push({
                pathname: '/shoes/[id]',
                query: { id },
              });
            }}>
            <Edit />
          </Button>
        </TableCell>
      )}

      {(user === router.pathname.substr(11) || user === 'patrick') && (
        <TableCell>
          <ModalZapato zapato={zapato} />
        </TableCell>
      )}
    </TableRow>
  );
};

export default Zapato;
