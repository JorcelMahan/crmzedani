import React, { useReducer } from 'react';
import VentasContext from './VentasContext';
import VentasReducer from './VentasReducer';

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
} from '../../types';

const VentasState = ({ children }) => {
  const initialState = {
    products: [],
    total: 0,
    promotora: '',
    cliente: '',
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
  return (
    <VentasContext.Provider
      value={{
        products: state.products,
        promotora: state.promotora,
        total: state.total,
        cliente: state.cliente,
        resetState,
        addProduct,
        selectPromotora,
        selectCliente,
        calcTotal,
        removeProduct,
        addQuantity,
        restQuantity,
        addPrecioPromocion,
      }}
    >
      {children}
    </VentasContext.Provider>
  );
};

export default VentasState;
