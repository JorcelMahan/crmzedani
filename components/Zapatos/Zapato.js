import React, { useContext } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Edit from '@material-ui/icons/Edit';
import ModalZapato from './ModalZapato';
import Link from 'next/link';
import AuthContext from '../../context/auth/AuthContext';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

const Sizes = ({ tallas }) => {
  let sizes = Object.values(tallas);

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

const Zapato = ({ zapato, i, classes }) => {
  const { codigo, image, color, stock, tallas, id, almacen } = zapato;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const router = useRouter();

  return (
    <TableRow hover className={classes.tableRow}>
      <TableCell>
        {(user === 'patrick' || user === 'kathryn') &&
        router.pathname.split('/')[2] === 'zapatos'
          ? almacen
          : i}
      </TableCell>
      <TableCell>
        <Avatar alt={codigo} variant='square' src={image} />
      </TableCell>
      <TableCell>{codigo}</TableCell>
      <TableCell>{color}</TableCell>
      <Sizes tallas={tallas} />
      <TableCell>{stock}</TableCell>
      {user === 'patrick' && (
        <TableCell>
          <Link href={{ pathname: '/shoes/[id]', query: { id } }}>
            <a>
              <Button>
                <Edit />
              </Button>
            </a>
          </Link>
        </TableCell>
      )}
      <TableCell>
        <ModalZapato zapato={zapato} />
      </TableCell>
    </TableRow>
  );
};

export default Zapato;
