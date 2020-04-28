import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Edit from '@material-ui/icons/Edit';

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
const Zapato = ({ zapato, i }) => {
  const { codigo, image, color, stock, tallas } = zapato;
  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        {++i}
      </TableCell>
      <TableCell align='right'>
        <Avatar alt={codigo} variant='square' src={image} />
      </TableCell>
      <TableCell align='right'>{codigo}</TableCell>
      <TableCell align='right'>{color}</TableCell>
      <Sizes tallas={tallas} />
      <TableCell align='right'>{stock}</TableCell>
      <TableCell align='right'>
        <Edit />
      </TableCell>
      <TableCell align='right'>DELETE</TableCell>
    </TableRow>
  );
};

export default Zapato;
