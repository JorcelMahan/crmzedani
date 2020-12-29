import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Collapse } from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
const ProductItem = ({ product }) => {
  const { codigo, color, sizeSale, quantity } = product;

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <ListItem button onClick={handleClick}>
      <ListItemText
        primary={`${codigo} ${color} ${sizeSale}`}
        secondary={`Cantidad: ${quantity}`}
      />
    </ListItem>
  );
};

export default ProductItem;
