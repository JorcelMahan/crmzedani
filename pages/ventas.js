import React, {useState} from 'react';
import {useQuery, gql} from '@apollo/client';
import {makeStyles} from '@material-ui/core/styles';
import VentasTable from '../components/Ventas/VentasTable';
import CajaState from "../context/caja/CajaState";
import BoxCaja from "../components/Ventas/BoxCaja";
import Loading from "../components/Loading";


const GET_VENTAS = gql`
    query ventas {
        ventas {
            id
            total
            fechaDeCompra
            productos {
                codigo
                color
                precioPublico
                image
                sizeSale
                quantity
            }
            cliente {
                nitoci
                razonSocial
            }
            idPromotora {
                nombres
                apellidos
            }
        }
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
const Ventas = () => {
    const {loading, error, data} = useQuery(GET_VENTAS);
    const classes = useStyles();
    const [close, setCLose] = useState(false)
    if (loading) return <Loading />;
    if (error) return `Error, ${error}`;
    const {ventas} = data;
    return (
        <CajaState>
            <div className={classes.root}>
                <BoxCaja/>
                <div className={classes.content}>
                    {
                        !close ? <VentasTable ventas={ventas}/> : <p>La caja esta cerrada</p>
                    }
                </div>
            </div>
        </CajaState>
    );
};

export default Ventas;
