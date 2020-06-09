import React, {useContext, useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
import SalidaContext from "../../context/salidas/SalidaContext";

const useStyles = makeStyles(theme => ({
    size: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '2px',
        borderBottom: '1px solid black',
    },
    input: {
        width: '50px',
        fontSize: '1.2rem'
    }
}));


const Size = ({size, zapato, almacen}) => {
    const classes = useStyles();
    const [activate, setActivate] = useState(false);
    const [selectSize, setSelectSize] = useState('1');
    const [isAdd, setIsAdd] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    //context
    const salidaContext = useContext(SalidaContext);
    const {addProduct, selectAlmacen} = salidaContext
    useEffect(() => {
        selectAlmacen(almacen);
    }, [almacen])
    const addSalida = () => {
        const {id, codigo, color, precioPublico, image} = zapato;
        const newShoe = {
            id,
            codigo,
            color,
            precioPublico: Number(precioPublico),
            image,
            sizeSale: size[0],
            quantity: Number(selectSize)
        }
        addProduct(newShoe);
    };
    return (
        <div key={size[0]} className={classes.size}>
            <div>
                {size[0]}
            </div>
            <div>
                {
                    activate ?
                        <input
                            className={classes.input}
                            value={selectSize}
                            type="number"
                            max={size[1]}
                            min={1}
                            onChange={e => setSelectSize(e.target.value)}
                            disabled={isDisabled}/> :
                        <b>{size[1]}</b>
                }

            </div>
            {activate ? <Button onClick={() => {
                setActivate(!activate);
                setIsDisabled(true);
            }} disabled={isAdd}>
                Cancel
            </Button> : <Button onClick={() => {
                setActivate(!activate);
                setIsDisabled(false);
            }} disabled={isAdd}>
                Select
            </Button>}

            <Button onClick={() => {
                setIsAdd(true);
                setIsDisabled(true);
                addSalida();
            }} disabled={isDisabled}>
                Add
            </Button>
        </div>
    )
}
export default Size;