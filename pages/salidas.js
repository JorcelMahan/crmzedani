import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {useQuery, gql} from '@apollo/client';
import Grid from "@material-ui/core/Grid";
import CardSalida from "../components/Salidas/CardSalida";

const GET_SALIDAS = gql`
    query salidas {
        salidas{
            id
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
            fecheSalida
            status
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


const Salidas = () => {
    const classes = useStyles();
    const {loading, error, data} = useQuery(GET_SALIDAS);
    if (loading) return "loading";
    if (error) return `Error: ${error}`;
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <h2>Salidas</h2>
                <Grid container spacing={1} wrap='wrap'>
                    {
                        data.salidas.map(salida => (
                            <Grid key={salida.id} item xs={12} sm={6} md={3}>
                                <CardSalida salida={salida}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    )
}

export default Salidas;