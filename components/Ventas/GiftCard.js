import { useState, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import VentasContext from '../../context/ventas/VentasContext';
import ReactSelect from 'react-select';
const GIFT_CARDS = gql`
  query giftCards($status: String, $first: Int) {
    giftCards(status: $status, first: $first) {
      products {
      id
      codigo
      almacen
      precioPublico
      precioPromocion
      tipo
      status
      stock
      image
      }
     
    }
  }
`;
const GiftCard = () => {
  const { loading, error, data } = useQuery(GIFT_CARDS, {
    variables: {
      status: 'VENDIDO',
      first: 50
    },
  });
  const { addGiftCard, giftCard, calcTotal } = useContext(VentasContext);
  const [selectedGifCard, setSelectedGifCard] = useState();
  if (loading) return <CircularProgress />;
  if (error) return `${error.message}`;
  const { giftCards } = data;
  // console.log(giftCards)

  const handleChange = (op) => {
    if (op) {
      setSelectedGifCard(op);
      addGiftCard(op.codigo);
    } else {
      addGiftCard(null);
    }
    calcTotal();
  };
  return (
    <div style={{ width: '250px' }}>
      <ReactSelect
        options={giftCards.products}
        getOptionLabel={(op) => op.codigo}
        getOptionValue={(op) => op}
        placeholder='Seleccione gift card'
        onChange={(op) => handleChange(op)}
        noOptionsMessage={() => 'No existe esa gift card'}
        isClearable
      />
    </div>
  );
};

export default GiftCard;
