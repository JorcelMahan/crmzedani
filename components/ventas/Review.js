import React, { useContext, useEffect } from 'react';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Close from '@material-ui/icons/Close';
import VentasContext from '../../context/ventas/VentasContext';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boxReview: {
    border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
  },
  boxProducts: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    border: '1px solid red',
  },
  boxActions: {
    width: '30%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  total: {
    alignSelf: 'end',
    justifySelf: 'end',
    width: '100%',
  },
}));

const Review = () => {
  const classes = useStyles();
  const ventasContext = useContext(VentasContext);
  const {
    products,
    promotora,
    cliente,
    removeProduct,
    total,
    calcTotal,
    addQuantity,
    restQuantity,
  } = ventasContext;
  useEffect(() => {
    calcTotal();
  }, [products]);
  return (
    <div className={classes.boxReview}>
      <h3>Confirma los datos</h3>
      <div>
        <p>
          NIT:
          {promotora !== null && promotora !== '' && promotora !== undefined
            ? promotora.nit
            : cliente.nitoci}
        </p>
        <p>
          RazonSocial:
          {promotora !== null && promotora !== '' && promotora !== undefined
            ? promotora.razonSocial
            : cliente.razonSocial}
        </p>
      </div>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className={classes.boxProducts}>
            <Avatar src={product.image} alt={product.codigo} variant='square' />
            <p>{product.codigo}</p>
            <div className={classes.boxActions}>
              <button onClick={() => restQuantity(product.id)}>
                <Remove style={{ fontSize: '1em' }} />
              </button>
              <b>{product.quantity} </b>
              <button onClick={() => addQuantity(product.id)}>
                <Add style={{ fontSize: '1em' }} />
              </button>
              <button onClick={(e) => removeProduct(product.id)}>
                <Close style={{ fontSize: '1em', color: 'red' }} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>La lista de venta esta vacia, seleccione productos.</p>
      )}
      <p className={classes.total}>Total: {total}</p>
    </div>
  );
};

export default Review;
