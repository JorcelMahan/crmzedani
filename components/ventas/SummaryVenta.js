import React, { useContext } from 'react';
import VentasContext from '../../context/ventas/VentasContext';
import ShoeSummary from './ShoeSummary';
const SummaryVenta = () => {
  const ventasContext = useContext(VentasContext);
  const { products } = ventasContext;
  return (
    <div>
      <h4>From summary Venta</h4>
      {products.length > 0 ? (
        <>
          {products.map((shoe) => (
            <ShoeSummary key={shoe.id} shoe={shoe} />
          ))}
        </>
      ) : (
        <p>Aun no hay productos seleccionados</p>
      )}
    </div>
  );
};

export default SummaryVenta;
