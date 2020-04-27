import React, { useContext } from 'react';
import SideBar from '../components/SideBar';
import VentaContext from '../context/ventas/VentasContext';
const checkout = () => {
  const ventaContext = useContext(VentaContext);
  const { products } = ventaContext;
  return (
    <SideBar>
      <h2>Checkout</h2>
      {products ? (
        products.map((shoe) => <p>{shoe.codigo}</p>)
      ) : (
        <p>Agregue items al carrito</p>
      )}
    </SideBar>
  );
};

export default checkout;
