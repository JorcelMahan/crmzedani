
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        paddding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    zapatoImage: {
        width: '100%',
        height: 'auto',
    },
    title: {
        textAlign: 'center',
    },
    subTitle: {
        textAlign: 'center',
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
}));

const ModalRetiroZapato = (props) => {
    const { zapato } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [size, setsize] = useState('');

    //validate sizes of the shoes
    const validadSize = [];
    for (let [key, value] of Object.entries(zapato.tallas)) {
        if (value !== 0) validadSize.push(key);
    }
    // context


    // modal methods
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // format the shoe before add
    // validate
    const addCarrito = () => {
        const { id, codigo, color, precioPublico, image } = zapato;
        const newShoe = {
            id,
            codigo,
            color,
            precioPublico,
            image,
            sizeSale: size,
        };

        handleClose();
    };
    const body = (
        <div className={classes.paper}>
            <h2 id='modal-zapato-title' className={classes.title}>
                {zapato.codigo}
            </h2>
            <p id='modal-zapato-description' className={classes.subTitle}>
                {zapato.color}
            </p>
            <img className={classes.zapatoImage} src={zapato.image} />
            <div className={classes.actions}>
                <FormControl className={classes.formControl}>
                    <InputLabel id='size'>Talla</InputLabel>
                    <Select
                        labelId='size'
                        value={size}
                        onChange={(e) => setsize(e.target.value)}
                    >
                        {validadSize.map((s) => (
                            <MenuItem key={s} value={s}>
                                {s}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button color='primary' variant='contained' onClick={addCarrito}>
                    Agregar
                </Button>
            </div>
        </div>
    );
    return (
        <div>
            <Button
                variant='contained'
                type='button'
                onClick={handleOpen}
            >
                Add Retiro <AddCircle />
            </Button>
            <Modal
                disablePortal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-zapato-title'
                aria-describedby='modal-zapato-description'
                className={classes.modal}
            >
                {body}
            </Modal>
        </div>
    );
};

export default ModalRetiroZapato;
