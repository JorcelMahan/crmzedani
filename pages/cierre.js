import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid, TableCell, Typography } from "@material-ui/core";
import { useQuery, gql } from "@apollo/client";
import Loader from "../components/Loader";
import { useRouter } from "next/router";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
}));
const GET_CIERRES = gql`
  query cierreDia($date: String) {
    cierreDia(date: $date) {
      id
      totalMonedas
      totalBilletes
      totalEfectivo
      totalTarjeta
      totalDepositos
      totalZapatos
      totalAccesorios
      monedas {
        nombre
        cantidad
        total
      }
      billetes {
        nombre
        cantidad
        total
      }
    }
  }
`;
const TableMoney = ({ name, money, total }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {money.map((billete) => (
            <TableRow key={billete.nombre}>
              <TableCell>{billete.nombre}</TableCell>
              <TableCell align="right">{billete.cantidad}</TableCell>
              <TableCell align="right">{billete.total}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>-</TableCell>
            <TableCell align="right">TOTAL</TableCell>
            <TableCell align="right">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
const CierreTable = ({ cierre }) => {
  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <TableMoney
            name="Billetes"
            money={cierre.billetes}
            total={cierre.totalBilletes}
          />
        </Grid>
        <Grid item xs={6}>
          <TableMoney
            name="Monedas"
            money={cierre.monedas}
            total={cierre.totalMonedas}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={3}>
              <Box m={2}>
                <Typography variant="h5" component="div">
                  Total Efectivo = Bs {cierre.totalEfectivo}
                </Typography>
              </Box>
              <Box m={2}>
                <Typography variant="h5" component="div">
                  Total Tarjeta = Bs{" "}
                  {cierre.totalTarjeta ? cierre.totalTarjeta : 0}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
const Cierre = () => {
  const classes = useStyles();
  const router = useRouter();
  const currentDate = new Date()
    .toLocaleString("es-MX", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/");
  const currDateStr = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_CIERRES,
    {
      variables: {
        date: currDateStr,
      },
    }
  );
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return <Loader />;
  if (error) return `${error.message}`;
  const { cierreDia } = data;

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {cierreDia.length > 0 ? (
          cierreDia.map((cierre) => (
            <CierreTable key={cierre.id} cierre={cierre} />
          ))
        ) : (
          <Button
            onClick={(e) => router.push("/new-cierre")}
            variant={"contained"}
            color={"primary"}
          >
            Nuevo Cierre
          </Button>
        )}
      </div>
    </div>
  );
};

export default Cierre;
