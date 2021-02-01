import React, { useReducer } from "react";
import VentasContext from "./VentasContext";
import VentasReducer from "./VentasReducer";

import {
  SELECT_PRODUCT,
  AMOUNT_PRODUCTS,
  SELECT_PROMOTORA,
  RESET_STATE,
  SELECT_CLIENTE,
  REMOVE_PRODUCT,
  ADD_QUANTITY,
  REST_QUANTITY,
  ADD_PRECIO_PROMOCION,
  ADD_FECHA_VENTA,
  ADD_FACTURA,
  ADD_METODO_PAGO,
  ADD_RECIBO_NOTA,
  ADD_MONTO_EFECTIVO,
  ADD_MONTO_TARJETA,
  ADD_VENDEDOR,
  ADD_MONTO_DEPOSITO,
} from "../../types";

const VentasState = ({ children }) => {
  const initialState = {
    products: [],
    total: "0",
    promotora: "",
    cliente: "",
    fecha: new Date(),
    metodo: "EFECTIVO",
    factura: "",
    reciboNota: "",
    montoEfectivo: "0",
    montoTarjeta: "0",
    montoDeposito: "0",
    vendedor: "",
  };

  const [state, dispatch] = useReducer(VentasReducer, initialState);
  const addProduct = (products) => {
    dispatch({
      type: SELECT_PRODUCT,
      payload: products,
    });
  };
  const removeProduct = (product) => {
    dispatch({
      type: REMOVE_PRODUCT,
      payload: product,
    });
  };
  const selectPromotora = (idPromotora) => {
    dispatch({
      type: SELECT_PROMOTORA,
      payload: idPromotora,
    });
  };
  const selectCliente = (idCliente) => {
    dispatch({
      type: SELECT_CLIENTE,
      payload: idCliente,
    });
  };
  const calcTotal = () => {
    dispatch({
      type: AMOUNT_PRODUCTS,
    });
  };

  const resetState = () => {
    dispatch({
      type: RESET_STATE,
      payload: initialState,
    });
  };

  const addQuantity = (product) => {
    dispatch({
      type: ADD_QUANTITY,
      payload: product,
    });
  };
  const restQuantity = (product) => {
    dispatch({
      type: REST_QUANTITY,
      payload: product,
    });
  };
  const addPrecioPromocion = (product) => {
    dispatch({
      type: ADD_PRECIO_PROMOCION,
      payload: product,
    });
  };

  const addDateOfSales = (fecha) => {
    dispatch({
      type: ADD_FECHA_VENTA,
      payload: fecha,
    });
  };
  const addFactura = (factura) => {
    dispatch({
      type: ADD_FACTURA,
      payload: factura,
    });
  };
  const addMetodoPago = (metodo) => {
    dispatch({
      type: ADD_METODO_PAGO,
      payload: metodo,
    });
  };
  const addReciboNota = (recibo) => {
    dispatch({
      type: ADD_RECIBO_NOTA,
      payload: recibo,
    });
  };
  const addMontoEfectivo = (efectivo) => {
    dispatch({
      type: ADD_MONTO_EFECTIVO,
      payload: efectivo,
    });
  };
  const addMontoTarjeta = (tarjeta) => {
    dispatch({
      type: ADD_MONTO_TARJETA,
      payload: tarjeta,
    });
  };
  const addMontoDeposito = (deposito) => {
    dispatch({
      type: ADD_MONTO_DEPOSITO,
      payload: deposito,
    });
  };

  const addVendedor = (vendedor) => {
    dispatch({
      type: ADD_VENDEDOR,
      payload: vendedor,
    });
  };
  return (
    <VentasContext.Provider
      value={{
        products: state.products,
        promotora: state.promotora,
        total: state.total,
        cliente: state.cliente,
        fecha: state.fecha,
        factura: state.factura,
        metodo: state.metodo,
        reciboNota: state.reciboNota,
        montoEfectivo: state.montoEfectivo,
        montoTarjeta: state.montoTarjeta,
        montoDeposito: state.montoDeposito,
        vendedor: state.vendedor,
        resetState,
        addProduct,
        selectPromotora,
        selectCliente,
        calcTotal,
        removeProduct,
        addQuantity,
        restQuantity,
        addPrecioPromocion,
        addDateOfSales,
        addFactura,
        addReciboNota,
        addMetodoPago,
        addMontoEfectivo,
        addMontoTarjeta,
        addMontoDeposito,
        addVendedor,
      }}
    >
      {children}
    </VentasContext.Provider>
  );
};

export default VentasState;
