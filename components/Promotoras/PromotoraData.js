import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, gql } from '@apollo/client';
import VentasContext from '../../context/ventas/VentasContext';

const GET_PROMOTORAS = gql`
  {
    promotoras {
      id
      nombres
      apellidos
      razonSocial
      nit
      habilitada
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  boxProm: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
  },
}));
const PromotoraData = ({ setActiveBtn }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_PROMOTORAS);
  const [selectedPromotora, setselectPromotora] = useState('');
  const { selectPromotora, selectCliente } = useContext(VentasContext);
  useEffect(() => {
    if (selectedPromotora !== '') {
      setActiveBtn(false);
      selectPromotora(selectedPromotora);
    } else {
      setActiveBtn(true);
    }
    selectCliente('');
  }, [selectedPromotora]);

  if (loading) return 'Loading';
  if (error) return 'error';
  const { promotoras } = data;
  return (
    <div className={classes.boxProm}>
      <h2>Datos de la Promotora</h2>
      <Select
        onChange={(op) => setselectPromotora(op)}
        options={promotoras}
        placeholder='Seleccione la promotora'
        getOptionValue={(op) => op.id}
        getOptionLabel={(op) => `${op.nombres} ${op.apellidos}`}
        noOptionsMessage={() => 'No hay resultados'}
      />
    </div>
  );
};

export default PromotoraData;
