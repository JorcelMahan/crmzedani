import React, {useContext, useEffect, useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from '@material-ui/core/styles';
import SalidaContext from "../../context/salidas/SalidaContext";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    divAlmacen: {
        marginBotton: '1rem'
    },
    almacen: {
        textTransform: 'uppercase'
    }
}));

const DataSalida = ({setActiveBtn}) => {
    const classes = useStyles();
    const nombres = ['David Quispe', 'Miguel Corzo', 'Fabio Fernandez', 'Kathryn Fernandez', 'Patric Fernandez']
    const [retiradoPor, setRetiradoPor] = useState('')
    // context
    const salidaContext = useContext(SalidaContext);
    const {almacen, selectRetiradoPor} = salidaContext;
    useEffect(() => {
        if (almacen !== '' && retiradoPor !== '') {
            setActiveBtn(false)
        } else {
            setActiveBtn(true)
        }
    })
    return (
        <div>
            <div classes={classes.divAlmacen}>
                <h3>Salida del Almacen: <span className={classes.almacen}>{almacen}</span></h3>
            </div>
            <div>
                <h3>Selecciona quien esta retirado </h3>
                <FormControl className={classes.formControl}>
                    <InputLabel id="label-retiro">Retirado por: </InputLabel>
                    <Select
                        labelId="label-retiro"
                        id="retiradoPor"
                        value={retiradoPor}
                        onChange={e => {
                            setRetiradoPor(e.target.value);
                            selectRetiradoPor(e.target.value);
                        }}
                    >
                        {
                            nombres.map(item => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default DataSalida;