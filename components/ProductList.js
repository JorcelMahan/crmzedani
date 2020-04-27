import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import VentasContext from '../context/ventas/VentasContext';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const ProductList = ({ shoe }) => {
  const classes = useStyles();
  const [size, setsize] = useState('');

  const validadSize = [];
  for (let [key, value] of Object.entries(shoe.tallas)) {
    if (value !== 0) validadSize.push(key);
  }
  //context
  const ventasContext = useContext(VentasContext);
  const { addProduct, calcTotal } = ventasContext;
  const previewAdd = () => {
    const { id, codigo, color, precioPublico, image } = shoe;
    const newShoe = {
      id,
      codigo,
      color,
      precioPublico,
      image,
      sizeSale: size,
    };

    addProduct(newShoe);
    calcTotal();
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={shoe.image}
          title='Image title'
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='h5' component='h2'>
            {shoe.codigo}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' color='secondary' onClick={previewAdd}>
            Agregar
          </Button>
          <TextField
            id='size'
            label='talla'
            variant='outlined'
            select
            value={size}
            onChange={(e) => setsize(e.target.value)}
          >
            {validadSize.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductList;
