import React, { useState, useContext, useEffect } from 'react';
import Select from 'react-select';
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

const PromotoraData = () => {
  const { loading, error, data } = useQuery(GET_PROMOTORAS);
  const [selectedPromotora, setselectPromotora] = useState('');
  const ventasContext = useContext(VentasContext);
  const { selectPromotora } = ventasContext;
  useEffect(() => {
    selectPromotora(selectedPromotora.id);
  }, [selectedPromotora]);

  if (loading) return 'Loading';
  if (error) return 'error';
  const { promotoras } = data;
  return (
    <div>
      <h2>Datos promotora</h2>
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
