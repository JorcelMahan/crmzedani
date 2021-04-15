import React, { useState, useEffect } from 'react';
import Loader from '../Loader';
import { useQuery, gql } from '@apollo/client';
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  Tab,
  Tabs,
} from '@material-ui/core';
import ButtonDowloadInventory from './ButtonDowloadInventory';
import ListCardViewProducts from './ListCardViewProducts';
import ListZapatos from './ListZapatos';
import ListZapatosChildren from './ListZapatosChildren';
import TotalItems from './TotalItems';

const GET_ZAPATOS = gql`
  query zapatosCodigo(
    $codigo: String
    $first: Int!
    $page: Int
    $almacen: String
    $tipo: String
    $talla: String
    $color: String
    $stock: Boolean
  ) {
    zapatosCodigo(
      codigo: $codigo
      first: $first
      page: $page
      almacen: $almacen
      tipo: $tipo
      talla: $talla
      color: $color
      stock: $stock
    ) {
      shoes {
        id
        codigo
        stock
        image
        almacen
        color
        costo
        precioPublico
        precioPromotora
        precioPromocion
        tipo
        marca
        catalogo
        tallas {
          t19
          t20
          t21
          t22
          t23
          t24
          t25
          t26
          t27
          t28
          t29
          t30
          t31
          t32
          t33
          t34
          t35
          t36
          t37
          t38
          t39
          t40
          t41
          t42
          t43
          t44
          t45
          t46
        }
      }
      currentPage
      totalPages
      total
    }
  }
`;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

const first = 5;

const LoadShoes = ({
  page,
  codigo,
  backData,
  moreData,
  almacen,
  tipo,
  handleTipo,
  talla,
  color,
  stock,
  handleStock,
}) => {
  const [tableMode, setTableMode] = useState(true);
  const [value, setValue] = useState(0);
  //   const classes = useStyles();
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_ZAPATOS,
    {
      variables: {
        first,
        page,
        codigo,
        almacen,
        tipo,
        talla,
        color,
        stock,
      },
    }
  );
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return <Loader />;
  if (error) return error.message;

  const handleTableMode = (e) => {
    setTableMode(e.target.checked);
  };
  const handleChange = (e, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      handleStock(true);
      handleTipo('');
    }
    if (newValue === 1) {
      const value = { value: 'niños' };
      handleTipo(value);
      handleStock(true);
    }
    if (newValue === 2) {
      handleStock(false);
      handleTipo('');
    }
  };
  const { zapatosCodigo } = data;
  const totalofpages = zapatosCodigo.totalPages;
  const total = zapatosCodigo.total;

  return (
    <>
      <Box my={2}>
        <FormControlLabel
          control={<Switch checked={tableMode} onChange={handleTableMode} />}
          label='Cambiar Vista'
        />
        {/* <ButtonDowloadInventory almacen={almacen} tipo={tipo} /> */}
      </Box>

      <Tabs value={value} onChange={handleChange}>
        <Tab label='Tienda' />
        <Tab label='Niños' />
        <Tab label='Agotados' />
      </Tabs>
      <TabPanel value={value} index={0}>
        {!tableMode ? (
          <ListCardViewProducts zapatos={zapatosCodigo.shoes} />
        ) : (
          <ListZapatos zapatos={zapatosCodigo.shoes} />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!tableMode ? (
          <ListCardViewProducts zapatos={zapatosCodigo.shoes} />
        ) : (
          <ListZapatosChildren zapatos={zapatosCodigo.shoes} />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {!tableMode ? (
          <ListCardViewProducts zapatos={zapatosCodigo.shoes} />
        ) : (
          <ListZapatosChildren zapatos={zapatosCodigo.shoes} />
        )}
      </TabPanel>
      <Box m={3}>
        <Grid container spacing={2} justify='flex-end'>
          <Grid item xs={6} md={4}>
            Pagina: {page} <br /> Paginas: {totalofpages} <br /> Codigos:{' '}
            {total}
          </Grid>
          <Grid item xs={6} md={4}>
            <TotalItems
              almacen={almacen}
              tipo={tipo}
              color={color}
              talla={talla}
              stock={stock}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={3} justify='flex-end'>
              <Grid item xs={6} md={3}>
                <Button
                  variant='contained'
                  color='secondary'
                  size='small'
                  onClick={backData}
                  disabled={page <= 1}>
                  Anterior
                </Button>
              </Grid>
              <Grid item xs={6} md={3}>
                <Button
                  variant='contained'
                  color='secondary'
                  size='small'
                  onClick={moreData}
                  disabled={page >= totalofpages}>
                  Siguiente
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoadShoes;
