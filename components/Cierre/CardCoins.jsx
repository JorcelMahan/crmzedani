import React, { useState, useEffect, useContext } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { useContainedCardHeaderStyles } from "@mui-treasury/styles/cardHeader/contained";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { TextField } from "@material-ui/core";
import CierreContext from "../../context/cierre/CierreContext";

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    marginTop: 40,
    borderRadius: spacing(0.5),
    transition: "0.3s",
    width: "90%",
    overflow: "initial",
    background: "#ffffff",
  },
  content: {
    paddingTop: 0,
    textAlign: "left",
    overflowX: "auto",
    "& table": {
      marginBottom: 0,
    },
  },
}));

const Billete = ({ nombre, setBilletes, billetes }) => {
  const [quantity, setQuantity] = useState(0);
  const [totaly, setTotaly] = useState(0);

  useEffect(() => {
    setTotaly(Number((Number(nombre) * quantity).toFixed(2)));
  }, [quantity]);

  useEffect(() => {
    setBilletes({
      ...billetes,
      [nombre]: {
        cantidad: Number(quantity),
        total: totaly,
      },
    });
  }, [totaly]);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {nombre}
      </TableCell>
      <TableCell align="right">
        <TextField
          size={"medium"}
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </TableCell>
      <TableCell align="right">{totaly}</TableCell>
    </TableRow>
  );
};
export const CardCoins = React.memo(function ElevatedHeaderCard() {
  const classes = useStyles();
  const cardHeaderStyles = useContainedCardHeaderStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
  const cardHeaderShadowStyles = useFadedShadowStyles();
  //cierre context
  const { addTotalMonedas, addMonedas } = useContext(CierreContext);
  const [billetes, setBilletes] = useState({
    5: { cantidad: 0, total: 0 },
    2: { cantidad: 0, total: 0 },
    1: { cantidad: 0, total: 0 },
    0.5: { cantidad: 0, total: 0 },
    0.2: { cantidad: 0, total: 0 },
    0.1: { cantidad: 0, total: 0 },
  });
  const [totalBilletes, setTotalBilletes] = useState(0);

  useEffect(() => {
    let t = 0;
    const monedas = [];
    for (const p in billetes) {
      t += billetes[p].total;
    }
    for (const [key, value] of Object.entries(billetes)) {
      monedas.push({
        nombre: key,
        cantidad: billetes[key].cantidad,
        total: billetes[key].total,
      });
    }
    setTotalBilletes(Number(t.toFixed(2)));
    addMonedas(monedas);
  }, [billetes]);

  useEffect(() => {
    addTotalMonedas(totalBilletes);
  }, [totalBilletes]);

  return (
    <Card className={cx(classes.card, cardShadowStyles.root)}>
      <CardHeader
        className={cardHeaderShadowStyles.root}
        classes={cardHeaderStyles}
        title={"Monedas"}
      />
      <CardContent className={classes.content}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Monedas</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(billetes)
              .sort((a, b) => b - a)
              .map((b) => (
                <Billete
                  key={b}
                  setBilletes={setBilletes}
                  nombre={b}
                  billetes={billetes}
                />
              ))}
            <TableRow>
              <TableCell component="th" scope="row">
                -
              </TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">{totalBilletes}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});

export default CardCoins;
