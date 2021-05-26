import React, { useContext, useState, useEffect } from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VentasContext from '../context/ventas/VentasContext';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function CardBadge() {
  const ventasContext = useContext(VentasContext);
  const { products } = ventasContext;
  const [amount, setamount] = useState(0);
  useEffect(() => {
    setamount(
      products.length > 0
        ? products.reduce((acc, obj) => acc + obj.quantity, 0)
        : 0
    );
  }, [products, amount]);
  return (
    <IconButton aria-label='cart' color='inherit'>
      <StyledBadge max={999} badgeContent={amount}>
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
