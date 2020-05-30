
import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Avatar from '@material-ui/core/Avatar';
import Edit from '@material-ui/icons/Edit';
import ModalZapato from './ModalZapato';
import Router from 'next/router';
import Button from "@material-ui/core/Button";
import Link from "next/link";

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
  const { codigo, image, color, stock, tallas, id } = zapato;
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
          <Link href={`/shoes/shoe?id=${id}`}>
              <a>
                  <Button>
                      <Edit  />
                  </Button>
              </a>
          </Link>
      </TableCell>
      <TableCell>
        <ModalZapato zapato={zapato} />
      </TableCell>
    </TableRow>
  );
};

export default Zapato;
