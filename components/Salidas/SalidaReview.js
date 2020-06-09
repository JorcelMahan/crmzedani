import React, {useContext, useEffect} from "react";
import SalidaContext from "../../context/salidas/SalidaContext";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {Delete} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

const SalidaReview = () => {
    const salidaContext = useContext(SalidaContext);
    const {products, removeProduct, totalProducts, selectTotal} = salidaContext;
    let totalZapatos = products.reduce((acc, obj) => acc + Number(obj.quantity), 0);
    useEffect(() => {
        selectTotal(totalZapatos)
    }, [totalProducts, totalZapatos])
    return (
        <div>
            Lista de zapatos
            {
                products.length < 0 ? <p>No hay ningun zapato en la lista</p> :
                    products.map((product, index) => (
                        <List key={`${product.id}-${index}`}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <img src={product.image} alt={product.codigo}/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${product.codigo} ${product.color} ${product.sizeSale}`}
                                />
                                <ListItemText
                                    primary={product.quantity}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => removeProduct(product)}>
                                        <Delete/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    ))
            }
            <p>Total salida: {totalProducts}</p>
        </div>
    )
}

export default SalidaReview;