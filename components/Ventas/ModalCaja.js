import React, {useState, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CajaContext from "../../context/caja/CajaContext";
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ModalCaja({total}) {
    const cajaContext = useContext(CajaContext);
    const {setCaja} = cajaContext
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [retiro, setRetiro] = useState(0);
    const [caja, setNewCaja] = useState(0);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Cerrar Caja</h2>
            <div id="simple-modal-description">
                <p>
                    Total: {total}
                </p>
                <TextField
                    id="retiro"
                    type="number"
                    name="retiro"
                    value={retiro}
                    label="Retirar"
                    onChange={e => {
                        setRetiro(e.target.value);
                        setNewCaja(total - e.target.value);
                    }}
                />
                <p>
                    Caja: {caja}
                </p>
                <Button variant="contained" color="primary" onClick={()=> {
                    setCaja(caja);
                    setRetiro(0);
                    setNewCaja(0);
                    handleClose();
                }}>
                    Cerrar Caja
                </Button>
            </div>
        </div>
    );

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
                Cerrar Caja
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"

            >
                {body}
            </Modal>
        </div>
    );
}
