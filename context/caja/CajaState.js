import React, { useReducer } from 'react';
import CajaContext from './CajaContext';
import CajaReducer from './CajaReducer';
import { SET_CAJA } from '../../types';

const CajaState = ({ children }) => {
  const initialState = {
    caja: 0,
  };

  const [state, dispatch] = useReducer(CajaReducer, initialState);
  const setCaja = (value) => {
    dispatch({
      type: SET_CAJA,
      payload: value,
    });
  };
  return (
    <CajaContext.Provider
      value={{
        caja: state.caja,
        setCaja,
      }}>
      {children}
    </CajaContext.Provider>
  );
};

export default CajaState;
