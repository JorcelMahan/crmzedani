import React, {useContext, useEffect} from 'react';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Close from '@material-ui/icons/Close';
import VentasContext from '../../context/ventas/VentasContext';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    boxReview: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1.2em',
    },
    boxData: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-around',
    },
    boxProducts: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '0.6rem',
        '& *': {
            flex: '1 1 0px',
            textAlign: 'center',
        },
    },
    boxActions: {
        width: '30%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    total: {
        alignSelf: 'flex-end',
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
            <div className={classes.boxData}>
                <p>
                    NIT:
                    <b style={{paddingLeft: '1rem'}}>
                        {promotora !== null && promotora !== '' && promotora !== undefined
                            ? promotora.nit
                            : cliente.nitoci}
                    </b>
                </p>
                <p>
                    RazonSocial:
                    <b style={{paddingLeft: '1rem'}}>
                        {promotora !== null && promotora !== '' && promotora !== undefined
                            ? promotora.razonSocial
                            : cliente.razonSocial}
                    </b>
                </p>
            </div>
            {products.length > 0 ? (
                products.map((product, index) => (
                    <div key={`${product.id}-${index}`} className={classes.boxProducts}>
                        <div>
                            <Avatar
                                src={product.image}
                                alt={product.codigo}
                                variant='square'
                            />
                        </div>
                        <p>
                            {product.codigo} {product.color} {product.sizeSale}
                        </p>
                        <div className={classes.boxActions}>
                            <button onClick={() => restQuantity(product)}>
                                <Remove style={{fontSize: '1em'}}/>
                            </button>
                            <b>{product.quantity} </b>
                            <button onClick={() => addQuantity(product)}>
                                <Add style={{fontSize: '1em'}}/>
                            </button>
                        </div>
                        <div
                            style={{flexGrow: 3}}
                        >
                            <div style={{fontWeight: 700}}>Bs {product.quantity * product.precioPublico}</div>
                        </div>
                        <Button
                            onClick={() => removeProduct(product)}
                            color='primary'
                            variant='contained'
                            size='small'
                        >
                            <Close style={{fontSize: '1em'}}/>
                        </Button>
                    </div>
                ))
            ) : (
                <p>La lista de venta esta vacia, seleccione productos.</p>
            )}
            <p className={classes.total}>
                Total: <b>{total}</b>
            </p>
        </div>
    );
};

export default Review;
