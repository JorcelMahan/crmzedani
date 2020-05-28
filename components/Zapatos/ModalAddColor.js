
import React, {useState} from "react";
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import {Add} from "@material-ui/icons";
import Snack from "../Alerts/Snack";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const ModalAddColor = () => {
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState('');
    const [data, setData] = useState({
        success: true,
        errors: '',
        status: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
        setData({
            success: true,
            errors: '',
            status: ''
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addColor = async () => {
        try {
            const response = await axios.post('https://zedanibackend.herokuapp.com/api/colors', {
                nombre: color
            })
            setData(response.data);
            setColor('');
            handleClose();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Fab size="small" color="primary" aria-label="add" onClick={handleClickOpen}>
                <Add/>
            </Fab>
            {
                !data.success && <Snack msg={data.errors} type="error"/>
            }

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    ADD color
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nombre"
                        name="nombre"
                        label="Color"
                        fullWidth
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button onClick={() => addColor()} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalAddColor;
