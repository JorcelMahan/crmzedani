import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Loader from '../Loader';
import ListCardViewProducts from './ListCardViewProducts';
import { makeStyles } from '@material-ui/core/styles';
import ReactSelect from 'react-select';

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  Paper,
  Switch,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ListZapatos from './ListZapatos';
import ListZapatosChildren from './ListZapatosChildren';
import TotalItems from './TotalItems';

const GET_COLORS = gql`
  query colors {
    colors {
      id
      nombre
    }
  }
`;

const GET_ZAPATOS = gql`
  query zapatosCodigo(
    $codigo: String
    $first: Int!
    $page: Int
    $almacen: String
    $tipo: String
    $talla: String
    $color: String
  ) {
    zapatosCodigo(
      codigo: $codigo
      first: $first
      page: $page
      almacen: $almacen
      tipo: $tipo
      talla: $talla
      color: $color
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
const csvData = [
  [
    '#',
    'codigo',
    'color',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    'stock',
    'precio',
    // user === 'patrick' ? 'costo' : '-',
    '-',
  ],
];
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
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 150,
    width: '100%',
  },
}));
const typesOfShoes = [
  { value: 'hombre', label: 'Hombre' },
  { value: 'mujer', label: 'Dama' },
  { value: 'seguridad', label: 'Seguridad' },
  { value: 'enfermera', label: 'Enfermera' },
  // { value: 'niños', label: 'Niños' },
  { value: 'escolar', label: 'Escolar' },
  { value: 'marroquineria', label: 'Marroquineria' },
  { value: 'accesorios', label: 'Accesorios' },
];

const tallas = [
  { value: 't19', label: '19' },
  { value: 't20', label: '20' },
  { value: 't21', label: '21' },
  { value: 't22', label: '22' },
  { value: 't23', label: '23' },
  { value: 't24', label: '24' },
  { value: 't25', label: '25' },
  { value: 't26', label: '26' },
  { value: 't27', label: '27' },
  { value: 't28', label: '28' },
  { value: 't29', label: '29' },
  { value: 't30', label: '30' },
  { value: 't31', label: '31' },
  { value: 't32', label: '32' },
  { value: 't33', label: '33' },
  { value: 't34', label: '34' },
  { value: 't35', label: '35' },
  { value: 't36', label: '36' },
  { value: 't37', label: '37' },
  { value: 't38', label: '38' },
  { value: 't39', label: '39' },
  { value: 't40', label: '40' },
  { value: 't41', label: '41' },
  { value: 't42', label: '42' },
  { value: 't43', label: '43' },
  { value: 't44', label: '44' },
  { value: 't45', label: '45' },
  { value: 't46', label: '46' },
];
const first = 5;

const Filters = ({
  tipo,
  handleTipo,
  talla,
  handleTalla,
  handleColor,
  color,
}) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_COLORS);
  if (loading) return <CircularProgress color='primary' />;
  if (error) return `${error.message}`;
  const { colors } = data;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <FormControl className={classes.formControl} style={{ zIndex: 1000 }}>
          <ReactSelect
            options={typesOfShoes}
            placeholder='Tipo'
            onChange={(op) => handleTipo(op)}
            noOptionsMessage={() => 'No existe esa tipo'}
            isClearable
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl className={classes.formControl} style={{ zIndex: 900 }}>
          <ReactSelect
            options={tallas}
            onChange={(op) => handleTalla(op)}
            placeholder='Tallas'
            noOptionsMessage={() => 'No existe esa talla'}
            isClearable
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl className={classes.formControl} style={{ zIndex: 800 }}>
          <ReactSelect
            options={colors}
            getOptionValue={(op) => op.nombre}
            getOptionLabel={(op) => op.nombre}
            onChange={(op) => handleColor(op)}
            placeholder='Color'
            noOptionsMessage={() => 'No existen zapatos con ese color'}
            isClearable
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};
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
}) => {
  const [tableMode, setTableMode] = useState(true);
  const [value, setValue] = useState(0);
  const classes = useStyles();
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
    if (newValue === 1) {
      const value = { value: 'niños' };
      handleTipo(value);
    } else {
      handleTipo('');
    }
  };
  const { zapatosCodigo } = data;
  const totalofpages = zapatosCodigo.totalPages;
  const total = zapatosCodigo.total;

  return (
    <>
      <FormControlLabel
        control={<Switch checked={tableMode} onChange={handleTableMode} />}
        label='Cambiar Vista'
      />

      <Tabs value={value} onChange={handleChange}>
        <Tab label='Tienda' />
        <Tab label='Niños' />
      </Tabs>
      <TabPanel value={value} index={0}>
        {!tableMode ? (
          <ListCardViewProducts zapatos={zapatosCodigo.shoes} />
        ) : (
          <ListZapatos zapatos={zapatosCodigo.shoes} csvData={csvData} />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!tableMode ? (
          <ListCardViewProducts zapatos={zapatosCodigo.shoes} />
        ) : (
          <ListZapatosChildren
            zapatos={zapatosCodigo.shoes}
            csvData={csvData}
          />
        )}
      </TabPanel>
      <Box m={3}>
        <Grid container spacing={2} justify='flex-end'>
          <Grid item xs={6} md={4}>
            Pagina: {page} <br /> Paginas: {totalofpages} <br /> Codigos:{' '}
            {total}
          </Grid>
          <Grid item xs={6} md={4}>
            <TotalItems almacen={almacen} />
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
const Products = ({ store }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [codigo, setCodigo] = useState('');
  const [value, setValue] = useState(codigo);
  const [tipo, setTipo] = useState('');
  const [talla, setTalla] = useState('');
  const [color, setColor] = useState('');

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
        />
      </div>
    </div>
  );
};

export default Products;
