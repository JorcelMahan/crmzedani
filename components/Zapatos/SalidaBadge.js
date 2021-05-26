import React, { useContext, useState, useEffect } from "react";
import Badge from "@material-ui/core/Badge";
import { withStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import WorkOutline from "@material-ui/icons/WorkOutline"
import SalidaContext from "../../context/salidas/SalidaContext";

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

const SalidaBadge = () => {
    const salidaContext = useContext(SalidaContext);
    const { products } = salidaContext;
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        if (products.length > 0) {
            setAmount(products.reduce((acc, obj) => acc + Number(obj.quantity), 0))
        } else {
            setAmount(0)
        }
    }, [products, amount]);

    return (
        <IconButton aria-label='cart' color='inherit'>
            <StyledBadge max={999} badgeContent={amount} overlap='circle'>
                <WorkOutline />
            </StyledBadge>
        </IconButton>
    )
}

export default SalidaBadge;