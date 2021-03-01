import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useQuery, useMutation, gql } from "@apollo/client";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/core/styles";

const RETURN_SALIDA = gql`
  mutation returnSalida($id: ID!) {
    returnSalida(id: $id)
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  table: {
    // width: 300,
    // minWidth: 650,
  },
}));

const GET_SALIDA = gql`
  query salida($id: String!) {
    salida(id: $id) {
      codigo
      products {
        id
        codigo
        color
        sizeSale
        quantity
        image
      }
      totalProducts
      almacen
      retiradoPor
      retiradoHacia
      fechaSalida
      status
    }
  }
`;

const SimpleDialog = ({ salida, open, onClose }) => {
  const classes = useStyles();
  let almacenes = [
    "sopocachi",
    "san-miguel",
    "satelite",
    "miraflores",
    "davidtnt",
  ];
  almacenes = almacenes.filter((almacen) => almacen !== salida.almacen);

  const [selectedAlmacen, setSelectedAlmacen] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <FormControl className={classes.formControl} disabled={salida.status}>
        <InputLabel id="lbl-almacen">
          {salida?.retiradoHacia !== null ? salida.retiradoHacia : "Almacen"}
        </InputLabel>
        <Select
          labelId="lbl-almacen"
          id="almacen"
          value={selectedAlmacen}
          onChange={(e) => setSelectedAlmacen(e.target.value)}
        >
          {almacenes.map((almacen) => (
            <MenuItem key={almacen} value={almacen}>
              {almacen}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        disabled={salida.status}
        // onClick={handleTransfer}
        variant="contained"
        color="secondary"
        size="small"
      >
        Transferir
      </Button>
    </Dialog>
  );
};
const ShowSalida = () => {
  const router = useRouter();
  const classes = useStyles();
  const {
    query: { id },
  } = router;
  const { loading, error, data } = useQuery(GET_SALIDA, {
    variables: {
      id,
    },
    fetchPolicy: "no-cache",
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  const [
    returnSalida,
    { loading: returnLoading, error: returnError },
  ] = useMutation(RETURN_SALIDA);

  const handleReturnSalida = async () => {
    try {
      await returnSalida({
        variables: {
          id: salida.id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  if (loading) return "Loading";
  if (error) return `${error}`;

  const { salida } = data;
  // almacenes = almacenes.filter((almacen) => almacen !== salida.almacen);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" justifyContent="space-around" width="50%" m={2}>
            <Box>
              <Typography>{salida.codigo}</Typography>
              <Typography>De: {salida.almacen.toUpperCase()}</Typography>
              <Typography>
                Hacia:
                {salida?.retiradoHacia !== null
                  ? salida.retiradoHacia.toUpperCase()
                  : "No transferido"}
              </Typography>
              <Typography>Retirado por: {salida.retiradoPor}</Typography>
            </Box>
            <Box>
              {returnLoading && <CircularProgress />}
              {returnError && <p>{returnError.message}</p>}
              <Button
                onClick={handleReturnSalida}
                disabled={salida.status}
                variant="contained"
                color="primary"
              >
                Devolver
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                disabled={salida.status}
              >
                Transferir
              </Button>
              <SimpleDialog salida={salida} open={open} onClose={handleClose} />
            </Box>
          </Box>
          <Box width="50%">
            <PerfectScrollbar>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Codigo</TableCell>
                      <TableCell>Color</TableCell>
                      <TableCell>Talla</TableCell>
                      <TableCell>Cantidad</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {salida.products.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.codigo}</TableCell>
                        <TableCell>{p.color}</TableCell>
                        <TableCell>{p.sizeSale}</TableCell>
                        <TableCell>{p.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </PerfectScrollbar>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default ShowSalida;
