import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import Link from 'next/link';
import Main from '../layouts/Main/Main';

const GET_VENTAS = gql`
  query ventas {
    ventas {
      id
      total
      fechaDeCompra
      productos {
        codigo
        color
        precioPublico
        image
        sizeSale
        quantity
      }
      cliente {
        nitoci
        razonSocial
      }
      idPromotora {
        nombres
        apellidos
      }
    }
  }
`;
const Ventas = () => {
  const { loading, error, data } = useQuery(GET_VENTAS);
  let totalAcumulate = 0;
  if (loading) return 'Loading...';
  if (error) return `Error, ${error}`;
  const { ventas } = data;
  return (
    <Main>
      <h2>Ventas</h2>
      <Link href='/checkout'>
        <a>Nueva Venta</a>
      </Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Cliente o promotora</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Acumulado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ventas.map((venta, i) => {
              totalAcumulate += venta.total;
              const formatDate = new Date(Number(venta.fechaDeCompra));
              return (
                <TableRow key={venta.id}>
                  <TableCell>{++i}</TableCell>
                  <TableCell>
                    {formatDate.toLocaleDateString('es-MX')}
                  </TableCell>
                  <TableCell>
                    {venta.cliente ? 'Cliente' : 'Promotora'}
                  </TableCell>
                  <TableCell>
                    {venta.productos.map((product) => (
                      <>
                        <p>
                          {product.codigo} - {product.color} -{product.sizeSale}
                          - Bs {product.precioPublico}
                        </p>
                      </>
                    ))}
                  </TableCell>
                  <TableCell>{venta.total}</TableCell>
                  <TableCell>{totalAcumulate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Main>
  );
};

export default Ventas;
