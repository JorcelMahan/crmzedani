import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Edit from '@material-ui/icons/Edit';
import ModalZapato from './ModalZapato';

const Sizes = ({ tallas }) => {
  let sizes = Object.values(tallas);

  return (
    <>
      {sizes.map((s, i) => {
        s = Number(s) ? s : 0;
        return <TableCell key={`${i}-${s}`}>{s}</TableCell>;
      })}
    </>
  );
};
const Zapato = ({ zapato, i, classes }) => {
  const { codigo, image, color, stock, tallas } = zapato;
  return (
    <TableRow hover className={classes.tableRow}>
      <TableCell>{i}</TableCell>
      <TableCell>
        <Avatar alt={codigo} variant='square' src={image} />
      </TableCell>
      <TableCell>{codigo}</TableCell>
      <TableCell>{color}</TableCell>
      <Sizes tallas={tallas} />
      <TableCell>{stock}</TableCell>
      <TableCell>
        <Edit />
      </TableCell>
      <TableCell>
        <ModalZapato zapato={zapato} />
      </TableCell>
    </TableRow>
  );
};

export default Zapato;
