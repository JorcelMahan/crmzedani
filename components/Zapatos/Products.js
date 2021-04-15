import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Input, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LoadShoes from './LoadShoes';
import Filters from './Filters';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
  // styles for search bar
  root2: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },
}));

const Products = ({ store }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [codigo, setCodigo] = useState('');
  const [value, setValue] = useState(codigo);
  const [tipo, setTipo] = useState('');
  const [talla, setTalla] = useState('');
  const [color, setColor] = useState('');
  const [stock, setStock] = useState(true);

  const handleStock = (value) => {
    setStock(value);
    setPage(1);
  };
  const handleTipo = (value) => {
    if (value) {
      setTipo(value.value);
      setPage(1);
    } else {
      setTipo('');
      setPage(1);
    }
  };
  const handleTalla = (value) => {
    if (value) {
      setTalla(value.value);
      setPage(1);
    } else {
      setTalla('');
      setPage(1);
    }
  };

  const handleColor = (value) => {
    if (value) {
      setColor(value.nombre);
      setPage(1);
    } else {
      setColor('');
      setPage(1);
    }
  };
  const moreData = () => {
    setPage((prev) => prev + 1);
  };
  const backData = () => {
    setPage((prev) => prev - 1);
  };
  const handleChange = ({ target }) => {
    setValue(target.value);
  };
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      setCodigo(value);
      setPage(1);
    }
  };
  const handleClick = () => {
    setCodigo(value);
    setPage(1);
  };

  return (
    <div className={classes.root}>
      <Box my={2}>
        <Typography variant='h1' component='h2'>
          {store === '' || !store ? 'Todos los productos' : store.toUpperCase()}
        </Typography>
      </Box>

      <Paper className={classes.root2}>
        <SearchIcon className={classes.icon} onClick={handleClick} />
        <Input
          type='text'
          value={value}
          className={classes.input}
          disableUnderline
          placeholder='Buscar zapato'
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      </Paper>
      <div className={classes.content}>
        <Filters
          tipo={tipo}
          handleTipo={handleTipo}
          talla={talla}
          handleTalla={handleTalla}
          color={color}
          handleColor={handleColor}
        />
        <LoadShoes
          page={page}
          codigo={codigo}
          backData={backData}
          moreData={moreData}
          almacen={store}
          tipo={tipo}
          handleTipo={handleTipo}
          talla={talla}
          color={color}
          stock={stock}
          handleStock={handleStock}
        />
      </div>
    </div>
  );
};

export default Products;
