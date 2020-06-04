import React from "react";
import CardZapato from "./CardZapato";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}))

const ListCardViewProducts = ({zapatos}) => {
    const classes = useStyles();
    return (
        <Grid container spacing={1} wrap='wrap'>
            {
                zapatos.map((zapato, index) => (
                    <Grid key={zapato.id} item xs={12} sm={6} md={3}>
                        <CardZapato zapato={zapato} i={index}/>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default ListCardViewProducts;