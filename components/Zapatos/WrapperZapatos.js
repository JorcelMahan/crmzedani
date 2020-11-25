import React, { useState, useContext } from 'react';
import ListZapatos from './ListZapatos';
import ZapatoToolbar from './ZapatoToolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useSearch, useFilterBy } from '../../hooks/useSearch';
import ListCardViewProducts from './ListCardViewProducts';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AuthContext from '../../context/auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
}));

const getTotalOfShoes = (shoes) => {
  let totalShoes = 0;
  let totalAccesorios = 0;
  //   shoes.forEach((shoe) => (total += shoe.stock));
  shoes.forEach((shoe) => {
    if (shoe.tipo !== 'accesorios') {
      totalShoes += shoe.stock;
    } else {
      totalAccesorios += shoe.stock;
    }
  });
  return [totalShoes, totalAccesorios];
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const WrapperZapatos = ({ zapatos, almacen }) => {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const { field, setfield, filteredElem } = useFilterBy(
    zapatos,
    'tipo',
    'todos'
  );
  const { query, setQuery, filteredItems } = useSearch(filteredElem, 'codigo');
  const [tableMode, setTableMode] = useState(true);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleTableMode = (e) => {
    setTableMode(e.target.checked);
  };
  const csvData = [
    [
      '#',
      'codigo',
      'color',
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
    ],
  ];

  return (
    <div className={classes.root}>
      <h2>{almacen}</h2>
      {(user === 'patrick' || almacen === 'Sopocachi') && (
        <FormControlLabel
          control={
            <Switch
              checked={tableMode}
              onChange={handleTableMode}
              inputProps={{ 'aria-label': 'Ver en una tabla' }}
            />
          }
          label='Ver en una tabla'
        />
      )}

      <ZapatoToolbar
        csvData={csvData}
        query={query}
        setQuery={setQuery}
        field={field}
        setfield={setfield}
        totalZapatos={getTotalOfShoes(filteredItems)}
      />
      <div className={classes.content}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='Tienda' />
          <Tab label='Reservas' />
        </Tabs>
        <TabPanel value={value} index={0}>
          {!tableMode ? (
            <ListCardViewProducts zapatos={filteredItems} />
          ) : (
            <ListZapatos zapatos={filteredItems} csvData={csvData} />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          Reservas
        </TabPanel>
      </div>
    </div>
  );
};

export default WrapperZapatos;
