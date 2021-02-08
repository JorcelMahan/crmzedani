import React, { useReducer } from "react";
import CierreContext from "./CierreContext";
import CierreReducer from "./CierreReducer";
import {
  ADD_TOTAL_EFECTIVO,
  ADD_TOTAL_TARJETA,
  ADD_BILLETES,
  ADD_MONEDAS,
  ADD_TOTAL_BILLETES,
  ADD_TOTAL_MONEDAS,
  RESET_STATE,
} from "../../types";

const CierreState = ({ children }) => {
  const initialState = {
    totalMonedas: 0,
    totalBilletes: 0,
    totalEfectivo: 0,
    totalTarjeta: 0,
    billetes: [],
    monedas: {},
  };

  const [state, dispatch] = useReducer(CierreReducer, initialState);
  const addTotalEfectivo = (totalEfectivo) => {
    dispatch({
      type: ADD_TOTAL_EFECTIVO,
      payload: totalEfectivo,
    });
  };
  const addTotalTarjeta = (addTotalTarjeta) => {
    dispatch({
      type: ADD_TOTAL_TARJETA,
      payload: addTotalTarjeta,
    });
  };
  const addTotalMonedas = (totalMonedas) => {
    dispatch({
      type: ADD_TOTAL_MONEDAS,
      payload: totalMonedas,
    });
  };
  const addTotalBilletes = (totalBilletes) => {
    dispatch({
      type: ADD_TOTAL_BILLETES,
      payload: totalBilletes,
    });
  };
  const addBilletes = (billete) => {
    dispatch({
      type: ADD_BILLETES,
      payload: billete,
    });
  };

  const addMonedas = (moneda) => {
    dispatch({
      type: ADD_MONEDAS,
      payload: moneda,
    });
  };

  const reset = () => {
    dispatch({
      type: RESET_STATE,
      payload: initialState,
    });
  };
  return (
    <CierreContext.Provider
      value={{
        totalEfectivo: state.totalEfectivo,
        totalTarjeta: state.totalTarjeta,
        totalBilletes: state.totalBilletes,
        totalMonedas: state.totalMonedas,
        billetes: state.billetes,
        monedas: state.monedas,
        addTotalEfectivo,
        addTotalBilletes,
        addTotalMonedas,
        addBilletes,
        addMonedas,
        addTotalTarjeta,
        reset,
      }}
    >
      {children}
    </CierreContext.Provider>
  );
};

export default CierreState;
