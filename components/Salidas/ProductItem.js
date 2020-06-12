import React, {useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Collapse} from "@material-ui/core";
import List from "@material-ui/core/List";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));
const ProductItem = ({product}) => {
    const classes = useStyles();
    const {image, codigo, color, sizeSale, quantity} = product;
    const [open, setOpen] = useState(false);
    const cantidad = [];
    for (let i = 1; i <= quantity; i++) {
        cantidad.push(i);
    }
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemAvatar>
                    <Avatar>
                        <img src={image} alt={codigo}/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`${codigo} ${color} ${sizeSale}`}
                    secondary={`Cantidad: ${quantity}`}
                />
                {
                    open ? <ExpandLess/> : <ExpandMore/>
                }
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    {
                        cantidad.map(el => (
                            <ListItem  button className={classes.nested}>
                                <ListItemText
                                    primary={`${codigo} ${color} ${sizeSale}`}
                                    secondary={el}
                                />
                            </ListItem>
                        ))
                    }
                </List>
            </Collapse>
        </>
    )
}

export default ProductItem;