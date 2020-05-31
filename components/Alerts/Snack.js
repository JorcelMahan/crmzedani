import React, {useState} from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const Snack = ({msg, type}) => {
    const [openSnack, setOpenSnack] = useState(true);
    const handleCloseSnack = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    }
    return (
        <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
            <Alert severity={type} onClose={handleCloseSnack}>
                {msg}
            </Alert>
        </Snackbar>
    )
}

export default Snack;

