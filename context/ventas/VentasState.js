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
  const removeProduct = (idProduct) => {
    dispatch({
      type: REMOVE_PRODUCT,
      payload: idProduct,
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

  const addQuantity = (idProduct) => {
    dispatch({
      type: ADD_QUANTITY,
      payload: idProduct,
    });
  };
  const restQuantity = (idProduct) => {
    dispatch({
      type: REST_QUANTITY,
      payload: idProduct,
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
      }}
    >
      {children}
    </VentasContext.Provider>
  );
};

export default VentasState;
