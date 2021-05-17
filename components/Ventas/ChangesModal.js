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
  Grid,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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

export default function ChangesModal({ product }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                  Cantidad: {+product.quantity > 1 ? product.quantity : '0'}
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item>
          <ArrowForwardIcon fontSize='large' />
        </Grid>
        <Grid item>
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
                image={product.image}
                title={`${product.codigo} - ${product.color}`}
              />
              <CardContent>
                <Box>{`${product.codigo} - ${product.color}`}</Box>
                <Box>Talla: t38</Box>
                <Box>Cantidad: 1</Box>
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
      <Button type='button' variant='contained' onClick={handleOpen} disabled>
        Cambiar
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}
