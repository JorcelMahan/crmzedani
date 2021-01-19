import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMoney from "../components/Cierre/CardMoney";
import { Button, Grid, Typography } from "@material-ui/core";
import CardCoins from "../components/Cierre/CardCoins";
import CierreContext from "../context/cierre/CierreContext";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
}));

const Cierre = () => {
  const classes = useStyles();
  const {
    totalMonedas,
    totalBilletes,
    addTotalEfectivo,
    totalEfectivo,
  } = useContext(CierreContext);
  useEffect(() => {
    addTotalEfectivo(Number(totalBilletes) + Number(totalMonedas));
  }, [totalMonedas, totalBilletes]);
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CardMoney />
          </Grid>
          <Grid item xs={6}>
            <CardCoins />
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="flex-start" spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h2" component="div">
                  Total Efectivo = Bs {totalEfectivo}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h2" component="div">
                  Total Efectivo Ventas = Bs{" "}
                  {localStorage.getItem("totalEfectivo")
                    ? localStorage.getItem("totalEfectivo")
                    : 0}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h2" component="div">
                  Total Tarjeta = Bs{" "}
                  {localStorage.getItem("totalTarjeta")
                    ? localStorage.getItem("totalTarjeta")
                    : 0}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" color="primary">
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Cierre;
