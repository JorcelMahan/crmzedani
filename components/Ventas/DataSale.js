import React, { useContext, useEffect } from 'react';
import VentasContext from '../../context/ventas/VentasContext';
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';

const DataSale = ({ setActiveBtn }) => {
  const {
    addFactura,
    addReciboNota,
    addMetodoPago,
    metodo,
    factura,
    reciboNota,
  } = useContext(VentasContext);
  useEffect(() => {
    if (factura === '' && reciboNota === '') {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
  }, [factura, reciboNota]);
  return (
    <div>
      {/* <Divider  /> */}

      <Box display='flex' flexDirection='column' m={2}>
        <Typography variant='h4'>Datos de la Venta</Typography>
        <Box display='flex' justifyContent='space-around'>
          <Box>
            <FormControl>
              <InputLabel>Nro Factura</InputLabel>
              <Input
                id='factura'
                value={factura}
                onChange={(e) => addFactura(e.target.value)}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <InputLabel id='metodo'>Metodo</InputLabel>
              <Select
                labelId='metodo'
                id='metodo'
                value={metodo}
                onChange={(e) => addMetodoPago(e.target.value)}>
                <MenuItem value='EFECTIVO'>Efectivo</MenuItem>
                <MenuItem value='TARJETA'>Tarjeta</MenuItem>
                <MenuItem value='DEPOSITO'>Deposito</MenuItem>
                <MenuItem value='EFECTIVO-TARJETA'>Efectivo-Tarjeta</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <InputLabel htmlFor='my-input'>Recibo o Nota</InputLabel>
              <Input
                id='nota'
                value={reciboNota}
                onChange={(e) => addReciboNota(e.target.value)}
                aria-describedby='my-helper-text'
              />
              <FormHelperText id='my-helper-text'>
                R o N antes del numero
              </FormHelperText>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default DataSale;
