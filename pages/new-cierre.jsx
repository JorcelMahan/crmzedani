import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMoney from "../components/Cierre/CardMoney";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import CardCoins from "../components/Cierre/CardCoins";
import CierreContext from "../context/cierre/CierreContext";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const ADD_CIERRE = gql`
  mutation addCierre($input: CierreDiaInput) {
    addCierre(input: $input)
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
}));

const NewCierre = () => {
  const classes = useStyles();
  const {
    totalMonedas,
    totalBilletes,
    addTotalEfectivo,
    totalEfectivo,
    billetes,
    monedas,
    reset,
    totalTarjeta,
  } = useContext(CierreContext);

  const [addCierre, { loading, error }] = useMutation(ADD_CIERRE);
  const router = useRouter();

  useEffect(() => {
    addTotalEfectivo(Number(totalBilletes) + Number(totalMonedas));
  }, [totalMonedas, totalBilletes]);

  const handleClick = async () => {
    try {
      await addCierre({
        variables: {
          input: {
            totalBilletes,
            totalMonedas,
            totalEfectivo,
            totalTarjeta,
            billetes,
            monedas,
          },
        },
      });
      reset();
      router.push("/cierre");
    } catch (e) {
      console.log(e);
    }
  };

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
            <Grid container spacing={2} justify={"flex-end"}>
              <Grid item xs={3}>
                <Box m={2}>
                  <Typography variant="h2" component="div">
                    Efectivo = Bs {totalEfectivo}
                  </Typography>
                </Box>
                <Box m={2}>
                  <Typography variant="h2" component="div">
                    Tarjeta = Bs {totalTarjeta}
                  </Typography>
                </Box>
                <Box m={2}>
                  {loading && <CircularProgress color="secondary" />}
                  {error && `${error.message}`}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    disabled={loading}
                  >
                    Guardar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default NewCierre;
