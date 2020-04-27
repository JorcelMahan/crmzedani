import React from 'react';
import SideBar from '../components/SideBar';
import AsignProducts from '../components/ventas/AsignProducts';
import SummaryVenta from '../components/ventas/SummaryVenta';

const Ventas = () => {
  return (
    <SideBar>
      <AsignProducts />
      {/* <SummaryVenta /> */}
    </SideBar>
  );
};

export default Ventas;
