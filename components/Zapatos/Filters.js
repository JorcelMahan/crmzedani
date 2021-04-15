import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import ReactSelect from 'react-select';
import { CircularProgress, FormControl, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 150,
    width: '100%',
  },
}));
const GET_COLORS = gql`
  query colors {
    colors {
      id
      nombre
    }
  }
`;
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

export default Filters;
