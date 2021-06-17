import React, { useContext, useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import SalidaContext from '../../context/salidas/SalidaContext';
import AuthContext from '../../context/auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  divAlmacen: {
    marginBotton: '1rem',
  },
  almacen: {
    textTransform: 'uppercase',
  },
}));

const nombres = [
  'Patrick Fernandez',
  'Santos Sinka',
  'Laura Fernandez',
  'Fabio Fernandez',
  'Kathryn Fernandez',
  'miraflores',
  'san-miguel',
  '6-de-marzo',
  'sopocachi',
  'cochabamba'
];

const getNames = (user) => {
  if (user === 'patrick') return nombres;
  if (user === 'central') return ['Santos Sinka'];
  if (nombres.find((op) => op === user)) {
    return [nombres.find((op) => op === user)];
  } else {
    return [];
  }
};

const DataSalida = ({ setActiveBtn }) => {
  const classes = useStyles();
  const [retiradoPor, setRetiradoPor] = useState('');
  // context
  const salidaContext = useContext(SalidaContext);
  const { user } = useContext(AuthContext);
  const names = getNames(user);
  const { almacen, selectRetiradoPor } = salidaContext;
  useEffect(() => {
    if (almacen !== '' && retiradoPor !== '') {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  });
  return (
    <div>
      <div classes={classes.divAlmacen}>
        <h3>
          Salida del Almacen: <span className={classes.almacen}>{almacen}</span>
        </h3>
      </div>
      <div>
        <h3>Selecciona quien esta retirado </h3>
        <FormControl className={classes.formControl}>
          <InputLabel id='label-retiro'>Retirado por: </InputLabel>
          <Select
            labelId='label-retiro'
            id='retiradoPor'
            value={retiradoPor}
            onChange={(e) => {
              setRetiradoPor(e.target.value);
              selectRetiradoPor(e.target.value);
            }}>
            {names.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default DataSalida;
