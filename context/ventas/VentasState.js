import React, { useReducer } from 'react';
import VentasContext from './VentasContext';
import VentasReducer from './VentasReducer';

import {
  SELECT_PRODUCT,
  AMOUNT_PRODUCTS,
  SELECT_PROMOTORA,
  RESET_STATE,
} from '../../types';

const VentasState = ({ children }) => {
  const initialState = {
    products: [],
    total: 0,
    promotora: '',
  };

  const [state, dispatch] = useReducer(VentasReducer, initialState);
  const addProduct = (products) => {
    dispatch({
      type: SELECT_PRODUCT,
      payload: products,
    });
  };
  const selectPromotora = (idPromotora) => {
    dispatch({
      type: SELECT_PROMOTORA,
      payload: idPromotora,
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
  return (
    <VentasContext.Provider
      value={{
        products: state.products,
        promotora: state.promotora,
        total: state.total,
        resetState,
        addProduct,
        selectPromotora,
        calcTotal,
      }}
    >
      {children}
    </VentasContext.Provider>
  );
};

export default VentasState;
