import React, { useContext, useState } from 'react';
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
  Input
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useQuery, useMutation, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../../context/auth/AuthContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { useSearch2 } from '../../hooks/useSearch';


const RETURN_SALIDA = gql`
  mutation returnSalida($id: ID!) {
    returnSalida(id: $id)
  }
`;

const TRANSFER_SALIDA = gql`
  mutation transferSalida($id: ID!, $almacen: String!) {
    transferSalida(id: $id, almacen: $almacen)
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
  paper: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },

}));

const GET_SALIDA = gql`
  query salida($id: String!) {
    salida(id: $id) {
      id
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
let almacenes = [
  'sopocachi',
  'san-miguel',
  'miraflores',
  'central',
  '6-de-marzo',
  'cochabamba',
  'comercial-La-Paz',
  'comercial-Cochabamba',
  'satelite',
  'muestras',
  'fallas'
];

const SimpleDialog = ({ salida, open, onClose }) => {
  const classes = useStyles();
  const router = useRouter();

  const [
    transferSalida,
    { loading: tranferLoading, error: transferError },
  ] = useMutation(TRANSFER_SALIDA);

  const [selectedAlmacen, setSelectedAlmacen] = useState('');

  const handleTransfer = async () => {
    try {
      await transferSalida({
        variables: {
          id: salida.id,
          almacen: selectedAlmacen,
        },
      });
      router.push('/salidas');
    } catch (e) {
      console.log(e);
    }
  };

  almacenes = almacenes.filter((almacen) => almacen !== salida.almacen);

  return (
    <Dialog open={open} onClose={onClose}>
      <FormControl className={classes.formControl} disabled={salida.status}>
        <InputLabel id='lbl-almacen'>
          {salida?.retiradoHacia !== null ? salida.retiradoHacia : 'Almacen'}
        </InputLabel>
        <Select
          labelId='lbl-almacen'
          id='almacen'
          value={selectedAlmacen}
          onChange={(e) => setSelectedAlmacen(e.target.value)}>
          {almacenes.map((almacen) => (
            <MenuItem key={almacen} value={almacen}>
              {almacen}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* // hidden button if is clicked, maybe I can hidden jf the Shoe is no showing on */}

      {
        tranferLoading ?
          <CircularProgress /> :
          <Button
            disabled={selectedAlmacen === ''}
            onClick={handleTransfer}
            variant='contained'
            color='secondary'
            size='small'>
            Transferir
          </Button>
      }
      {transferError && <p>{transferError.message}</p>}


    </Dialog>
  );
};

const ProductTable = ({ salida }) => {

  const classes = useStyles();
  const { query, setQuery, filteredItems } = useSearch2(salida.products)

  return (
    <Box width='100%'>
      {/* Search bar, look for codigox */}
      <Paper className={classes.paper}>
        <SearchIcon className={classes.icon} />
        <Input
          type='text'
          className={classes.input}
          disableUnderline
          placeholder='Codigo...'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </Paper>
      <TableContainer component={Paper}>
        <Table
          size='small'
          aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Codigo</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Talla</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((p, i) => (
              <TableRow key={`${p.id}-${i}`}>
                <TableCell>{p.codigo}</TableCell>
                <TableCell>{p.color}</TableCell>
                <TableCell>{p.sizeSale}</TableCell>
                <TableCell>{p.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  )
}
const ShowSalida = () => {
  const router = useRouter();
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const {
    query: { id },
  } = router;
  const { loading, error, data } = useQuery(GET_SALIDA, {
    variables: {
      id,
    },
    fetchPolicy: 'no-cache',
  });
  const [open, setOpen] = useState(false);

  // new array with the filter values

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
          id,
        },
      });
      router.push('/salidas');
    } catch (e) {
      console.log(e);
    }
  };
  if (loading) return 'Loading';
  if (error) return `${error}`;

  const { salida } = data;


  return (
    <div className={classes.root}>
      <div className={classes.content}>

        <Box my={2}>
          <Button variant='contained' onClick={() => router.back()}>
            <ArrowBackIcon /> Volver
          </Button>
        </Box>

        <Box display='flex' flexDirection='column' alignItems='center'>
          <Box display='flex' justifyContent='space-around' width='100%' m={2}>
            <Box flexGrow={1}>
              <Typography>{salida.codigo}</Typography>
              <Typography>De: <b>{salida.almacen.toUpperCase()}</b></Typography>
              <Typography>
                Hacia:{' '}
                <b>
                  {salida?.retiradoHacia !== null
                    ? salida.retiradoHacia.toUpperCase()
                    : 'No transferido'}
                </b>
              </Typography>
              <Typography>Retirado por: <b>{salida.retiradoPor.toUpperCase()}</b></Typography>
            </Box>
            {returnLoading && <CircularProgress />}
            {returnError && <p>{returnError.message}</p>}
            {!salida.status && (salida.almacen === user || user === 'patrick') && (
              <>
                <Box flexGrow={1}>
                  <Button
                    onClick={handleReturnSalida}
                    disabled={salida.status}
                    variant='contained'
                    color='primary'>
                    Devolver
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleClickOpen}
                    disabled={salida.status}>
                    Transferir
                  </Button>
                  <SimpleDialog
                    salida={salida}
                    open={open}
                    onClose={handleClose}
                  />
                </Box>
              </>
            )}
          </Box>
          {/* here componet of table */}
          <ProductTable salida={salida} />
        </Box>
      </div>
    </div>
  );
};

export default ShowSalida;
