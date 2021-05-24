import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Select,
  CircularProgress
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { gql, useQuery } from '@apollo/client';
import ReactSelect from 'react-select';
import ValidSizes from './ValidSizes';


function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

const GET_ZAPATOS = gql`
  query zapatosByAlmacen($almacen: String) {
    zapatosByAlmacen(almacen: $almacen) {
      id
      codigo
      color
      almacen
      image
      tallas {
        t19
        t20
        t21
        t22
        t23
        t24
        t25
        t26
        t27
        t28
        t29
        t30
        t31
        t32
        t33
        t34
        t35
        t36
        t37
        t38
        t39
        t40
        t41
        t42
        t43
        t44
        t45
        t46
      }
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '50vw',
    height: '70vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  cardHeader: {
    textAlign: 'center',
    borderBottom: '0.5px solid gray',
  },
}));

export default function ChangesModal({ product, store, vendedor }) {
  const classes = useStyles();
  const [item, setItem] = useState({});
  const [open, setOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_ZAPATOS, {
    variables: {
      almacen: store !== 'patrick' ? store : vendedor === 'Nelson' ? 'cochabamba' : 'central',
    },
  });
  const [enterSize, setEnterSize] = useState('')
  const [enterQuantity, setEnterQuantity] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return `${error.message}`;
  console.log('entersize', enterSize)
  const { zapatosByAlmacen } = data;
  const body = (
    <div className={classes.paper}>
      <Box my={2}>
        <h2 style={{ textAlign: 'center' }}>
          Cambio {product.codigo} - {product.color.toUpperCase()}
        </h2>
      </Box>

      <Grid container spacing={2} justify='center' alignItems='center'>
        <Grid item>
          <Card style={{ maxWidth: 245 }}>
            <CardHeader
              title='SALE'
              className={classes.cardHeader}
              titleTypographyProps={{ variant: 'h2' }}
            />
            <CardActionArea>
              <CardMedia
                component='img'
                alt='shoe'
                width='100%'
                image={product.image}
                title={`${product.codigo} - ${product.color}`}
              />
              <CardContent>
                <Box>{`${product.codigo} - ${product.color}`}</Box>
                <Box>Talla: {product.sizeSale}</Box>
                <Box>
                  <FormControl>
                    <InputLabel>Cantidad</InputLabel>
                    <Select
                      native
                    // value={enterQuantity}
                    // onChange={e => setEnterQuantity(e.target.value)}
                    >
                      {
                        product?.quantity && range(+product.quantity, 1).map(n => (
                          <option>{n}</option>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item>
          <ArrowForwardIcon fontSize='large' />
        </Grid>
        <Grid item>
          <ReactSelect
            options={zapatosByAlmacen}
            getOptionLabel={(op) => `${op.codigo} - ${op.color}`}
            getOptionValue={(op) => op.id}
            placeholder='Seleccione Producto'
            noOptionsMessage={() => 'No existe ese producto'}
            isClearable
            onChange={(op) => {
              setItem(op);
              setEnterSize('')
              setEnterQuantity('')
            }}
          />
          {/* <TextField variant='outlined' type='text' placeholder='Introduce codigo del calzado' /> */}
          <Card style={{ maxWidth: 245 }}>
            <CardHeader
              title='ENTRA'
              className={classes.cardHeader}
              titleTypographyProps={{ variant: 'h2' }}
            />
            <CardActionArea>
              <CardMedia
                component='img'
                alt='shoe'
                width='100%'
                image={
                  item?.image
                    ? item.image
                    : 'https://www.vippng.com/png/detail/7-76841_shoe-icon-shoes-png.png'
                }
                title={`${item?.codigo ? item.codigo : 'CODIGO'} - ${item?.color ? item.color : 'COLOR'
                  }`}
              />
              <CardContent>
                <Box>{`${item?.codigo ? item.codigo : 'CODIGO'} - ${item?.color ? item.color : 'COLOR'
                  }`}</Box>
                <Box>
                  <FormControl>
                    <InputLabel>Tallas</InputLabel>
                    <Select
                      native
                      value={enterSize}
                      onChange={e => setEnterSize(e.target.value)}
                    >
                      {
                        item?.tallas && <ValidSizes tallas={item.tallas} />
                      }
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl>
                    <InputLabel>Cantidad</InputLabel>
                    <Select
                      native
                      value={enterQuantity}
                      onChange={e => setEnterQuantity(e.target.value)}
                    >
                      {
                        (item?.tallas) ? range(item.tallas[enterSize], 1).map(n => (
                          <option>{n}</option>
                        )) : <option>NO LLEGO</option>
                      }
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Box my={2} display='flex' justifyContent='center'>
        <Box>
          <Button variant='contained' color='primary' disabled={true}>
            Cambiar
          </Button>
        </Box>
      </Box>
    </div>
  );

  return (
    <div>
      <Button type='button' variant='contained' onClick={handleOpen} disabled={true}>
        Cambiar
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}
