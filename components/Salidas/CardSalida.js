import React, {useEffect, useState} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from '@material-ui/core/styles';
import {useMutation, gql} from "@apollo/client";

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

const RETURN_SALIDA = gql`
    mutation returnSalida($id: ID!){
        returnSalida(id: $id)
    }
`;

const TRANSFER_SALIDA = gql`
    mutation transferSalida($id: ID!, $almacen: String!){
        transferSalida(id: $id, almacen: $almacen)
    }
`
const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    box: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    bgDisabled: {
        backgroundColor: '#ffcdd2'
    }
}));
const CardSalida = ({salida}) => {
    const classes = useStyles();
    const [returnSalida] = useMutation(RETURN_SALIDA);
    const [transferSalida] = useMutation(TRANSFER_SALIDA)
    let almacenes = ['sopocachi', 'san-miguel', 'satelite', 'miraflores', 'llojeta'];
    almacenes = almacenes.filter(almacen => almacen !== salida.almacen);
    const [selectedAlmacen, setSelectedAlmacen] = useState('');
    useEffect(() => {

    }, [salida.status])
    const handleReturnSalida = async () => {
        try {
            await returnSalida({
                variables: {
                    id: salida.id
                }
            });
        } catch (e) {
            console.log('Yo error', e);
        }
    };
    const handleTransfer = async () => {
        try {
            await transferSalida({
                variables: {
                    id: salida.id,
                    almacen: selectedAlmacen
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Card className={`${salida.status ? classes.bgDisabled : ''}`}>
            <CardHeader
                title={`Salida almacen: ${salida.almacen.toUpperCase()}`}
                subheader={`Retirado por:  ${salida.retiradoPor.toUpperCase()}`}
            />
            <CardContent>
                <List>
                    {
                        salida.products.map((product, index) => (
                            <ListItem key={`${product.id}-${index}`}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <img src={product.image} alt={product.codigo}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${product.codigo} ${product.color} ${product.sizeSale}`}
                                />
                                <ListItemSecondaryAction>
                                    {product.quantity}
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }
                </List>
                <p style={{float: 'right'}}>Total: {salida.totalProducts}</p>
                <CardActions>
                    <Button onClick={handleReturnSalida} disabled={salida.status} variant='contained' color='primary'
                            size='small'>
                        Devolver
                    </Button>

                    <div className={classes.box}>
                        <FormControl className={classes.formControl} disabled={salida.status}>
                            <InputLabel id='lbl-almacen'>Almacen</InputLabel>
                            <Select
                                labelId='lbl-almacen'
                                id='almacen'
                                value={selectedAlmacen}
                                onChange={e => setSelectedAlmacen(e.target.value)}
                            >
                                {
                                    almacenes.map(almacen => (
                                        <MenuItem key={almacen} value={almacen}>{almacen}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <Button disabled={salida.status} onClick={handleTransfer} variant='contained' color='secondary'
                                size='small'>
                            Transferir
                        </Button>
                    </div>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default CardSalida;


